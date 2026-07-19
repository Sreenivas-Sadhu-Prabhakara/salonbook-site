# SalonBook — explainer site

A standalone marketing / explainer page for **SalonBook**, the appointment
and rebooking tool for Indian salon and spa owners.

> **Your chair, always booked.** — Rs 799/mo

This is **not** the product UI. It is a polished, single-page explainer built to
make the idea instantly clear to (a) a non-technical salon owner and
(b) an investor skimming for 30 seconds.

## The idea in one line

A salon is a rebooking-cadence business. For each client, *last visit + the
service's default rebook window = a due date*. SalonBook surfaces the
"due for next visit" list, nudges those clients on WhatsApp, tracks prepaid
package balances, and flags no-shows — all on one owner dashboard.

## Files

| File          | What it is                                                        |
|---------------|-------------------------------------------------------------------|
| `index.html`  | All page content and structure                                    |
| `styles.css`  | All styling; palette built around the accent `#BE185D`            |
| `app.js`      | Sticky nav, smooth scroll, and the interactive "nudge" widget     |
| `favicon.svg` | Inline SVG appointment-book favicon                               |
| `.gitignore`  | Standard ignores                                                  |

## Run it

It is fully self-contained — no build step, no dependencies, no CDNs.

- **Open locally:** double-click `index.html`, or
  ```sh
  open index.html
  ```
- **Or serve it:**
  ```sh
  python3 -m http.server 8080
  # then visit http://localhost:8080
  ```

## Deploy

Drop the folder onto any static host (Netlify, Cloudflare Pages, GitHub Pages,
S3, Vercel). No configuration needed — every asset is inline.

## Design notes

- Palette derived from the brand rose `#BE185D`: deep plum ink, warm off-white
  paper, and a pale rose tint. Strong contrast, accent used with restraint.
- System font stack only; no web fonts.
- Signature element: the live **cadence engine** chip in the hero and the
  realistic dashboard "screenshot" in the product preview — real Indian names,
  areas, and rupee values.
- Responsive to mobile with no horizontal page scroll; wide elements scroll
  inside their own container. Respects `prefers-reduced-motion` and keyboard focus.

---

A **KARYA** studio build · sreeni.nintendo@gmail.com
