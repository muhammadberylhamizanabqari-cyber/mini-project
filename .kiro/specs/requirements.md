# Requirements — Productivity Dashboard

## Overview
A single-page productivity dashboard built with plain HTML, CSS, and vanilla JavaScript.
No frameworks, no backend, no build step. All state lives in `localStorage`.

---

## Functional Requirements

### FR-1 Greeting
- **FR-1.1** Display a live clock (HH:MM:SS) and full date (Day, Mon DD, YYYY).
- **FR-1.2** Show a time-of-day greeting:
  - 05:00–11:59 → "Good morning"
  - 12:00–16:59 → "Good afternoon"
  - 17:00–20:59 → "Good evening"
  - 21:00–04:59 → "Good night"
- **FR-1.3** Append the user's custom name to the greeting when set (e.g. "Good morning, Alex!").
- **FR-1.4** A pencil (✏️) button opens a name-entry modal; saving persists the name to `localStorage`.

### FR-2 Focus Timer
- **FR-2.1** Default duration is 25 minutes (Pomodoro).
- **FR-2.2** Display remaining time as MM:SS.
- **FR-2.3** Three controls: **Start**, **Stop** (pause), **Reset**.
- **FR-2.4** On completion, show a browser `Notification` if permission is granted.
- **FR-2.5** Clicking Start requests Notification permission on the first use.

### FR-3 To-Do List
- **FR-3.1** Add a task via a text input + submit button (or Enter key).
- **FR-3.2** Each task has: checkbox (done), label text, Edit button, Delete button.
- **FR-3.3** Checking the checkbox marks the task done (strikethrough + muted color).
- **FR-3.4** Edit button switches the label to an inline text input; Save (💾) commits the change.
- **FR-3.5** Delete button removes the task immediately.
- **FR-3.6** All tasks persist in `localStorage` as `tasks` (array of `{ id, text, done }`).
- **FR-3.7** **Duplicate prevention**: adding or editing a task to a name that already exists (case-insensitive) is blocked; an error message appears for 2.5 s.

### FR-4 Quick Links
- **FR-4.1** A form accepts a label and a URL; submitting adds a pill chip to the link list.
- **FR-4.2** Missing protocol (`http://` / `https://`) is auto-prepended as `https://`.
- **FR-4.3** Each chip opens the URL in a new tab (`target="_blank"`, `rel="noopener noreferrer"`).
- **FR-4.4** A ✕ button on each chip removes it.
- **FR-4.5** Links persist in `localStorage` as `links` (array of `{ id, label, url }`).

### FR-5 Light / Dark Mode
- **FR-5.1** A toggle button (🌙 / ☀️) in the top bar switches themes.
- **FR-5.2** On first load, honour `prefers-color-scheme`; fall back to light.
- **FR-5.3** Selected theme persists in `localStorage` as `theme`.

---

## Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR-1 | No external dependencies (frameworks, libraries, CDN assets). |
| NFR-2 | Responsive layout down to 320 px wide. |
| NFR-3 | Readable typography; clear visual hierarchy using size, weight, and color. |
| NFR-4 | All interactive elements keyboard-accessible (focus states visible). |
| NFR-5 | Code is clean and commented; one CSS file, one JS file. |
| NFR-6 | No data leaves the browser; no network requests at runtime. |

---

## Constraints
- Stack: HTML5, CSS3 (custom properties), ES2020 vanilla JS.
- File structure: `index.html`, `css/style.css`, `js/script.js`.
- Storage: `localStorage` only.
