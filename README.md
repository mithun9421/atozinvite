# A to Z — A Chennai Love Story

The wedding invitation of **Mithun & [her name]** — `24 · 01 · 2027`, Chennai.

A scroll-driven, single-page invite built around your real story: 26 dates across
Chennai, one for every letter A–Z. **X** was always the locked mystery — and the
wedding is X finally unlocking.

```
Cover → Prologue → The A–Z trail → The X reveal (+ live countdown)
      → Details (+ add-to-calendar) → Gallery → Closing / RSVP
```

No build step. Pure HTML/CSS/JS. GSAP + fonts load from CDN.

## Personalise it (90 seconds)

Open **`assets/js/data.js`** and edit:

| Field | What to set |
|-------|-------------|
| `couple.bride` | Her name (currently `[ her name ]`) |
| `event.venueName` | The venue |
| `event.mapUrl` | A Google Maps link (RSVP/Map buttons appear automatically) |
| `event.rsvpUrl` | A form / `wa.me/…` / `mailto:` link |
| `trail[].note` | Rewrite any of the 26 one-liners to your true memories |

Swap photos anytime in `assets/photos/` (keep the `photo-NN.jpg` names, or update the
paths in `data.js`).

## Run locally

```bash
npm run dev          # serves on http://localhost:5050
# or just double-click index.html (needs internet for fonts + animations)
```

## Share it with the world

It's a static site — drop the whole folder onto any host:

- **Netlify / Vercel:** drag-and-drop the folder, done.
- **GitHub Pages:** push to a repo, enable Pages on the root.
- **Cloudflare Pages:** connect the repo, no build command needed.

## Notes

- Mobile-first; scales up to desktop.
- Respects `prefers-reduced-motion` (petals + scroll animations turn off).
- If the CDN is blocked, the page still shows everything — it just won't animate.
