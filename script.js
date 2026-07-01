// ============================================================
// WORLD CUP 2026 TRACKER — app logic
// You should not need to edit this file. To update matches,
// teams, scores or venues, edit matches.js instead.
// ============================================================

const STORAGE_KEY = 'wc2026-watched-matches';

const STAGE_ORDER = [
  'Group Stage',
  'Round of 32',
  'Round of 16',
  'Quarterfinal',
  'Semifinal',
  'Third Place',
  'Final'
];

/** Load the set of watched match IDs from localStorage. */
function loadWatched() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (err) {
    console.error('Could not read saved progress, starting fresh.', err);
    return new Set();
  }
}

/** Persist the set of watched match IDs to localStorage. */
function saveWatched(watchedSet) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...watchedSet]));
  } catch (err) {
    console.error('Could not save progress. Your browser storage may be full or disabled.', err);
  }
}

let watched = loadWatched();

/** Group matches by stage, preserving group order within the group stage. */
function groupByStage(matches) {
  const byStage = new Map();
  STAGE_ORDER.forEach(s => byStage.set(s, []));
  matches.forEach(m => {
    if (!byStage.has(m.stage)) byStage.set(m.stage, []);
    byStage.get(m.stage).push(m);
  });
  return byStage;
}

/** Group an array of matches by their `group` field, preserving first-seen order. */
function groupByGroup(matches) {
  const byGroup = new Map();
  matches.forEach(m => {
    const key = m.group || '__none__';
    if (!byGroup.has(key)) byGroup.set(key, []);
    byGroup.get(key).push(m);
  });
  return byGroup;
}

function formatDate(dateStr) {
  if (!dateStr || dateStr.endsWith('-00')) return '';
  const d = new Date(dateStr + 'T00:00:00');
  if (isNaN(d)) return '';
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function formatScore(m) {
  const played = m.homeScore !== null && m.homeScore !== undefined &&
                 m.awayScore !== null && m.awayScore !== undefined;
  return played ? `${m.homeScore} – ${m.awayScore}` : 'vs';
}

function buildMatchRow(m) {
  const li = document.createElement('li');
  li.className = 'match-row' + (watched.has(m.id) ? ' watched' : '');
  li.dataset.matchId = m.id;

  const checkboxId = 'match-' + m.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'match-checkbox';
  checkbox.id = checkboxId;
  checkbox.checked = watched.has(m.id);
  checkbox.setAttribute('aria-label', `Mark ${m.home} vs ${m.away} as watched`);
  checkbox.addEventListener('change', () => toggleMatch(m.id, li, checkbox));

  const info = document.createElement('label');
  info.className = 'match-info';
  info.setAttribute('for', checkboxId);

  const num = document.createElement('span');
  num.className = 'match-number';
  num.textContent = String(m.matchNumber).padStart(3, '0');

  const teams = document.createElement('span');
  teams.className = 'match-teams';
  const homeFlag = (typeof getFlag === 'function' && getFlag(m.home)) || '';
  const awayFlag = (typeof getFlag === 'function' && getFlag(m.away)) || '';
  teams.textContent = `${homeFlag ? homeFlag + ' ' : ''}${m.home} vs ${awayFlag ? awayFlag + ' ' : ''}${m.away}`;

  const scoreText = formatScore(m);
  const score = document.createElement('span');
  score.className = 'match-score' + (scoreText === 'vs' ? ' no-score' : '');
  score.textContent = scoreText;

  const meta = document.createElement('span');
  meta.className = 'match-meta';
  const dateLabel = formatDate(m.date);
  const metaParts = [dateLabel, m.venue];
  if (m.note) metaParts.push(m.note);
  meta.textContent = metaParts.filter(Boolean).join(' · ');

  info.appendChild(num);
  info.appendChild(teams);
  info.appendChild(score);
  info.appendChild(meta);

  li.appendChild(checkbox);
  li.appendChild(info);

  return li;
}

function toggleMatch(id, rowEl, checkboxEl) {
  if (checkboxEl.checked) {
    watched.add(id);
    rowEl.classList.add('watched');
  } else {
    watched.delete(id);
    rowEl.classList.remove('watched');
  }
  saveWatched(watched);
  updateProgress();
}

function stageSlug(stage) {
  return 'stage-' + stage.toLowerCase().replace(/\s+/g, '-');
}

function render() {
  const container = document.getElementById('match-container');
  const nav = document.getElementById('stage-nav');
  container.innerHTML = '';
  nav.innerHTML = '';

  const byStage = groupByStage(WORLD_CUP_MATCHES);

  byStage.forEach((matchesInStage, stage) => {
    if (matchesInStage.length === 0) return;

    const section = document.createElement('section');
    section.className = 'stage-section';
    section.id = stageSlug(stage);

    const heading = document.createElement('div');
    heading.className = 'stage-heading';
    const h2 = document.createElement('h2');
    h2.textContent = stage;
    const count = document.createElement('span');
    count.className = 'stage-count';
    count.textContent = `${matchesInStage.length} matches`;
    heading.appendChild(h2);
    heading.appendChild(count);
    section.appendChild(heading);

    const hasGroups = matchesInStage.some(m => m.group);

    if (hasGroups) {
      const byGroup = groupByGroup(matchesInStage);
      byGroup.forEach((matchesInGroup, groupName) => {
        const groupBlock = document.createElement('div');
        groupBlock.className = 'group-block';

        const gHeading = document.createElement('h3');
        gHeading.className = 'group-heading';
        gHeading.textContent = groupName;
        groupBlock.appendChild(gHeading);

        const list = document.createElement('ul');
        list.className = 'match-list';
        matchesInGroup.forEach(m => list.appendChild(buildMatchRow(m)));
        groupBlock.appendChild(list);

        section.appendChild(groupBlock);
      });
    } else {
      const list = document.createElement('ul');
      list.className = 'match-list';
      matchesInStage.forEach(m => list.appendChild(buildMatchRow(m)));
      section.appendChild(list);
    }

    container.appendChild(section);

    const navLink = document.createElement('a');
    navLink.href = '#' + stageSlug(stage);
    navLink.textContent = stage;
    nav.appendChild(navLink);
  });

  updateProgress();
}

function updateProgress() {
  const total = WORLD_CUP_MATCHES.length;
  const watchedCount = WORLD_CUP_MATCHES.filter(m => watched.has(m.id)).length;
  const pct = total === 0 ? 0 : Math.round((watchedCount / total) * 100);

  document.getElementById('watched-count').textContent = String(watchedCount).padStart(3, '0');
  document.getElementById('total-count').textContent = String(total).padStart(3, '0');
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-pct').textContent = pct + '%';

  document.title = `${watchedCount}/${total} watched — World Cup 2026 Tracker`;
}

document.addEventListener('DOMContentLoaded', render);
