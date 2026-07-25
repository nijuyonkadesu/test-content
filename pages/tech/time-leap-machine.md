---
title: Time Leap Machine
categories: [Technology, Gadgets]
sortKey: Time Leap Machine
aliases: [TL Machine, Memory Transfer Unit, Time Leap]
date: 2024-04-18
icon: ⏳
---

# Time Leap Machine

:::infobox{title="Time Leap Machine" image="https://picsum.photos/seed/timeleap/300/180" caption="No hardware moves. Only memory does."}
| | |
|---|---|
| Designation | Time Leap Machine (unofficial FG number) |
| Function | Sends a person's memory of the present into their own past body |
| Predecessor | [[phone-microwave\|Phone Microwave]] |
| Requires | A living recipient at both ends of the leap |
| Maximum confirmed range | 48 hours |
| Payload | Memory only — no matter, no message text |
| Primary risk | Donor collapses; recipient gains unexplained memories |
| Built by | [[okabe\|Okabe]], [[kurisu\|Kurisu]], [[daru\|Daru]] |
| Housed at | [[future-gadget-lab\|Future Gadget Laboratory]] |
| Status | Operational, use restricted |
:::

The **Time Leap Machine** is the lab's second confirmed time-manipulation
device and, unlike the [[phone-microwave|Phone Microwave]], it sends no
matter and no data across time at all — only a memory, and only within a
single person's own timeline. Where a D-Mail changes the past for everyone,
a time leap changes what one specific person *remembers*, snapping their
consciousness back into their own body at an earlier point along the same
worldline.

Lab members consider it both more precise and more dangerous than a D-Mail:
precise, because it never spawns the wide, unpredictable divergence a
message can; dangerous, because the "sender" experiences something very
close to dying in the process. #lore

::section[Origins]{icon="🧬"}

::::columns{ratio="60-40"}
:::column
The device grew out of an accident, not a design. During an attempt to
D-Mail a memo to a lab member's own past self, the transmission failed to
leave the building's internal phone network — instead of reaching a phone
in the past, it reached the *sender's own mind* at an earlier hour. The
recipient blacked out for several seconds and woke up with a memory of an
event that, from their perspective, hadn't happened yet.

[[kurisu|Kurisu]] recognized the failure mode immediately: the payload had
substituted a person's own neural state for a text message. Reproducing it
on purpose — and reproducing it *safely* — took considerably more work than
anyone expected, mostly because early attempts left the "sender" apparently
unconscious for minutes at a time while their mind was, functionally,
somewhere else.
:::
:::column
**Development notes**

- Accident discovered during routine D-Mail test
- Confirmed reproducible after 6 attempts
- Range capped deliberately at 48 hours
- Never tested beyond a single worldline
:::
::::

::section[Mechanism]{icon="🧠"}

A time leap routes a compressed neural snapshot through the same discharge
circuit the PhoneWave uses, but targets it at the sender's own
electromagnetic signature rather than an external handset. The energy
profile is comparable — on the order of tens of joules per attempt — but the
receiving "device" is a living brain, which the lab's equipment was never
rated to interface with directly.

$$E_{\text{leap}} \approx \tfrac{1}{2}CV^2 + \Delta E_{\text{neural}}$$

The additional term $\Delta E_{\text{neural}}$ was never rigorously
measured; [[daru|Daru]]'s working estimate is "however much a human brain
costs to move," which is not a unit anyone has managed to standardize.

::section[Modes]{icon="🎛️"}

::::tabs
:::tab{label="Short leap"}
Under six hours. Recipients report mild disorientation and a brief headache.
The lab's informal safety threshold.
:::
:::tab{label="Long leap"}
Twelve hours or more. Recipients black out for an extended period at the
sending end and report the returning memory as "loud," overwriting recent
short-term memory of the hours immediately before the leap.
:::
:::tab{label="Failed leap"}
No transfer occurs; the sender simply loses consciousness briefly with no
memory gained on the other end. More common than either successful mode.
:::
::::

:::danger
Every confirmed long leap has been followed by measurable donor fatigue
lasting days. The lab suspended non-essential testing after the third such
case. See [[divergence-meter]] for how a leap is distinguished from an
ordinary D-Mail on the instruments.
:::

::section[Recorded attempts]{icon="📋"}

| Attempt | Leap length | Outcome | Divergence change |
|---|---|---|---|
| 1 | Unintentional | Discovered phenomenon | 0.000000 |
| 2 | 2 hours | Success, mild fatigue | 0.000012 |
| 3 | 6 hours | Success | 0.000031 |
| 4 | 11 hours | Success, extended blackout | 0.000058 |
| 5 | 24 hours | Failed | 0.000000 |
| 6 | 48 hours | Success, severe fatigue | 0.000149 |

:::collapse{title="Why the lab stopped testing further"}
A leap beyond 48 hours was attempted once. The sender did not regain
consciousness for several minutes and reported, afterward, "reaching for
something and not finding it." No further long-range attempts have been
authorized. #wip
:::

::section[Related work]{icon="🔗"}

Compare with the [[phone-microwave|Phone Microwave]]'s message-based
approach and the theoretical framing in [[attractor-field|attractor field
theory]], which the lab uses to argue why leaps within a single worldline
avoid the large-scale divergence a D-Mail can cause. For background on
memory and consciousness generally, see [[wp:Memory]].

:::figure{align="left" width="240"}
![Leap chair](https://picsum.photos/seed/leapchair/240/160 "The lab's reclining chair, repurposed for leap sessions.")
:::

The device shares its physical footprint with the PhoneWave — both draw
from the same capacitor bank — which is why only one can be used per day
without risking a brownout across the whole building.[^1] The lab has,
separately, speculated about a hypothetical [[reading-steiner-amplifier|
Reading Steiner amplifier]] that would let a leap recipient retain
memories across a full worldline shift, not just within one; no such device
exists yet.

[^1]: This happened once, during a thunderstorm, and knocked out the
    building's CRT repair shop downstairs for an afternoon.

::navbox{title="Technology" of="Technology"}
