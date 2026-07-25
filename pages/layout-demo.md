---
title: Layout Demo
categories: [Reference]
---

# Layout Demo

::section[Columns]{icon="📘"}

::::columns{ratio="65-35"}
:::column
This is the **wide** left column at 65%. It holds the main prose content of the
page, flowing naturally across multiple lines so you can see the column width.

It can contain anything — lists, links like [[index]], and more.
:::
:::column
This is the narrow 35% right column — good for an infobox or sidebar notes.
:::
::::

::::columns{ratio="1-1-1"}
:::column
Column A
:::
:::column
Column B
:::
:::column{span="all"}
This cell spans **all** columns — useful for a full-width image or table row.
:::
::::

::section[Media]{icon="🖼️"}

A standalone image with a quoted title becomes a captioned figure:

![Akihabara](https://picsum.photos/seed/akiba/720/300 "Akihabara — where it all happens.")

:::figure{align="right" width="260"}
![Divergence meter](https://picsum.photos/seed/meter/260/160 "A floated, captioned figure.")
:::

Text flows around a `:::figure{align="right"}` block, the way an article wraps
its media. On phones the float collapses to full width. Use `align="left"` or
`align="center"` the same way — and `width` caps the figure's size.

A `:::gallery` is a swipeable strip — scroll it horizontally:

:::gallery
![One](https://picsum.photos/seed/g1/320/220)
![Two](https://picsum.photos/seed/g2/280/220)
![Three](https://picsum.photos/seed/g3/340/220)
![Four](https://picsum.photos/seed/g4/300/220)
![Five](https://picsum.photos/seed/g5/310/220)
:::

::section[Quotes & alignment]{icon="✒️"}

> The universe has a beginning, but no end. — Okabe quoting Stein
>
> Quotes carry a decorative mark, themeable via the blockquote tokens.

:::center
This block is centered — `:::center` (also `:::right` and `:::justify`).
:::

::section[Tables]{icon="📊"}

Wide tables scroll horizontally on small screens instead of breaking the layout:

| # | Worldline | Divergence |
|---|---|---|
| 1 | Alpha | 0.337187 |
| 2 | Alpha | 0.409431 |
| 3 | Alpha | 0.456903 |
| 4 | Alpha | 0.523299 |
| 5 | Alpha | 0.523307 |
| 6 | Alpha | 0.571015 |
| 7 | Alpha | 0.571024 |
| 8 | Beta | 1.049809 |
| 9 | Beta | 1.064750 |
| 10 | Beta | 1.129848 |
| 11 | Beta | 1.130205 |
| 12 | Beta | 1.130212 |
| 13 | Steins Gate | 1.048596 |
| 14 | Omega | 3.406288 |

::section[Extras]{icon="✨"}

:::note
Callouts: `:::note`, `:::tip`, `:::warning`, `:::danger` — and math renders
too: $E = mc^2$, worldline divergence $d = 1.048596$.
:::

:::collapse{title="Spoilers (click to expand)"}
Okabe reaches the Steins Gate worldline. Sorry.
:::

::::tabs
:::tab{label="Alpha"}
The worldline where SERN wins.
:::
:::tab{label="Beta"}
The worldline where the war happens instead.
:::
::::

::navbox{title="Characters" of="Characters"}
