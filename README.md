# Periodic Table — Self-Instructional Module

A self-paced learning module for Chemistry EC015 (Topic 3 — Periodic Table) at Kolej Matrikulasi Kejuruteraan Kedah.

**Version:** v0.1 MVP
**Status:** Unit 1 complete · Units 2–4 placeholder

---

## Project Structure

```
periodic-table-sim/
├── index.html                  ← Landing / course home
├── units/
│   ├── unit-1.html             ← Where Does an Element Belong? (COMPLETE)
│   ├── unit-2.html             ← Size Matters (placeholder)
│   ├── unit-3.html             ← Energy to Break Free (placeholder)
│   └── unit-4.html             ← Electronegativity & Oxides (placeholder)
├── assets/
│   ├── css/
│   │   └── styles.css          ← Shared design system
│   └── js/
│       ├── progress.js         ← localStorage-based quiz tracking
│       ├── sidebar.js          ← Shared sidebar rendering
│       └── quiz.js             ← Quiz interaction logic
└── README.md
```

---

## How It Works

- **Static site** — no backend, no build step. Just open `index.html` in a browser.
- **Progress persists** across sessions using `localStorage` (per-browser, no account needed).
- **Sidebar is shared** — rendered by JavaScript on each page from a single config in `sidebar.js`.
- **Soft gating** — Unit 1 is signposted as the recommended start, but all units are freely clickable.

---

## Deploying to GitHub Pages

1. Create a new repository on GitHub (e.g. `periodic-table-sim`).
2. Push the contents of this folder to the repository root.
3. In repo settings → Pages → set **Source** to `main` branch, `/ (root)` folder.
4. Your site will be live at `https://<your-username>.github.io/periodic-table-sim/` within a minute or two.

Alternatively for Netlify: drag and drop the folder into Netlify's deploy area.

---

## Adding a New Unit

The structure is designed for easy replication. To build Unit 2:

1. Duplicate `units/unit-1.html` → `units/unit-2.html` (overwrite the placeholder).
2. Replace the unit title, deck text, and breadcrumb to reflect Unit 2.
3. Edit the `data-unit-quizzes` attribute on `<main>` to list Unit 2's quiz IDs.
4. Replace each event block's content with Unit 2 material.
5. Update `sidebar.js` — add the new quiz IDs to the `quizzes:` array for Unit 2.

No CSS or JS changes needed — the design system and tracking logic are shared.

---

## Pedagogical Framework

Each unit follows **Gagné's 9 Events of Instruction**, mapped into 7 content blocks:

| Block | Gagné Event(s) |
|-------|----------------|
| 01 Learning Outcomes | 2. Inform learner of objectives |
| 02 Before You Begin | 3. Stimulate recall of prior learning |
| 03 Period & Group | 4. Present content |
| 04 Blocks | 4. Present content (continued) |
| 05 Worked Example | 5. Provide learning guidance |
| 06 Your Turn | 6. Elicit performance · 7. Provide feedback |
| 07 Summary | 9. Enhance retention and transfer |

Other instructional design principles applied:
- **Constructive alignment** (Biggs) — quiz items map to PSPM assessment patterns
- **Cognitive load theory** (Sweller) — chunked content, worked examples before practice
- **Mayer's multimedia principles** — text + visual integration, no redundancy
- **Andragogy** (Knowles) — self-paced, learner control, explicit relevance
- **UDL** — multiple representations (text, visual, worked steps)

---

## Credits

Built for KMKK Chemistry Unit · Aligned to PSPM curriculum
