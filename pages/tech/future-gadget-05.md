---
title: "Future Gadget #5: Kerberos Tap"
categories: [Technology, Gadgets]
sortKey: Future Gadget 05
aliases: [Kerberos Tap, FG-05]
date: 2024-03-05
icon: 🔌
---

# Future Gadget #5: Kerberos Tap

:::infobox{title="FG #5 — Kerberos Tap" image="https://picsum.photos/seed/fg05/300/180" caption="Three heads. One leash. Guards the underworld of the lab's wiring."}
| | |
|---|---|
| Designation | Future Gadget #5 |
| Common name | Kerberos Tap |
| Function | Voice-commanded three-way power strip |
| Inventors | [[daru\|Daru]] (electronics), [[okabe\|Okabe]] (mythology) |
| Channels | 3 relays × 1500 W |
| Wake word | "Kerberos!" (non-negotiable) |
| Recognition accuracy | 71% (lab ambient), 12% (Comima ambient) |
| Vocabulary | 9 commands |
| Response latency | 0.8 s plus dramatic pause |
| Status | In service, main bench |
:::

**Future Gadget #5**, the **Kerberos Tap**, is a voice-controlled power
strip: three switched outlets, one salvaged speech-recognition module, and
a name that recasts flipping a relay as commanding the hound of Hades.
Shout *"Kerberos! First head, wake!"* and the
[[phone-microwave|PhoneWave]]'s bench light comes on. Shout it again
slightly differently and, 29% of the time, nothing happens, which the
[[future-gadget-lab|lab]] has agreed to call "the hound's discretion."

::section[Origin]{icon="📜"}

::::columns{ratio="65-35"}
:::column
The Tap exists because the lab's main bench accumulated three devices
whose plugs live behind the [[ibn-5100|IBN 5100]] — a machine that weighs
25 kg and does not move for anyone's convenience. After the third
bench-diving expedition in one week, [[daru|Daru]] wired three relays to
a discontinued voice-recognition doorbell chip he'd bought years earlier
"for exactly this kind of emergency."

[[okabe|Okabe]]'s contribution came at naming time. A three-outlet strip
is a three-headed guardian; a three-headed guardian is Kerberos; and a
power strip named Kerberos requires — *requires* — that commands be
delivered as invocations. The syntax stuck because it works: the
recognizer's accuracy is measurably higher on Okabe's declaimed
==\"KERBEROS!\"== than on anyone's normal speaking voice, a fact Daru
has verified, resents, and cannot explain.
:::
:::column
**Command vocabulary**

- "First/Second/Third head, wake"
- "First/Second/Third head, sleep"
- "All heads, wake"
- "All heads, sleep"
- "Guard" — all off after 60 s
  (the "leaving the lab" command)
:::
::::

::section[Specifications]{icon="📐"}

| Parameter | Value | Notes |
|---|---|---|
| Relay channels | 3 | 1500 W each, audible *clunk* |
| Recognition chip | HM2007-derivative | Trained per-speaker |
| Vocabulary slots | 12 (9 used) | 3 reserved "for the future" |
| Wake-word accuracy | 94% | The one thing it hears reliably |
| Full-command accuracy | 71% | Lab-quiet conditions |
| False triggers | ~2/month | See incident table |
| Standby draw | 1.1 W | The hound never sleeps |

:::warning
Channel relays are mechanical and loud by design — Daru wanted
unambiguous physical confirmation, having read enough SERN archive
material to distrust silent switching forever. The *clunk* is audible
through the floor in the [[braun-tube-workshop|Braun Tube Workshop]],
whose proprietor has learned to interpret the lab's day from its rhythm.
:::

::section[Incident log]{icon="📋"}

::::tabs
:::tab{label="False triggers"}
Documented causes include: a TV documentary about Greek mythology; a
customer downstairs sneezing with unusual commitment; and
[[mayuri|Mayuri]] reading a picture book aloud, which powered down the
soldering iron mid-joint. The phrase "care-bear-os" is now banned in the
lab under statute #wip.
:::
:::tab{label="The rice cooker summit"}
For one winter the third head fed a rice cooker, making "Kerberos! Third
head, wake!" the lab's lunch bell. Decommissioned after the cooker's own
electronics interpreted a brownout as a menu change and produced what the
log calls "congee, adversarial."
:::
:::tab{label="Comima demo"}
At 12% accuracy in convention noise, the demo devolved into Okabe
shouting mythology at an unresponsive power strip for four minutes —
which drew a bigger crowd than any working demo the lab has run.
Three people asked where to buy one. Validation, again.
:::
::::

:::collapse{title="Kurisu's security review"}
[[kurisu|Kurisu]]'s notebook entry: "It's a relay board with a doorbell
chip. Anyone in earshot can command it. Your threat model is 'roommates.'"
Daru's appended rebuttal: "Threat model is *bench ergonomics*, and the
hound has never once made me move the IBN." No further review was filed.
The exchange is preserved in the [[lab-member-handbook|handbook]] as the
canonical example of requirements disagreement.
:::

::section[See also]{icon="🔗"}

The speech chip's lineage is documented at
[[wp:Speech recognition]]; the mythology at [[wp:Cerberus]]. Within the
FG line, the Tap continues the [[future-gadget-04|Moad Snake]]'s quiet
doctrine — a real tool wearing a costume — and its three reserved
vocabulary slots are the lab's most honest roadmap: capacity for the
future, contents unknown. A proposed fourth relay ("the head Hades
removed") is tracked as the red link
[[kerberos-tap-fourth-head|fourth head proposal]].

:::figure{align="right" width="240"}
![Bench install](https://picsum.photos/seed/fg05-bench/240/150 "The Tap enthroned. The IBN looms, unmoved, as is tradition.")
:::

::navbox{title="Technology" of="Technology"}
