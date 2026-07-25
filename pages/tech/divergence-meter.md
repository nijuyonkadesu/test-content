---
title: Divergence Meter
categories: [Technology, Gadgets]
sortKey: Divergence Meter
aliases: [Nixie Meter, Divergence Gauge]
date: 2024-01-15
icon: 🔢
---

# Divergence Meter

:::infobox{title="Divergence Meter" image="https://picsum.photos/seed/divmeter/300/180" caption="1.048596 — the number everyone is chasing."}
| | |
|---|---|
| Designation | Divergence Meter (no FG number assigned) |
| Function | Displays the current worldline's divergence value |
| Display | Eight Nixie tubes, seven significant digits |
| Origin | Delivered to the lab by a future visitor |
| Readable by | Anyone; *interpretable* only with Reading Steiner |
| Reference values | Alpha < 1%, Beta ≥ 1%, Steins Gate ≈ 1.048596 |
| Power draw | ~12 W continuous |
| Housed at | [[future-gadget-lab\|Future Gadget Laboratory]] |
| Maintained by | [[okabe\|Rintaro Okabe]] |
| Replication status | One working replica, built decades early |
| Status | Operational |
:::

The **Divergence Meter** is a Nixie-tube instrument that displays a single
number: the **divergence value** of the worldline the observer currently
occupies, measured against an arbitrary zero point. It is the only
instrument the [[future-gadget-lab|Future Gadget Laboratory]] possesses that
can distinguish one worldline from another from the *inside* — without it,
a shift caused by a D-Mail is detectable only by people whose memories
survive the transition.

Unlike the [[phone-microwave|Phone Microwave]] and the
[[time-leap-machine|Time Leap Machine]], the meter was not invented at the
lab — at least, not yet. The unit on the lab's workbench was ==delivered by
a visitor who claimed to come from decades in the future==, along with the
schematics needed to eventually build it. The lab therefore maintains the
awkward position of owning a device it will not invent for another
thirty-odd years. #lore

::section[Reading the meter]{icon="👁️"}

::::columns{ratio="60-40"}
:::column
The display shows a fixed-point decimal such as `1.048596`. The integer
part identifies the **attractor field** — the broad basin of worldlines
that converge toward the same major events — and the fractional digits
identify the specific worldline within it. Values below 1.000000 belong to
the [[alpha-worldline|Alpha attractor field]]; values from 1.000000 up
(excluding the anomalous Steins Gate band) belong to
[[beta-worldline|Beta]].

Crucially, the meter's reading changes *at the instant* of a worldline
shift, but only an observer with Reading Steiner will notice, because for
everyone else the meter has "always" shown the new value. Okabe's habit of
photographing the display before every experiment exists precisely to
defeat this: the photo changes too, but his memory of taking it doesn't.
:::
:::column
**Reference readings**

- `0.337187` — deep Alpha
- `0.571024` — Alpha, late-stage
- `1.048596` — ==Steins Gate==
- `1.130205` — Beta
- `3.406288` — unconfirmed #stub
:::
::::

::section[Recorded values]{icon="📊"}

A sortable log of readings photographed at the lab. Compare with the
episode-by-episode account in the [[episode-guide]].

| Reading | Attractor field | Context | First noted |
|---|---|---|---|
| 0.337187 | Alpha | Deepest recorded Alpha excursion | [[episode-12\|Episode 12]] |
| 0.409431 | Alpha | After the lottery D-Mail was undone | [[episode-10\|Episode 10]] |
| 0.456903 | Alpha | Baseline for mid-series experiments | [[episode-06\|Episode 06]] |
| 0.523299 | Alpha | Post-IBN retrieval | [[episode-09\|Episode 09]] |
| 0.571024 | Alpha | Final Alpha reading | [[episode-13\|Episode 13]] |
| 1.048596 | Steins Gate | Target value | [[episode-16\|Episode 16]] |
| 1.064750 | Beta | First Beta confirmation | [[episode-14\|Episode 14]] |
| 1.130205 | Beta | Stable Beta plateau | [[episode-15\|Episode 15]] |

:::note
The meter does not *predict*. A reading of `1.048596` does not mean events
will go well; it means the worldline is outside both the Alpha and Beta
attractor fields' convergence — free, for better or worse, of their fixed
outcomes. See [[steins-gate-worldline]].
:::

::section[Construction]{icon="🔧"}

The replica was built by [[okabe|Okabe]] and [[daru|Daru]] from the
future schematics, sourcing IN-14 Nixie tubes from a stall in
[[akihabara|Akihabara]]'s back streets and a driver board hand-etched at
the lab. Each tube requires roughly 170 V to strike; the boost converter's
output capacitor stores

$$E = \tfrac{1}{2}CV^2 = \tfrac{1}{2}(47\,\mu F)(170\,\text{V})^2 \approx 0.68\ \text{J}$$

which is trivial next to the PhoneWave's discharge but enough to bite a
careless finger.[^1] The sensing element — the part that actually measures
divergence — is not documented in the schematics at all. The delivered unit
contains a sealed module the lab has never opened, on the visitor's advice
that ==opening it voids more than the warranty==.

::::tabs
:::tab{label="Display board"}
Eight IN-14 tubes, multiplexed 4:1. Daru's firmware refreshes at 120 Hz to
kill visible flicker on camera — important, given how often the thing gets
photographed.
:::
:::tab{label="Sensor module"}
Sealed. Mass 412 g, faintly warm, no external connections besides power and
a one-wire data line. The lab's collective decision is to not think about
it too hard.
:::
:::tab{label="Enclosure"}
Walnut and brushed aluminum, machined at the
[[braun-tube-workshop|Braun Tube Workshop]] downstairs in exchange for a
month of shop-sitting.
:::
::::

:::collapse{title="The future visitor (spoilers)"}
The person who delivered the meter also delivered a warning about what the
Alpha attractor field converges *to*. Their identity is discussed on the
worldline pages rather than here; suffice to say the lab had a personal
stake in believing them. See [[alpha-worldline#convergence]] for the
long-run outcome the meter helped everyone escape.
:::

::section[See also]{icon="🔗"}

:::figure{align="right" width="250"}
![Nixie tubes](https://picsum.photos/seed/nixie/250/160 "IN-14 tubes mid-multiplex. The camera catches what the eye can't.")
:::

For the physics-adjacent background on cold-cathode displays, see
[[wp:Nixie tube]]. The meter's readings anchor the timeline notation used
across this wiki — every event page cites a divergence value where one is
known. Related: [[attractor-field|Attractor field theory]],
[[d-mail|D-Mail]], and the never-built
[[divergence-meter-mk2|pocket divergence meter]] Daru keeps proposing.

[^1]: Twice. Both times Daru, both times the same finger.

::navbox{title="Technology" of="Technology"}
