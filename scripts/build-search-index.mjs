#!/usr/bin/env node
/**
 * Build _search/index.json for a wiki content repo.
 *
 * Usage (run from the root of your content repo):
 *   node build-search-index.mjs [--content-dir ./] [--out ./_search/index.json]
 *
 * Output format:
 *   { "version": 1, "files": { "pages/foo.md": "raw content", ... } }
 *
 * The wiki app will fetch this file at startup and bulk-index it instead of
 * fetching individual files on demand — essential for repos with 100+ pages.
 *
 * Add to GitHub Actions (in your content repo):
 *   - name: Build search index
 *     run: node build-search-index.mjs
 *   - name: Commit index
 *     run: |
 *       git config user.email "actions@github.com"
 *       git config user.name "GitHub Actions"
 *       git add _search/index.json
 *       git diff --cached --quiet || git commit -m "chore: update search index"
 *       git push
 */

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, relative, extname } from 'node:path'

const args = process.argv.slice(2)
const getArg = (flag) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : undefined }

const CONTENT_DIR = getArg('--content-dir') ?? '.'
const OUT_FILE    = getArg('--out') ?? '_search/index.json'

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...await walk(full))
    else if (extname(entry.name) === '.md') files.push(full)
  }
  return files
}

const files = await walk(CONTENT_DIR)
const result = { version: 1, files: {} }

for (const file of files) {
  const rel = relative(CONTENT_DIR, file).replace(/\\/g, '/')
  result.files[rel] = await readFile(file, 'utf8')
}

// ── Catalog metadata sidecar (_search/meta.json) ────────────────────────────
// Everything the reader-mode catalog needs WITHOUT downloading the corpus:
// titles, aliases, categories, raw wikilink targets (the app resolves them
// client-side with the same rules as navigation), a plain-text excerpt for
// feed listings, and the abbreviation registry. The full index.json is only
// fetched when a visitor actually opens search.

const unq = (s) => s.trim().replace(/^["']|["']$/g, '')

// Tolerant frontmatter subset: scalars, inline [a, b] arrays, block lists.
function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!m) return { data: {}, body: raw }
  const data = {}
  let listKey = null
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/)
    if (kv) {
      const [, key, rawVal] = kv
      const val = rawVal.trim()
      listKey = null
      if (val === '') { data[key] = []; listKey = key }
      else if (val.startsWith('[')) data[key] = val.replace(/^\[|\]$/g, '').split(',').map(unq).filter(Boolean)
      else if (val === 'true' || val === 'false') data[key] = val === 'true'
      else data[key] = unq(val)
    } else {
      const item = line.match(/^\s*-\s+(.+)$/)
      if (item && listKey) data[listKey].push(unq(item[1]))
    }
  }
  return { data, body: raw.slice(m[0].length) }
}

function scanCategoryMarkers(body) {
  return [...body.matchAll(/\[\[Category:([^\]|#\n]+?)\]\]/gi)].map((m) => m[1].trim())
}

// Raw [[wikilink]] targets — Category:/prefixed links excluded, same paragraph
// guard as the app's wantedPagesHtml.
// Inside a markdown table cell the pipe of [[target|label]] must be escaped as
// `\|`, so the raw text reads [[target\|label]] and a naive scan captures
// "target\". The renderer never sees this (markdown unescapes before the
// wikilink post-processor runs), but every raw-text scan must strip it or the
// link vanishes from the graph and reappears as a phantom wanted page.
function scanLinkTargets(raw) {
  const targets = []
  for (const m of raw.matchAll(/\[\[([^\]|#[]+?)(?:#[^\]|[]+?)?(?:\|[^\][]+?)?\]\]/g)) {
    if (/\n[ \t]*\n/.test(m[0])) continue
    const t = m[1].replace(/\s+/g, ' ').replace(/\\+$/, '').trim()
    if (/^category:/i.test(t) || /^\w+:/.test(t)) continue
    targets.push(t)
  }
  return targets
}

// Mirrors systems/catalog.ts plainExcerpt — keep in sync.
function plainExcerpt(body, max = 200) {
  const text = body
    .replace(/^:{2,4}[^\n]*$/gm, '')
    .replace(/\{\{\{?[^{}\n]*\}?\}\}/g, '')
    .replace(/__[A-Z][A-Z_]*__/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+[^\n]*$/gm, '')
    .replace(/^\|[^\n]*$/gm, '')
    .replace(/[*_~`>#]|^\s*-\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
  return text.length <= max ? text : text.slice(0, max).replace(/\s+\S*$/, '') + '…'
}

const pages = {}
let abbrPage = null
const parsed = {}
for (const [rel, raw] of Object.entries(result.files)) {
  parsed[rel] = parseFrontmatter(raw)
  const { data, body } = parsed[rel]
  const title = typeof data.title === 'string' && data.title.trim() ? data.title.trim() : rel.split('/').pop().replace(/\.md$/, '')
  pages[rel] = {
    title,
    sortKey: typeof data.sortKey === 'string' && data.sortKey.trim() ? data.sortKey.trim() : title,
    ...(typeof data.date === 'string' ? { date: data.date } : {}),
    aliases: Array.isArray(data.aliases) ? data.aliases.filter((a) => typeof a === 'string') : [],
    categories: [...new Set([...(Array.isArray(data.categories) ? data.categories.map(String) : []), ...scanCategoryMarkers(body)])],
    targets: scanLinkTargets(raw),
    excerpt: plainExcerpt(body),
  }
  if (data.abbreviations === true) abbrPage ??= rel
}
abbrPage ??= Object.keys(result.files).find((p) => /(^|\/)abbreviations\.md$/i.test(p)) ?? null

// Abbreviation table rows `| TERM | expansion |` — mirrors buildAbbreviations.
const abbrDefs = {}
if (abbrPage) {
  for (const line of parsed[abbrPage].body.split('\n')) {
    const cells = line.trim().split('|').map((c) => c.trim())
    if (cells.length < 4 || cells[0] !== '') continue
    const [term, expansion] = [cells[1], cells[2]]
    if (!term || !expansion) continue
    if (/^:?-{2,}:?$/.test(term)) continue
    if (/^abbr/i.test(term) && /^(meaning|expansion|definition)/i.test(expansion)) continue
    if (term.length > 40 || /\s{2,}/.test(term)) continue
    if (!(term in abbrDefs)) abbrDefs[term] = expansion
  }
}

await mkdir('_search', { recursive: true })
await writeFile(OUT_FILE, JSON.stringify(result))
await writeFile('_search/meta.json', JSON.stringify({
  version: 1,
  pages,
  abbr: { page: Object.keys(abbrDefs).length ? abbrPage : null, defs: abbrDefs },
}))
console.log(`Search index written to ${OUT_FILE} (${files.length} files); catalog meta written to _search/meta.json`)
