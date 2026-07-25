#!/usr/bin/env node
/**
 * Build _config/stats.json for a wiki content repo.
 *
 * Usage (run from the root of your content repo, which must be a git checkout):
 *   node build-stats.mjs [--content-dir ./] [--out ./_config/stats.json]
 *
 * Output:
 *   { "edits": <total commits touching content>, "articles": <md pages>, "images": <unique images (files + referenced sources)> }
 *
 * Articles + images are counted from disk; edits is the number of commits in the
 * repo's history (a reasonable "N edits to M articles" figure). The wiki reads
 * this at startup; without it, the app falls back to live tree counts (and omits
 * the edit count, which needs git).
 *
 * GitHub Actions step (in your content repo, with fetch-depth: 0):
 *   - name: Build stats
 *     run: node build-stats.mjs
 *   - run: |
 *       git add _config/stats.json
 *       git diff --cached --quiet || (git commit -m "chore: update stats" && git push)
 */

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { execSync } from 'node:child_process'

const args = process.argv.slice(2)
const getArg = (flag) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : undefined }

const CONTENT_DIR = getArg('--content-dir') ?? '.'
const OUT_FILE = getArg('--out') ?? '_config/stats.json'
const IMAGE_RE = /\.(png|jpe?g|gif|webp|svg|avif)$/i

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...await walk(full))
    else out.push(full)
  }
  return out
}

const files = await walk(CONTENT_DIR)
const mdFiles = files.filter((f) => extname(f) === '.md')
const articles = mdFiles.filter((f) => !f.split('/').some((s) => s.startsWith('_'))).length

// "Images" = image files in the repo ∪ unique image sources referenced by pages
// (markdown images, directive image= attrs, raw <img>) — wikis that hotlink
// every picture would otherwise report 0 forever. Keep in sync with
// countUniqueImages in apps/editor/vite-plugin-local-wiki.ts.
const imageRefs = new Set(files.filter((f) => IMAGE_RE.test(f)))
const REF_RES = [/!\[[^\]]*\]\(\s*<?([^)\s>]+)/g, /\bimage="([^"]+)"/g, /<img[^>]*\bsrc="([^"]+)"/g]
for (const f of mdFiles) {
  const body = await readFile(f, 'utf8').catch(() => '')
  for (const re of REF_RES) {
    for (const m of body.matchAll(re)) imageRefs.add(m[1])
  }
}
const images = imageRefs.size

let edits
try {
  edits = parseInt(execSync('git rev-list --count HEAD', { encoding: 'utf8' }).trim(), 10)
} catch {
  edits = undefined
}

const stats = { ...(edits != null ? { edits } : {}), articles, images }
await mkdir('_config', { recursive: true })
await writeFile(OUT_FILE, JSON.stringify(stats, null, 2))
console.log(`Stats written to ${OUT_FILE}:`, stats)
