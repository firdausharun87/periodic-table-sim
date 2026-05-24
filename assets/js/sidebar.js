/* ============================================================
   sidebar.js
   Renders the shared sidebar across all pages and updates it
   based on saved progress from localStorage.
   ============================================================ */

const SIDEBAR_UNITS = [
  { id: 1, slug: 'unit-1', title: 'Where Does an Element Belong?', recommend: 'Start here', quizzes: ['prereq-1', 'practice-1', 'practice-2', 'practice-3'] },
  { id: 2, slug: 'unit-2', title: 'Size Matters — Atomic & Ionic Radii', quizzes: [] },
  { id: 3, slug: 'unit-3', title: 'Energy to Break Free — Ionisation Energy', quizzes: [] },
  { id: 4, slug: 'unit-4', title: 'Electronegativity & Oxide Behaviour', quizzes: [] }
];

function relativePath(target) {
  // Determine path prefix based on current page location
  const path = window.location.pathname;
  const inUnitsFolder = path.includes('/units/');
  return inUnitsFolder ? '../' + target : target;
}

function renderSidebar(activePageId) {
  const state = ProgressTracker.getState();

  // Determine status for each unit
  const unitStatusItems = SIDEBAR_UNITS.map(unit => {
    let statusHtml = '<span class="unit-nav-status locked-icon">○</span>';

    if (unit.quizzes.length > 0) {
      const completed = unit.quizzes.filter(q => state.quizzes[q] === 'correct').length;
      const total = unit.quizzes.length;
      if (completed === total) {
        statusHtml = '<span class="unit-nav-status complete">✓</span>';
      } else if (completed > 0) {
        statusHtml = '<span class="unit-nav-status in-progress">·</span>';
      } else {
        statusHtml = '<span class="unit-nav-status">·</span>';
      }
    }

    const isActive = activePageId === unit.slug;
    const recommendHtml = unit.recommend
      ? `<div class="unit-nav-recommend">${unit.recommend}</div>`
      : '';

    const unitHref = relativePath(`units/${unit.slug}.html`);
    const unitNum = String(unit.id).padStart(2, '0');

    return `
      <li>
        <a class="unit-nav-item${isActive ? ' active' : ''}" href="${unitHref}">
          <div class="unit-nav-row">
            <span class="unit-nav-num">Unit ${unitNum}</span>
            ${statusHtml}
          </div>
          <div class="unit-nav-title">${unit.title}</div>
          ${recommendHtml}
        </a>
      </li>
    `;
  }).join('');

  const homeHref = relativePath('index.html');
  const homeActive = activePageId === 'landing' ? ' active' : '';

  const sidebarHtml = `
    <div class="sidebar-brand">
      <a href="${homeHref}">
        <div class="sidebar-brand-tag">Chemistry EC015 · Topic 3</div>
        <div class="sidebar-brand-title">Periodic Table</div>
        <div class="sidebar-brand-sub">A Self-Instructional Module</div>
      </a>
    </div>

    <div class="sidebar-section-label">Navigation</div>
    <ul class="unit-nav">
      <li>
        <a class="unit-nav-item${homeActive}" href="${homeHref}">
          <div class="unit-nav-row">
            <span class="unit-nav-num">— Overview</span>
          </div>
          <div class="unit-nav-title">Course Home</div>
        </a>
      </li>
      ${unitStatusItems}
    </ul>

    <div class="sidebar-footer">
      Built for KMKK Chemistry Unit · Aligned to PSPM<br>
      <div class="sidebar-footer-meta">v0.1 · MVP</div>
    </div>
  `;

  const sidebarEl = document.getElementById('sidebar');
  if (sidebarEl) {
    sidebarEl.innerHTML = sidebarHtml;
  }
}
