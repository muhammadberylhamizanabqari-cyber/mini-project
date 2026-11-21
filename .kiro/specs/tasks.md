# Tasks — Productivity Dashboard

Status key: ✅ Done · 🔄 In progress · ⬜ Not started

---

## Phase 1 — Scaffold

| # | Task | File(s) | Status |
|---|------|---------|--------|
| 1.1 | Create folder structure (`css/`, `js/`, `.kiro/specs/`) | — | ✅ |
| 1.2 | Write `index.html` with semantic structure and section IDs | `index.html` | ✅ |
| 1.3 | Link `css/style.css` and `js/script.js` in `<head>` / end of `<body>` | `index.html` | ✅ |

---

## Phase 2 — Styling

| # | Task | File(s) | Status |
|---|------|---------|--------|
| 2.1 | Define CSS custom properties for light and dark themes | `css/style.css` | ✅ |
| 2.2 | Style top bar, greeting, and icon buttons | `css/style.css` | ✅ |
| 2.3 | Style main grid (auto-fit, responsive) | `css/style.css` | ✅ |
| 2.4 | Style card component (surface, shadow, radius) | `css/style.css` | ✅ |
| 2.5 | Style inputs, primary and secondary buttons | `css/style.css` | ✅ |
| 2.6 | Style timer display (large tabular-nums, accent color) | `css/style.css` | ✅ |
| 2.7 | Style to-do list items, done state, inline edit input | `css/style.css` | ✅ |
| 2.8 | Style link chips (pill, hover accent fill, remove button) | `css/style.css` | ✅ |
| 2.9 | Style name modal (overlay, centered box) | `css/style.css` | ✅ |
| 2.10 | Add 480 px breakpoint adjustments | `css/style.css` | ✅ |

---

## Phase 3 — JavaScript: Greeting & Theme

| # | Task | File(s) | Status |
|---|------|---------|--------|
| 3.1 | Implement `store.get` / `store.set` localStorage helpers | `js/script.js` | ✅ |
| 3.2 | Live clock: update greeting text and date/time every 1 s | `js/script.js` | ✅ |
| 3.3 | Time-of-day greeting word (morning / afternoon / evening / night) | `js/script.js` | ✅ |
| 3.4 | Name modal: open, save, cancel, Enter key, backdrop close | `js/script.js` | ✅ |
| 3.5 | Theme toggle: flip `data-theme`, update icon, persist | `js/script.js` | ✅ |
| 3.6 | First-load theme: read `localStorage.theme` or `prefers-color-scheme` | `js/script.js` | ✅ |

---

## Phase 4 — JavaScript: Focus Timer

| # | Task | File(s) | Status |
|---|------|---------|--------|
| 4.1 | Render MM:SS display from remaining seconds | `js/script.js` | ✅ |
| 4.2 | Start: guard double-start; `setInterval` 1 s tick | `js/script.js` | ✅ |
| 4.3 | Stop: `clearInterval`, keep remaining | `js/script.js` | ✅ |
| 4.4 | Reset: stop + restore to 1500 s + re-render | `js/script.js` | ✅ |
| 4.5 | On completion: fire browser `Notification` if permission granted | `js/script.js` | ✅ |
| 4.6 | Request Notification permission on first Start click | `js/script.js` | ✅ |

---

## Phase 5 — JavaScript: To-Do List

| # | Task | File(s) | Status |
|---|------|---------|--------|
| 5.1 | Load / save tasks array from `localStorage` | `js/script.js` | ✅ |
| 5.2 | Render task list from storage on page load | `js/script.js` | ✅ |
| 5.3 | Add task: trim, duplicate check, push, save, re-render | `js/script.js` | ✅ |
| 5.4 | Show / auto-hide "already exists" error on duplicate | `js/script.js` | ✅ |
| 5.5 | Toggle done: flip `done`, save, re-render | `js/script.js` | ✅ |
| 5.6 | Inline edit: replace span with input, swap button to 💾 | `js/script.js` | ✅ |
| 5.7 | Edit save: duplicate check (excluding self), commit, re-render | `js/script.js` | ✅ |
| 5.8 | Delete: filter out by id, save, re-render | `js/script.js` | ✅ |

---

## Phase 6 — JavaScript: Quick Links

| # | Task | File(s) | Status |
|---|------|---------|--------|
| 6.1 | Load / save links array from `localStorage` | `js/script.js` | ✅ |
| 6.2 | Render link chips from storage on page load | `js/script.js` | ✅ |
| 6.3 | Add link: auto-prepend `https://`, push, save, re-render | `js/script.js` | ✅ |
| 6.4 | Remove link: prevent default on chip, filter, save, re-render | `js/script.js` | ✅ |

---

## Phase 7 — Spec Docs

| # | Task | File(s) | Status |
|---|------|---------|--------|
| 7.1 | Write `requirements.md` | `.kiro/specs/requirements.md` | ✅ |
| 7.2 | Write `design.md` | `.kiro/specs/design.md` | ✅ |
| 7.3 | Write `tasks.md` | `.kiro/specs/tasks.md` | ✅ |

---

## Possible Future Tasks

| # | Idea |
|---|------|
| F-1 | Progress ring animation around the timer display |
| F-2 | Task priority levels (Low / Medium / High) with color badges |
| F-3 | Notes / scratchpad card with auto-save |
| F-4 | Drag-to-reorder tasks |
| F-5 | Custom timer duration (not locked to 25 min) |
| F-6 | Task due dates with overdue highlighting |
| F-7 | Export tasks as plain-text or CSV |
