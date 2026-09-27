# VELA — make room for more

Project 14: conventional banking website concept with original art and GSAP choreography. No Three.js, game world, real bank or external submission.

From this folder:

```powershell
bun install --frozen-lockfile
bun run dev
```

Dev: http://127.0.0.1:4524/ · production preview after `bun run build`: http://127.0.0.1:4624/ (`bun run preview`). Both bind to loopback and require the exact port.

`bun run check` runs strict TypeScript, Biome, six meaningful domain tests and a production build with static prerendering. Content is readable before JavaScript loads; interactive controls need JavaScript. Static output is in `dist/` and is not deployed.

Features: responsive graphic hero and live card finishes; scroll-linked type/rings/card composition; three-chapter product tour; usable pause-card control; savings contribution calculator; sample plan comparison; editable guided preview dialog; FAQ; mobile navigation; motion preference control and OS reduced-motion support. Every account/price/balance is fictional and no personal data is collected.

Second-pass refinements add pointer-responsive card artwork and finish lighting, expressive product-stage graphics, a goal milestone, a large moving typographic interlude and a chapter dock with reading progress. New evidence is in `docs/visual/captures/refinement-2026-09-27/`; first-delivery captures remain intact.

Design and source policy: DESIGN.md, docs/visual/PROJECT_PROFILE.md and CREDITS.md. Browser evidence and limitations: docs/visual/VERIFICATION.md and captures/review-2026-09-27. Self-review only; William's aesthetic acceptance remains open.

Browser scripts are Playwright CLI snippets, using the existing external CLI/axe cache rather than project runtime dependencies. Start the preview, then run `npx --package @playwright/cli playwright-cli -s=vela open http://127.0.0.1:4624/ --browser=chrome` and `npx --package @playwright/cli playwright-cli -s=vela --raw run-code --filename=tools/browser/review.txt`. The accessibility source path in the snippets is machine-specific and must be rediscovered if the external cache changes.
