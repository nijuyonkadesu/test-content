---
title: Getting Started
categories: [Documentation]
---

# Getting Started

Welcome! This page covers how to write for this wiki. See also [[index|the main page]],
and the **Syntax guide** (book icon in the toolbar, or `Alt+G`) for a copyable
reference of everything below.

## Writing basics

Open any page from the sidebar. The editor supports standard markdown plus wiki extras:

- **Bold**, *italic*, ~~strikethrough~~, ==highlights==, and inline #wiki tags
- `inline code` and code blocks
- Tables, blockquotes, links, footnotes[^1]
- Images — paste one straight into the editor and it uploads itself
- Wikilinks: `[[Page Name]]`, or `[[Page Name#Heading|Label]]` for a section —
  like [[getting-started#writing-basics|this one]]. A red link means the page
  doesn't exist yet.

[^1]: Like this footnote.

## Page metadata

Start a page with a frontmatter block to control how it appears in listings:

```yaml
---
title: Display Name
categories: [Characters]
aliases: [Old Name]
sortKey: Name
---
```

`[[Category:Some Category]]` anywhere in the body also files the page into a
category — it's hidden in the rendered article and shows in the Categories bar
at the foot of the page.

## Structure and layout

- `:::infobox{title="…" image="…"}` — the right-rail card you see on [[okabe|character pages]]
- `::::columns{ratio="65-35"}` with `:::column` fences — multi-column pages ([[layout-demo|demo]])
- `::section[Title]{icon="📘"}` — decorated section bands for portals
- `::category-index{of="Characters"}` — automatic A–Z listings ([[appendix|demo]])
- `{{Template|param=value}}` — reusable content from `_templates/` ([[templates-demo|demo]])

If you misspell a directive, the preview shows a warning box where it would
have rendered — nothing fails silently.

## Publishing workflow

| Action | What happens |
| --- | --- |
| `Ctrl+S` / Save | Commits to your personal draft branch |
| Publish | Opens a pull request: draft → main |
| Merge PR | Publishes the change to the live wiki |

Saving never touches the live branch directly — every change goes through a
draft, so nothing breaks the wiki mid-edit.

## Local dev mode

Running with `VITE_DEV_MODE=local` serves this `dev-content/` folder from disk
with no GitHub auth; branches and PRs are simulated in memory.

```bash
pnpm install
VITE_DEV_MODE=local pnpm dev
```

## Theming

Open the **Theme** panel in the toolbar to switch presets (Archive, Fandom
Gold, Midnight Blue, Light, Slate Dark), adjust colors, fonts, and content
width, or set a background image. Themes live in `_config/theme.json`, so they
publish like any other edit.
