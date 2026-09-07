'use strict';

/* =========================================================================
   EL DATO FALSO — lógica del juego
   Se elige un tema; casi todos los jugadores reciben sus 4 datos
   verdaderos, pero los "mentirosos" reciben la misma lista con UN dato
   sustituido por uno falso, sin saberlo ellos mismos. Cada uno lee sus
   datos en voz alta y el grupo vota quién cree que tiene el dato falso.
   Estado solo en memoria, nunca en localStorage salvo los ajustes.
   ========================================================================= */

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 10;
const SETTINGS_KEY = 'el-dato-falso-settings-v1';

let settings = {
  playerCount: 4,
  liarCount: 1,
  categoryKey: TOPIC_MEZCLA_KEY
};
let liarManuallySet = false;
let round = null;
let isAdvancing = false;
let lastTopicKey = null;

function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
function maxLiarsFor(playerCount) { return Math.max(1, Math.floor((playerCount - 1) / 2)); }
function suggestedLiarCount(playerCount) { return playerCount >= 7 ? Math.min(2, maxLiarsFor(playerCount)) : 1; }

function shuffled(array) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickLiarIndices(playerCount, liarCount) {
  const indices = Array.from({ length: playerCount }, (_, i) => i);
  return new Set(shuffled(indices).slice(0, liarCount));
}

function pickTopicForCategory(categoryKey) {
  let realKey = categoryKey;
  if (categoryKey === TOPIC_MEZCLA_KEY) {
    realKey = TOPIC_CATEGORY_KEYS[Math.floor(Math.random() * TOPIC_CATEGORY_KEYS.length)];
  }
  const list = TOPIC_CATEGORIES[realKey].topics;
  let candidates = list;
  const withKeys = list.map((t, i) => realKey + '-' + i);
  if (list.length > 1 && lastTopicKey !== null) {
    const filteredIdx = withKeys.map((k, i) => k !== lastTopicKey ? i : -1).filter((i) => i !== -1);
    if (filteredIdx.length > 0) candidates = filteredIdx.map((i) => list[i]);
  }
  const idx = Math.floor(Math.random() * candidates.length);
  const topic = candidates[idx];
  const topicKey = realKey + '-' + list.indexOf(topic);
  return { topic, topicKey, categoryLabel: TOPIC_CATEGORIES[realKey].label };
}

// Genera la tarjeta de datos de un jugador: si es mentiroso, sustituye UNO
// de los 4 datos verdaderos (elegido al azar) por un dato falso al azar.
function buildFactCard(topic, isLiar) {
  const facts = topic.verdaderos.slice();
  if (isLiar && topic.falsos.length > 0) {
    const swapIndex = Math.floor(Math.random() * facts.length);
    const falseFact = topic.falsos[Math.floor(Math.random() * topic.falsos.length)];
    facts[swapIndex] = falseFact;
  }
  return facts;
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (typeof parsed.playerCount === 'number') {
      settings.playerCount = clamp(Math.round(parsed.playerCount), MIN_PLAYERS, MAX_PLAYERS);
    }
    if (typeof parsed.categoryKey === 'string' &&
        (parsed.categoryKey === TOPIC_MEZCLA_KEY || TOPIC_CATEGORY_KEYS.includes(parsed.categoryKey))) {
      settings.categoryKey = parsed.categoryKey;
    }
    const max = maxLiarsFor(settings.playerCount);
    if (typeof parsed.liarCount === 'number') {
      settings.liarCount = clamp(Math.round(parsed.liarCount), 1, max);
      liarManuallySet = true;
    } else {
      settings.liarCount = suggestedLiarCount(settings.playerCount);
    }
  } catch (err) { /* localStorage inaccesible: seguimos con valores por defecto */ }
}

function saveSettings() {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (err) { /* no disponible */ }
}

const el = {};

function cacheDom() {
  el.screens = document.querySelectorAll('.screen');
  el.siteHeader = document.querySelector('.site-header');

  el.playerCountValue = document.getElementById('player-count-value');
  el.playerMinus = document.getElementById('btn-player-minus');
  el.playerPlus = document.getElementById('btn-player-plus');
  el.liarCountValue = document.getElementById('liar-count-value');
  el.liarMinus = document.getElementById('btn-liar-minus');
  el.liarPlus = document.getElementById('btn-liar-plus');
  el.liarHint = document.getElementById('liar-hint');
  el.categoryOptions = document.getElementById('category-options');
  el.btnStart = document.getElementById('btn-start-game');

  el.revealPlayerLabel = document.getElementById('reveal-player-label');
  el.revealProgress = document.getElementById('reveal-progress');
  el.holdBtn = document.getElementById('hold-reveal-btn');
  el.holdPrompt = document.getElementById('hold-prompt');
  el.rolePanel = document.getElementById('role-panel');
  el.roleCategoryLabel = document.getElementById('role-category-label');
  el.roleContent = document.getElementById('role-content');
  el.btnNextPlayer = document.getElementById('btn-next-player');

  el.btnGoToVote = document.getElementById('btn-go-to-vote');
  el.voteButtons = document.getElementById('vote-buttons');
  el.btnReveal = document.getElementById('btn-reveal');

  el.resultsTopic = document.getElementById('results-topic');
  el.resultsFacts = document.getElementById('results-facts');
  el.resultsLiars = document.getElementById('results-liars');
  el.resultsVotes = document.getElementById('results-votes');
  el.btnPlayAgain = document.getElementById('btn-play-again');
  el.btnNewGame = document.getElementById('btn-new-game');
}

function showScreen(name) {
  el.screens.forEach((section) => { section.hidden = section.dataset.screen !== name; });
  if (el.siteHeader) el.siteHeader.hidden = name !== 'setup';
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

function renderCategoryOptions() {
  el.categoryOptions.innerHTML = '';
  const makePill = (key, label, count) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'category-pill';
    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-checked', String(settings.categoryKey === key));
    if (settings.categoryKey === key) btn.classList.add('is-selected');
    btn.innerHTML = `<span class="category-pill-name">${label}</span>` +
      (count ? `<span class="category-pill-count">${count} temas</span>` : '<span class="category-pill-count">Todas las categorías</span>');
    btn.addEventListener('click', () => { settings.categoryKey = key; renderCategoryOptions(); });
    return btn;
  };
  el.categoryOptions.appendChild(makePill(TOPIC_MEZCLA_KEY, 'Mezcla de todas', null));
  TOPIC_CATEGORY_KEYS.forEach((key) => {
    el.categoryOptions.appendChild(makePill(key, TOPIC_CATEGORIES[key].label, TOPIC_CATEGORIES[key].topics.length));
  });
}

function renderSetup() {
  el.playerCountValue.textContent = String(settings.playerCount);
  el.playerMinus.disabled = settings.playerCount <= MIN_PLAYERS;
  el.playerPlus.disabled = settings.playerCount >= MAX_PLAYERS;

  const max = maxLiarsFor(settings.playerCount);
  el.liarCountValue.textContent = String(settings.liarCount);
  el.liarMinus.disabled = settings.liarCount <= 1;
  el.liarPlus.disabled = settings.liarCount >= max;
  el.liarHint.textContent = `Máximo ${max} para ${settings.playerCount} jugadores`;

  renderCategoryOptions();
}

function changePlayerCount(delta) {
  settings.playerCount = clamp(settings.playerCount + delta, MIN_PLAYERS, MAX_PLAYERS);
  const max = maxLiarsFor(settings.playerCount);
  settings.liarCount = liarManuallySet ? clamp(settings.liarCount, 1, max) : suggestedLiarCount(settings.playerCount);
  renderSetup();
}

function changeLiarCount(delta) {
  const max = maxLiarsFor(settings.playerCount);
  settings.liarCount = clamp(settings.liarCount + delta, 1, max);
  liarManuallySet = true;
  renderSetup();
}

/* -------------------------------- Reveal -------------------------------- */

function renderRevealForCurrentPlayer() {
  const playerNumber = round.currentIndex + 1;
  el.revealPlayerLabel.textContent = `Jugador ${playerNumber}`;
  el.revealProgress.textContent = `Jugador ${playerNumber} de ${settings.playerCount}`;

  el.rolePanel.hidden = true;
  el.roleContent.innerHTML = '';
  el.roleCategoryLabel.textContent = '';
  round.hasRevealedCurrent = false;
  el.btnNextPlayer.disabled = true;
  el.holdBtn.classList.remove('is-held');
  el.holdPrompt.hidden = false;
}

function populateRoleContent() {
  const facts = round.cards[round.currentIndex];
  el.roleCategoryLabel.textContent = `Tema: ${round.topic.emoji} ${round.topic.nombre}`;
  el.roleContent.innerHTML = '<ol class="fact-list">' +
    facts.map((f) => `<li>${f}</li>`).join('') +
    '</ol>';
}

function startRevealHold(evt) {
  if (evt) evt.preventDefault();
  if (!round) return;
  populateRoleContent();
  el.rolePanel.hidden = false;
  el.holdPrompt.hidden = true;
  el.holdBtn.classList.add('is-held');
  round.hasRevealedCurrent = true;
  el.btnNextPlayer.disabled = false;
}

function endRevealHold() {
  el.rolePanel.hidden = true;
  el.roleContent.innerHTML = '';
  el.roleCategoryLabel.textContent = '';
  el.holdBtn.classList.remove('is-held');
  if (round) el.holdPrompt.hidden = false;
}

function goToNextPlayer() {
  if (isAdvancing) return;
  if (!round || el.btnNextPlayer.disabled) return;
  isAdvancing = true;
  el.btnNextPlayer.disabled = true;

  round.currentIndex += 1;
  if (round.currentIndex >= settings.playerCount) {
    goToVote();
  } else {
    renderRevealForCurrentPlayer();
  }
  isAdvancing = false;
}

/* -------------------------------- Votación -------------------------------- */

function goToVote() {
  round.votes = new Array(settings.playerCount).fill(0);
  renderVoteButtons();
  showScreen('vote');
}

function renderVoteButtons() {
  el.voteButtons.innerHTML = '';
  for (let i = 0; i < settings.playerCount; i++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'vote-btn';
    btn.innerHTML = `<span>Jugador ${i + 1}</span><span class="vote-count">${round.votes[i]}</span>`;
    btn.addEventListener('click', () => {
      round.votes[i] += 1;
      renderVoteButtons();
    });
    el.voteButtons.appendChild(btn);
  }
}

/* -------------------------------- Resultados -------------------------------- */

function endRound() {
  if (!round) return;

  el.resultsTopic.innerHTML = `${round.topic.emoji} ${round.topic.nombre}`;
  el.resultsFacts.innerHTML = round.topic.verdaderos.map((f) => `<li>${f}</li>`).join('');

  const liarNumbers = Array.from(round.liarIndices).map((i) => i + 1).sort((a, b) => a - b);
  el.resultsLiars.innerHTML = '';
  liarNumbers.forEach((num) => {
    const li = document.createElement('li');
    li.textContent = `Jugador ${num}`;
    el.resultsLiars.appendChild(li);
  });

  const sortedByVotes = round.votes
    .map((v, i) => ({ v, i }))
    .filter((x) => x.v > 0)
    .sort((a, b) => b.v - a.v);
  const topN = sortedByVotes.slice(0, round.liarIndices.size).map((x) => x.i + 1);
  const correctCount = topN.filter((num) => liarNumbers.includes(num)).length;

  el.resultsVotes.textContent = sortedByVotes.length === 0
    ? 'Nadie votó.'
    : `Más votados: Jugador ${topN.join(', Jugador ')}. Acertasteis ${correctCount} de ${liarNumbers.length} mentiroso(s).`;

  lastTopicKey = round.topicKey;
  showScreen('results');
}

/* ---------------------------------- Ronda ----------------------------------- */

function startNewRound() {
  const picked = pickTopicForCategory(settings.categoryKey);
  const liarIndices = pickLiarIndices(settings.playerCount, settings.liarCount);
  const cards = [];
  for (let i = 0; i < settings.playerCount; i++) {
    cards.push(buildFactCard(picked.topic, liarIndices.has(i)));
  }
  round = {
    topic: picked.topic,
    topicKey: picked.topicKey,
    categoryLabel: picked.categoryLabel,
    liarIndices,
    cards,
    currentIndex: 0,
    hasRevealedCurrent: false,
    votes: []
  };
  showScreen('reveal');
  renderRevealForCurrentPlayer();
}

function backToSetup() {
  round = null;
  renderSetup();
  showScreen('setup');
}

function bindEvents() {
  el.playerMinus.addEventListener('click', () => changePlayerCount(-1));
  el.playerPlus.addEventListener('click', () => changePlayerCount(1));
  el.liarMinus.addEventListener('click', () => changeLiarCount(-1));
  el.liarPlus.addEventListener('click', () => changeLiarCount(1));

  el.btnStart.addEventListener('click', () => { saveSettings(); startNewRound(); });

  const press = (e) => startRevealHold(e);
  const release = (e) => { if (e) e.preventDefault(); endRevealHold(); };
  el.holdBtn.addEventListener('pointerdown', press);
  el.holdBtn.addEventListener('pointerup', release);
  el.holdBtn.addEventListener('pointerleave', release);
  el.holdBtn.addEventListener('pointercancel', release);
  el.holdBtn.addEventListener('touchstart', press, { passive: false });
  el.holdBtn.addEventListener('touchend', release);
  el.holdBtn.addEventListener('touchcancel', release);
  el.holdBtn.addEventListener('contextmenu', (e) => e.preventDefault());
  el.holdBtn.addEventListener('dragstart', (e) => e.preventDefault());

  el.btnNextPlayer.addEventListener('click', goToNextPlayer);

  el.btnReveal.addEventListener('click', endRound);

  el.btnPlayAgain.addEventListener('click', startNewRound);
  el.btnNewGame.addEventListener('click', backToSetup);
}

function init() {
  cacheDom();
  loadSettings();
  renderSetup();
  bindEvents();
  showScreen('setup');
}

document.addEventListener('DOMContentLoaded', init);
