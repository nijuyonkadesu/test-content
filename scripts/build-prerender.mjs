#!/usr/bin/env node
/**
 * Prerender every wiki page to an HTML fragment, for the edge Function to
 * inject into the app shell.
 *
 * Why fragments and not whole documents: the shell (hashed asset filenames,
 * script tags, inline CSS) stays owned by the app deployment, so an app deploy
 * never invalidates prerendered content and never requires a content-repo CI
 * rerun.
 *
 * Why this exists at all: Googlebot renders JavaScript, but no AI crawler does
 * (GPTBot, ClaudeBot, PerplexityBot execute none) and no social scraper ever
 * has. Without this they see an empty <div id="root">.
 *
 * Usage (from the root of a content repo):
 *   node scripts/build-prerender.mjs [--content-dir ./] [--out ./_prerender]
 *
 * Requires scripts/renderer.mjs — the app's OWN markdown pipeline, bundled by
 * `pnpm --filter @wiki-editor/editor build:prerenderer` and vendored here. Both
 * sides therefore run identical code; there is no second implementation to
 * drift. The bundle carries a RENDERER_VERSION that is written into every
 * fragment, so the client can detect stale output.
 */

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, relative, extname, dirname } from 'node:path'

const args = process.argv.slice(2)
const getArg = (f) => { const i = args.indexOf(f); return i !== -1 ? args[i + 1] : undefined }
const CONTENT_DIR = getArg('--content-dir') ?? '.'
const OUT_DIR = getArg('--out') ?? '_prerender'

// Sibling of this script, resolved relative to it so the script works from any
// cwd. A URL, not createRequire: require.resolve doesn't handle .mjs.
const rendererUrl = new URL('./renderer.mjs', import.meta.url)
let renderer
try {
  renderer = await import(rendererUrl.href)
} catch (e) {
  console.error(`Cannot load ${rendererUrl.pathname}. Vendor it from the fwiki repo:\n`
    + `  pnpm --filter @wiki-editor/editor build:prerenderer\n`
    + `  cp apps/editor/dist-prerender/renderer.mjs <content-repo>/scripts/\n${e}`)
  process.exit(1)
}

const RENDERER_VERSION = renderer.RENDERER_VERSION ?? '0'

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...await walk(full))
    else if (extname(entry.name) === '.md') out.push(full)
  }
  return out
}

// Templates, resolved from disk. The app resolves them from the live editor
// buffer / search cache / backend instead — but both call the SAME expansion
// engine (renderer.expandTemplatesWith), so nesting, parameter defaults, loop
// detection and code-block protection cannot diverge between the two.
const TEMPLATE_DIR = renderer.TEMPLATE_DIR ?? '_templates'
const templateCache = new Map()

async function loadTemplateFromDisk(name) {
  const key = name.toLowerCase()
  if (templateCache.has(key)) return templateCache.get(key)
  // Case-insensitive, matching the app's own lookup.
  let body = null
  try {
    const entries = await readdir(join(CONTENT_DIR, TEMPLATE_DIR), { withFileTypes: true })
    const hit = entries.find((e) => e.isFile() && e.name.toLowerCase() === `${key}.md`)
    if (hit) body = await readFile(join(CONTENT_DIR, TEMPLATE_DIR, hit.name), 'utf8')
  } catch { /* no _templates dir — every reference is simply missing */ }
  templateCache.set(key, body)
  return body
}

const files = await walk(CONTENT_DIR)
let written = 0
let failed = 0

for (const file of files) {
  const rel = relative(CONTENT_DIR, file).replace(/\\/g, '/')
  if (!rel.startsWith('pages/')) continue
  const slug = rel.slice('pages/'.length, -'.md'.length)
  try {
    const raw = await readFile(file, 'utf8')
    const expanded = renderer.expandTemplatesWith
      ? await renderer.expandTemplatesWith(raw, loadTemplateFromDisk)
      : raw
    const { data, body } = renderer.parseFrontmatter(expanded)
    const html = await renderer.renderMarkdown(body)
    const outFile = join(OUT_DIR, `${slug}.html`)
    await mkdir(dirname(outFile), { recursive: true })
    // The metadata comment is read by the Function, so it never parses markdown
    // or scrapes the body for a title.
    const meta = JSON.stringify({
      v: RENDERER_VERSION,
      title: typeof data.title === 'string' && data.title.trim() ? data.title.trim() : slug.split('/').pop(),
      generated: new Date().toISOString(),
    })
    await writeFile(outFile, `<!--fwiki:${meta}-->\n${html}\n`)
    written++
  } catch (e) {
    // One bad page must not fail the whole build — that page simply falls back
    // to client rendering, which still works.
    console.error(`  ! ${rel}: ${e?.message ?? e}`)
    failed++
  }
}

console.log(`Prerendered ${written} page${written === 1 ? '' : 's'} → ${OUT_DIR}/`
  + (failed ? ` (${failed} failed, those fall back to client rendering)` : '')
  + ` [renderer ${RENDERER_VERSION}]`)
