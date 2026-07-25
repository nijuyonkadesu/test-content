---
title: Templates Demo
categories: [Reference]
---

# Templates Demo

__NOTOC__

This page demonstrates transclusion and parameters.

::template{name="Infobox" title="Rintaro Okabe" caption="Mad scientist" status="Lab member"}

The Fandom-style alias works too:

{{Infobox|title=Kurisu Makise|caption=Neuroscientist|status=Lab member}}

## Latest news

{{News}}

## A missing one

{{DoesNotExist}}

## Code is safe

In code, `{{News}}` is not expanded:

```
{{News}}
```
