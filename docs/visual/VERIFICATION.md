# VELA verification — 27 September 2026

Local implementation and self-review complete for the agreed website scope. No publication or independent/user visual acceptance is claimed.

## Evidence

`captures/baseline/`: first desktop and portrait render. `captures/review-2026-09-27/`: hero, statement, product controls, calculator, plans, closing, dialog, multiple viewport and reduced-motion captures. `meta.json` records 25 successful browser assertions, browser identity and scope. `contrast-before.json` preserves the initial accessibility findings rather than concealing them. `final-check.json` records the resolved desktop/dialog/summary scans and no-JavaScript check. `build-receipt.json` records exact emitted files, sizes and SHA256 identities.

Actual environment: installed Chrome 154 in headless Playwright on Windows, CSS DPR 1. 1440×1000 plus 1920×1080, 768×1024, 390×844, 320×740 and 844×390. This is browser emulation, not physical phone testing or GPU performance certification.

## Results

- Strict TypeScript and Biome pass. Six contribution/plan domain tests, 19 assertions pass. Vite production build and static React prerender pass.
- 25 browser assertions pass: visible card finish, native dialog opening, plan cost, edit preservation, Escape/focus return, pause-card, pockets, zero contribution, reached goal, changed goal, FAQ, user and OS motion controls, five overflow checks, mobile navigation/control, keyboard skip link and absence of console errors.
- Automated axe WCAG 2 A/AA and 2.1 AA scans report zero violations in the final reduced-motion mobile page, desktop page, preview form and summary states. This is bounded automated evidence, not a full accessibility certification.
- HTTP 200 and readable H1/content with JavaScript disabled. No raster/font network assets or external runtime requests are needed. About 372 kB JS / 34 kB CSS raw (about 126 / 9 kB gzip) before HTML; exact final raw bytes are in the build receipt.
- Screen-reader heading spacing was repaired. Low-contrast secondary labels were darkened. The phone status text was given additional room.

The initial run hit a review-script selector mismatch for a FAQ summary containing its numeric index. The selector was corrected; this was a test-script failure, not an application click failure. CLI snippets are kept as .txt because the CLI parser expects a function expression and a formatter's trailing semicolon is invalid there.

## Limits

Images were inspected as sampled static states. No claim of uninterrupted motion viewing, measured FPS, screen-reader assistive-technology use, physical-phone performance or independent acceptance. The visual scorecard records the remaining design limitations. Banking copy, balances and prices are fictional; the application is a local portfolio demonstration with no backend or account creation.
