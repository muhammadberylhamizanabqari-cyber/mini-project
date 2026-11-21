/* ═══════════════════════════════════════════════════════════
   Productivity Dashboard — script.js
   All data stored in localStorage.
═══════════════════════════════════════════════════════════ */

/* ── Storage helpers ─────────────────────────────────────── */
const store = {
  get: (key, fallback = null) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
};

/* ═══════════════════════════════════════════════════════════
   1. GREETING — time, date, custom name
═══════════════════════════════════════════════════════════ */
const greetingText  = document.getElementById('greeting-text');
const datetimeText  = document.getElementById('datetime-text');
const editNameBtn   = document.getElementById('edit-name-btn');
const nameModal     = document.getElementById('name-modal');
const nameInput     = document.getElementById('name-input');
const nameSaveBtn   = document.getElementById('name-save-btn');
const nameCancelBtn = document.getElementById('name-cancel-btn');

/** Return greeting word for current hour */
function getGreetingWord(hour) {
  if (hour >= 5  && hour < 12) return 'Good morning';
  if (hour >= 12 && hour < 17) return 'Good afternoon';
  if (hour >= 17 && hour < 21) return 'Good evening';
  return 'Good night';
}

/** Pad a number to two digits */
const pad = n => String(n).padStart(2, '0');

/** Update greeting and clock every second */
function updateGreeting() {
  const now    = new Date();
  const hour   = now.getHours();
  const name   = store.get('userName', '');
  const word   = getGreetingWord(hour);

  greetingText.textContent = name ? `${word}, ${name}!` : `${word}!`;

  const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const time   = `${pad(hour)}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const date   = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  datetimeText.textContent = `${time} · ${date}`;
}

setInterval(updateGreeting, 1000);
updateGreeting();

/* Name modal — open */
editNameBtn.addEventListener('click', () => {
  nameInput.value = store.get('userName', '');
  nameModal.classList.remove('hidden');
  nameInput.focus();
});

/* Name modal — save */
nameSaveBtn.addEventListener('click', () => {
  const val = nameInput.value.trim();
  store.set('userName', val);
  nameModal.classList.add('hidden');
  updateGreeting();
});

/* Name modal — cancel */
nameCancelBtn.addEventListener('click', () => nameModal.classList.add('hidden'));

/* Close modal on backdrop click */
nameModal.addEventListener('click', e => {
  if (e.target === nameModal) nameModal.classList.add('hidden');
});

/* Save on Enter key */
nameInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') nameSaveBtn.click();
});

/* ═══════════════════════════════════════════════════════════
   2. LIGHT / DARK THEME
═══════════════════════════════════════════════════════════ */
const themeToggle = document.getElementById('theme-toggle');
const html        = document.documentElement;

/** Apply a theme and update the toggle icon */
function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  store.set('theme', theme);
}

/* Load saved theme or respect system preference */
const savedTheme = store.get('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* ═══════════════════════════════════════════════════════════
   3. FOCUS TIMER
═══════════════════════════════════════════════════════════ */
const TIMER_MINUTES  = 25;
const TIMER_SECONDS  = TIMER_MINUTES * 60;

const timerDisplay   = document.getElementById('timer-display');
const timerStartBtn  = document.getElementById('timer-start');
const timerStopBtn   = document.getElementById('timer-stop');
const timerResetBtn  = document.getElementById('timer-reset');

let timerInterval = null;
let remaining     = TIMER_SECONDS;
let running       = false;

/** Format seconds as MM:SS */
function formatTime(secs) {
  return `${pad(Math.floor(secs / 60))}:${pad(secs % 60)}`;
}

function renderTimer() {
  timerDisplay.textContent = formatTime(remaining);
}

function startTimer() {
  if (running) return;
  running = true;
  timerInterval = setInterval(() => {
    if (remaining <= 0) {
      clearInterval(timerInterval);
      running = false;
      timerDisplay.textContent = '00:00';
      /* Optional: notify user when done */
      if (Notification.permission === 'granted') {
        new Notification('Focus session complete! 🎉');
      }
      return;
    }
    remaining--;
    renderTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  running = false;
}

function resetTimer() {
  stopTimer();
  remaining = TIMER_SECONDS;
  renderTimer();
}

timerStartBtn.addEventListener('click', startTimer);
timerStopBtn .addEventListener('click', stopTimer);
timerResetBtn.addEventListener('click', resetTimer);

/* Request notification permission on first start */
timerStartBtn.addEventListener('click', () => {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}, { once: true });

renderTimer();

/* ═══════════════════════════════════════════════════════════
   4. TO-DO LIST
═══════════════════════════════════════════════════════════ */
const todoForm  = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoError = document.getElementById('todo-error');
const todoList  = document.getElementById('todo-list');

/** Load tasks from storage. Each task: { id, text, done } */
function loadTasks() { return store.get('tasks', []); }
function saveTasks(tasks) { store.set('tasks', tasks); }

/** Check for a duplicate (case-insensitive) */
function isDuplicate(tasks, text) {
  return tasks.some(t => t.text.toLowerCase() === text.toLowerCase());
}

/** Render all tasks */
function renderTasks() {
  const tasks = loadTasks();
  todoList.innerHTML = '';
  tasks.forEach(task => todoList.appendChild(createTaskEl(task)));
}

/** Build a task list item element */
function createTaskEl(task) {
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.dataset.id = task.id;

  /* Checkbox */
  const cb = document.createElement('input');
  cb.type    = 'checkbox';
  cb.checked = task.done;
  cb.addEventListener('change', () => toggleTask(task.id));

  /* Text label */
  const span = document.createElement('span');
  span.className  = 'todo-text' + (task.done ? ' done' : '');
  span.textContent = task.text;

  /* Action buttons */
  const actions = document.createElement('div');
  actions.className = 'todo-actions';

  const editBtn = document.createElement('button');
  editBtn.className   = 'small-btn';
  editBtn.textContent = '✏️';
  editBtn.title = 'Edit';
  editBtn.addEventListener('click', () => startEdit(task.id, li, span));

  const delBtn = document.createElement('button');
  delBtn.className   = 'small-btn danger';
  delBtn.textContent = '🗑️';
  delBtn.title = 'Delete';
  delBtn.addEventListener('click', () => deleteTask(task.id));

  actions.append(editBtn, delBtn);
  li.append(cb, span, actions);
  return li;
}

/** Switch a task row into edit mode */
function startEdit(id, li, span) {
  const tasks   = loadTasks();
  const task    = tasks.find(t => t.id === id);
  if (!task) return;

  /* Replace span with an input */
  const input = document.createElement('input');
  input.type      = 'text';
  input.className = 'todo-edit-input';
  input.value     = task.text;
  input.maxLength = 120;
  li.replaceChild(input, span);
  input.focus();

  /* Replace edit btn with save btn */
  const actions = li.querySelector('.todo-actions');
  const saveBtn = document.createElement('button');
  saveBtn.className   = 'small-btn';
  saveBtn.textContent = '💾';
  saveBtn.title = 'Save';

  const editBtn = actions.querySelector('button');
  actions.replaceChild(saveBtn, editBtn);

  const finishEdit = () => {
    const newText = input.value.trim();
    if (!newText) return; /* ignore empty */
    const tasks = loadTasks();

    /* Duplicate check (allow keeping the same text) */
    const clash = tasks.find(
      t => t.text.toLowerCase() === newText.toLowerCase() && t.id !== id
    );
    if (clash) { input.style.borderColor = 'var(--danger)'; return; }

    tasks.find(t => t.id === id).text = newText;
    saveTasks(tasks);
    renderTasks();
  };

  saveBtn.addEventListener('click', finishEdit);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') finishEdit(); });
}

/** Toggle done state */
function toggleTask(id) {
  const tasks = loadTasks();
  const task  = tasks.find(t => t.id === id);
  if (task) { task.done = !task.done; saveTasks(tasks); renderTasks(); }
}

/** Delete a task */
function deleteTask(id) {
  saveTasks(loadTasks().filter(t => t.id !== id));
  renderTasks();
}

/* Add task */
todoForm.addEventListener('submit', e => {
  e.preventDefault();
  const text  = todoInput.value.trim();
  if (!text) return;

  const tasks = loadTasks();

  /* Duplicate check */
  if (isDuplicate(tasks, text)) {
    todoError.classList.remove('hidden');
    setTimeout(() => todoError.classList.add('hidden'), 2500);
    return;
  }

  tasks.push({ id: Date.now(), text, done: false });
  saveTasks(tasks);
  todoInput.value = '';
  todoError.classList.add('hidden');
  renderTasks();
});

renderTasks();

/* ═══════════════════════════════════════════════════════════
   5. QUICK LINKS
═══════════════════════════════════════════════════════════ */
const linkForm  = document.getElementById('link-form');
const linkLabel = document.getElementById('link-label');
const linkUrl   = document.getElementById('link-url');
const linkList  = document.getElementById('link-list');

/** Load links from storage. Each link: { id, label, url } */
function loadLinks() { return store.get('links', []); }
function saveLinks(links) { store.set('links', links); }

/** Render all link chips */
function renderLinks() {
  const links = loadLinks();
  linkList.innerHTML = '';
  links.forEach(link => linkList.appendChild(createLinkEl(link)));
}

/** Build a chip element for a link */
function createLinkEl(link) {
  const a = document.createElement('a');
  a.className = 'link-chip';
  a.href      = link.url;
  a.target    = '_blank';
  a.rel       = 'noopener noreferrer';
  a.textContent = link.label;

  /* Remove button inside chip */
  const rm = document.createElement('button');
  rm.className   = 'remove-link';
  rm.textContent = '✕';
  rm.title = 'Remove';
  rm.addEventListener('click', e => {
    e.preventDefault(); /* don't follow the link */
    removeLink(link.id);
  });

  a.appendChild(rm);
  return a;
}

/** Remove a link by id */
function removeLink(id) {
  saveLinks(loadLinks().filter(l => l.id !== id));
  renderLinks();
}

/* Add link */
linkForm.addEventListener('submit', e => {
  e.preventDefault();
  const label = linkLabel.value.trim();
  let   url   = linkUrl.value.trim();

  if (!label || !url) return;

  /* Auto-prepend https:// if no protocol given */
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;

  const links = loadLinks();
  links.push({ id: Date.now(), label, url });
  saveLinks(links);
  linkLabel.value = '';
  linkUrl.value   = '';
  renderLinks();
});

renderLinks();
