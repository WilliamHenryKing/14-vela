# VELA — make room for more

Fictional banking portfolio concept. A conventional product website that demonstrates typography, graphic direction, authored motion and useful interactions. No Three.js or real financial service.

## Direction chosen before implementation

Considered: (A) navy institutional banking, (B) warm chalk/citron graphic banking, (C) luxury black/gold wealth management. Choose B: immediate graphic presence, approachable copy and more room for purposeful motion. A is too familiar; C implies a narrower audience and invites unsupported investment claims.

Hero: deep-green VELA wordmark, thin navigation, enormous left-aligned 'Make room for more.' Right: a large original citron disk with concentric ruled rings and two oversized bank cards. A small transaction tile and card-finishing controls make the artwork tangible. Use off-white breathing room; offset baselines deliberately. Top navigation: Everyday, Your goals, The details; clear 'Explore Vela' action.

Palette: paper #f2f3eb, ink #1f322b, citron #d7ee69, muted leaf #879489, pale sage #e1e7da. Type: Arial/Helvetica grotesk at unusually large scale and tight, optical spacing; Georgia italics for brief human accents. Body 16–18px. Strong typographic scale rather than many rounded cards. Fine rules, small uppercase indices and a four-leaf vector mark.

## Page sequence and interactions

1. Hero and card finish: fern/ink/citron selections update the actual card art; labelled pressable controls. CTA opens a no-data product preview dialog.
2. Full-width statement, word-by-word ink reveal tied to scroll; three plain-language value lines.
3. 'Less admin. More living.' product story: three scroll sections on desktop sharing a sticky sample phone: spend, organise, stay in control. Tabs provide immediate access to the same states. Narrow screens use stacked compact copy and a static app preview. Sample activity and amounts are always described as demo content.
4. Savings goals: select a goal, adjust starting amount and monthly contribution. Contribution-only projection, no interest, no returns claim. Accessible values and graph give 12-month total and time to target; zero contribution and already-reached cases are explicit.
5. Two transparent example plans, selectable side-by-side. No invented endorsements or customer counts.
6. FAQ using accessible disclosure controls, then a bold citron closing CTA and oversized footer wordmark. Footer carries concept notice and credits.

Product preview dialog: choose everyday or plus, choose card finish, view a summary, return to editing. No name, phone, email, identity documents or account creation. Native dialog traps focus, Escape closes, focus returns to trigger. All CTAs work locally.

## Motion score

Arrival 1.4–1.8 s: word mask rises, rings draw, cards rotate and translate into the composition, supporting text settles. Native navigation remains available. Hero artwork has a short scroll-linked separation; no perpetual movement.

Statement: each word changes from muted to ink while the user scrolls. Product chapters change the preview with a brief vertical transition; desktop sticky layout is ordinary CSS, ScrollTrigger only observes chapters. Goals graph draws into view; output amount interpolates on input. Plans and FAQ use restrained stagger and hover feedback. Closing wordmark has a small scroll-linked tracking/position gesture.

Respect OS reduced motion and a visible 'Motion on/off' control: all content is visible, no scrub/entrance travel, no prolonged transitions. Use useGSAP scopes/matchMedia cleanup and stable React state. No custom cursor or scroll-jacking.

## Finish line

Responsive hero and all sections, complete sample journey, calculator domain tests, real browser interaction, mobile navigation, keyboard/focus, reduced motion, production build and self-reviewed captures. Acceptance is William's; self-scores are not independent approval.
