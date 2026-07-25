---
title: "Future Gadget #2: Bamboo Helicam"
categories: [Technology, Gadgets]
sortKey: Future Gadget 02
aliases: [Bamboo Helicam, FG-02, Takekoputa-Cam]
date: 2024-01-27
icon: 🚁
---

# Future Gadget #2: Bamboo Helicam

:::infobox{title="FG #2 — Bamboo Helicam" image="https://picsum.photos/seed/fg02/300/180" caption="Airborne for 11 seconds. Legendary forever."}
| | |
|---|---|
| Designation | Future Gadget #2 |
| Common name | Bamboo Helicam |
| Function | Head-mounted camera drone (detachable) |
| Inventors | [[daru\|Itaru Hashida]], [[okabe\|Rintaro Okabe]] |
| Rotor | Single coaxial pair, 18 cm |
| Camera | 0.3 MP CMOS, composite out |
| Flight endurance | 11 seconds (record) |
| Control | 27 MHz AM radio, borrowed from an RC car |
| Injuries caused | 1 (minor, self-inflicted, Okabe) |
| Status | Grounded pending "rotor renaissance" |
:::

**Future Gadget #2**, the **Bamboo Helicam**, is a head-mounted detachable
camera drone: a propeller beanie that takes off. The wearer walks around
with a rotor assembly clipped to a helmet; on command, the assembly
detaches, ascends, and streams grainy video of the wearer's bald spot to a
CRT in the lab. It is the [[future-gadget-lab|lab]]'s first flying machine,
its first camera platform, and its first product recall, all within the
same week.

::section[Concept]{icon="💡"}

::::columns{ratio="65-35"}
:::column
The design brief, as written on the whiteboard and never erased: *"personal
airborne perspective at zero notice."* [[daru|Daru]] wanted an overhead
camera for crowded convention halls; [[okabe|Okabe]] wanted something that
looked like it came from a future where surveillance is whimsical. The
compromise was a coaxial rotor unit that lives on the wearer's head —
pre-positioned for launch, in the sense that a hat is pre-positioned.

The launch sequence is genuinely clever: the rotors spin up while still
clipped in, the clip releases at operating RPM, and the airframe rises
with the camera already recording. The landing sequence is the part that
was, in the language of the incident report, ==never actually designed==.
:::
:::column
**Flight log summary**

- Flight 1 — 4 s, wall
- Flight 2 — 7 s, other wall
- Flight 3 — 11 s, ceiling fan interaction
- Flight 4 — 9 s, out the window, recovered from
  [[braun-tube-workshop|Mr. Braun's]] awning
- Flight 5 — grounded by unanimous vote
:::
::::

::section[Specifications]{icon="📐"}

Sortable spec table; hover a header to sort.

| Parameter | Value | Unit |
|---|---|---|
| Rotor diameter | 18 | cm |
| All-up mass | 96 | g |
| Hover power | 14 | W |
| Battery capacity | 350 | mAh |
| Theoretical endurance | 95 | s |
| Achieved endurance | 11 | s |
| Video latency | 0.4 | s |
| Cost, parts | 4,800 | ¥ |

The gap between theoretical and achieved endurance is the story of the
gadget. Hover time was never the limit — *walls* were. The 27 MHz control
link, borrowed from an RC car, has no proportional control: the rotor unit
is always either climbing at full power or falling. Daru's control law,
documented in a comment as `// good luck`, toggles between these states
several times a second, which in practice traces a flight path best
described as ==enthusiastic Brownian motion==.

:::warning
Flight 3's ceiling fan interaction embedded a rotor blade in the lab's
corkboard, 40 cm from [[mayuri|Mayuri]]'s head. FG #2 is grounded indoors
by standing order, and the corkboard hole is preserved as a safety
memorial.
:::

::section[The camera]{icon="📷"}

::::tabs
:::tab{label="Optics"}
A 0.3-megapixel CMOS module scavenged from a discontinued toy, chosen for
mass, not quality. Faces judged "recognizable at 2 m in good light,
mood-dependent beyond that."
:::
:::tab{label="Downlink"}
Analog composite video over a 1.2 GHz transmitter — technically requiring
a license the lab technically does not have. Received on the lab's rabbit-
ear CRT, which explains the permanent tinfoil sculpture on the windowsill.
:::
:::tab{label="Footage"}
Flight 4's footage — a spiraling shot of [[akihabara|Akihabara]]'s
skyline, ending in awning — remains the most-rewatched tape in the lab.
It has genuine accidental beauty. It is also evidence, which is why it
stays in the lab.
:::
::::

:::collapse{title="The 'rotor renaissance' plan"}
Daru's revival proposal replaces the AM link with 2.4 GHz proportional
control, doubles the battery, and adds — this is the load-bearing feature —
*a landing mode*. The proposal has been "next month's project" for eleven
consecutive months. It is affectionately tracked on the lab's whiteboard
as #wip and referenced in the [[lab-member-handbook|handbook]]'s section
on scope discipline.
:::

::section[See also]{icon="🔗"}

FG #2's spiritual descendants are everywhere now — see
[[wp:Quadcopter]] for what the industry did with the concept once actual
engineers got involved. Within the lab's canon, the Helicam matters as the
first gadget with a *sensor*: the moment the lab started building things
that observe the world rather than merely gesture at it, a straight line
that runs through the [[divergence-meter|Divergence Meter]] to the
[[phone-microwave|PhoneWave]] itself. Not bad for a hat.

:::figure{align="left" width="230"}
![The corkboard](https://picsum.photos/seed/fg02-cork/230/150 "The safety memorial. The blade stays in.")
:::

::navbox{title="Technology" of="Technology"}
