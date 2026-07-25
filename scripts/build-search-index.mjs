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

await mkdir('_search', { recursive: true })
await writeFile(OUT_FILE, JSON.stringify(result))
console.log(`Search index written to ${OUT_FILE} (${files.length} files)`)
