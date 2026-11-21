# Design — Productivity Dashboard

## Visual Language

### Color system (CSS custom properties on `:root`)

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--bg` | `#f5f5f0` | `#121212` | Page background |
| `--surface` | `#ffffff` | `#1e1e1e` | Cards, top bar |
| `--border` | `#e0ddd6` | `#2e2e2e` | Borders, hover fills |
| `--text` | `#1a1a1a` | `#e8e8e8` | Body text |
| `--text-muted` | `#6b6b6b` | `#888888` | Labels, timestamps |
| `--accent` | `#4f6ef7` | `#6b8aff` | Primary actions, timer, focus rings |
| `--accent-h` | `#3a58d4` | `#849eff` | Accent hover state |
| `--danger` | `#e05252` | `#ff6b6b` | Delete hover, error text |
| `--done-color` | `#9ca3af` | `#9ca3af` | Strikethrough task text |

Theme is toggled via `data-theme="dark"` on `<html>`; JS reads/writes `localStorage.theme`.

### Typography
- Font stack: `'Segoe UI', system-ui, sans-serif` — zero-download, platform-native.
- Base size: browser default (16 px); scale in `rem`.
- Card titles: `1 rem`, `700` weight, `uppercase`, `letter-spacing: .03em`, `--text-muted`.
- Greeting: `1.3 rem`, `600` weight.
- Timer display: `3.5 rem`, `700` weight, `tabular-nums`, `--accent`.

### Spacing & Shape
- Border radius: `--radius: 12px` (cards), `8px` (inputs, buttons), `6px` (small controls), `999px` (chips).
- Card padding: `1.5 rem`.
- Grid gap / section gap: `1.5 rem`.
- Box shadow: `0 2px 12px rgba(0,0,0,.07)` light / `.4` dark.

---

## Layout

```
┌─────────────────────────────────────────────────┐
│  Top Bar: Greeting + Clock          [🌙] [✏️]   │
├──────────────┬──────────────┬────────────────────┤
│ Focus Timer  │  To-Do List  │  Quick Links        │
│              │              │                     │
└──────────────┴──────────────┴─────────────────────┘
```

- Top bar: `flex`, `space-between`, wraps on small screens.
- Main area: CSS Grid, `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`.
  - Three cards reflow to 2-up then 1-up as viewport narrows.
- Breakpoint at `480 px`: reduce padding and timer font size.

---

## Component Anatomy

### Top Bar
```
[Greeting text]       [theme toggle] [name edit]
[Date · Time]
```

### Name Modal
Overlay (`position: fixed`, semi-transparent backdrop) with a centered box:
- `<h2>` title, text `<input>`, Save / Cancel buttons.
- Closes on backdrop click or Cancel; Enter key triggers Save.

### Focus Timer Card
```
┌──────────────────┐
│  Focus Timer     │  ← card title
│    25:00         │  ← timer display (large, accent color)
│ [Start][Stop][Reset] │
└──────────────────┘
```

### To-Do Card
```
┌────────────────────────────────┐
│ To-Do                          │
│ [____________task text____] [Add] │
│ ⚠ Task already exists.         │  ← error (hidden by default)
│ ☐ Buy groceries        [✏️][🗑️] │
│ ☑ Read docs            [✏️][🗑️] │  ← strikethrough + muted
└────────────────────────────────┘
```
Edit mode replaces the `<span>` with an `<input>` and the ✏️ button with 💾.

### Quick Links Card
```
┌──────────────────────────────────┐
│ Quick Links                      │
│ [Label___] [https://…__________] [Add] │
│ [GitHub ✕] [YouTube ✕] [Docs ✕] │  ← pill chips
└──────────────────────────────────┘
```

---

## State & Storage Schema

| `localStorage` key | Type | Description |
|--------------------|------|-------------|
| `userName` | `string` | Custom name for greeting |
| `theme` | `"light" \| "dark"` | Active theme |
| `tasks` | `Array<{ id: number, text: string, done: boolean }>` | To-do items |
| `links` | `Array<{ id: number, label: string, url: string }>` | Quick links |

`id` is `Date.now()` at creation — sufficient for single-user local data.

---

## Interaction Details

| Action | Trigger | Effect |
|--------|---------|--------|
| Toggle theme | Click 🌙/☀️ | Flip `data-theme`; update icon; save to storage |
| Set name | Click ✏️ → type → Save | Persist; re-render greeting immediately |
| Start timer | Click Start | Begin `setInterval` 1 s tick; guard against double-start |
| Stop timer | Click Stop | `clearInterval`; keep remaining time |
| Reset timer | Click Reset | `clearInterval`; set remaining = 1500; re-render |
| Add task | Submit form | Duplicate check → push → save → re-render |
| Edit task | Click ✏️ | Inline edit mode; duplicate check on save |
| Toggle task | Click checkbox | Flip `done`; save; re-render |
| Delete task | Click 🗑️ | Filter out; save; re-render |
| Add link | Submit form | Auto-fix URL → push → save → re-render |
| Remove link | Click ✕ | `e.preventDefault()` stops navigation; filter; save; re-render |

---

## Accessibility Notes
- All buttons have `title` attributes for screen readers.
- Checkbox uses native `<input type="checkbox">` with `accent-color`.
- Modal traps visual focus (input auto-focused on open).
- `tabular-nums` on timer prevents layout shift each second.
