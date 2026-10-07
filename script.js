'use strict';

/* =========================================================================
   EL DATO FALSO — lógica del juego
   Modos:
    - Clásico: cada jugador recibe UN dato sobre el tema; los mentirosos
      reciben uno falso sin saberlo.
    - Mentiroso consciente: igual, pero el mentiroso sabe que su dato es
      falso y tiene que defenderlo.
    - Verdadero o falso: quiz rápido para todo el grupo.
   Estado de la ronda solo en memoria; en localStorage solo los ajustes.
   ========================================================================= */

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 10;
const TIMER_OPTIONS = [0, 1, 2, 3, 4, 5]; // minutos (0 = sin cronómetro)
const QUIZ_OPTIONS = [5, 10, 15, 20, 30];
const TIMER_STEP = 30;
const SETTINGS_KEY = 'el-dato-falso-settings-v2';
const LEGACY_SETTINGS_KEY = 'el-dato-falso-settings-v1';
const RECENT_LIMIT = 30;

const MODES = [
  { key: 'clasico', emoji: '🙈', label: 'Clásico', sub: 'El mentiroso no sabe que su dato es falso' },
  { key: 'consciente', emoji: '😏', label: 'Mentiroso consciente', sub: 'Sabe que miente… y tiene que defenderlo' },
  { key: 'rapido', emoji: '⚡', label: 'Verdadero o falso', sub: 'Quiz rápido para todo el grupo' }
];

/* --------------------------------- Estado ---------------------------------- */

let settings = {
  mode: 'clasico',
  playerCount: 4,
  liarCount: 1,
  categories: TOPIC_CATEGORY_KEYS.slice(),
  timerMinutes: 2,
  quizLength: 10,
  secretVote: false
};

let liarManuallySet = false;
let round = null;
let quiz = null;
let isAdvancing = false;
const recent = [];
const scores = Kit.createScores();
let timer = null;

/* --------------------------------- Utilidades ------------------------------- */

function maxLiarsFor(playerCount) {
  return Math.max(1, Math.floor((playerCount - 1) / 2));
}

function suggestedLiarCount(playerCount) {
  return playerCount >= 7 ? Math.min(2, maxLiarsFor(playerCount)) : 1;
}

function modeInfo(key) {
  return MODES.find((m) => m.key === key) || MODES[0];
}

function selectedTopics() {
  const list = [];
  settings.categories.forEach((key) => {
    const cat = TOPIC_CATEGORIES[key];
    if (!cat) return;
    cat.topics.forEach((topic) => list.push({ id: `${key}/${topic.nombre}`, topic, key }));
  });
  return list;
}

function pickTopic(pool) {
  let candidates = pool.filter((item) => !recent.includes(item.id));
  if (!candidates.length) {
    recent.length = 0;
    candidates = pool;
  }
  const item = Kit.pick(candidates);
  recent.push(item.id);
  if (recent.length > RECENT_LIMIT) recent.shift();
  return item;
}

/**
 * Reparte UN dato por jugador: verdaderos distintos a los no mentirosos y
 * falsos distintos a los mentirosos. Nadie repite dato.
 */
function assignFacts(topic, playerCount, liarIndices) {
  const trueFacts = Kit.shuffled(topic.verdaderos).slice(0, playerCount - liarIndices.size);
  const falseFacts = Kit.shuffled(topic.falsos).slice(0, liarIndices.size);
  let ti = 0;
  let fi = 0;
  return Array.from({ length: playerCount }, (_, i) => (liarIndices.has(i) ? falseFacts[fi++] : trueFacts[ti++]));
}

/* ------------------------------ Persistencia -------------------------------- */

function loadSettings() {
  const saved = Kit.load(SETTINGS_KEY, null);
  const legacy = saved ? null : Kit.load(LEGACY_SETTINGS_KEY, null);
  const parsed = saved || legacy || {};

  if (MODES.some((m) => m.key === parsed.mode)) settings.mode = parsed.mode;
  if (typeof parsed.playerCount === 'number') {
    settings.playerCount = Kit.clamp(Math.round(parsed.playerCount), MIN_PLAYERS, MAX_PLAYERS);
  }
  const max = maxLiarsFor(settings.playerCount);
  if (typeof parsed.liarCount === 'number') {
    settings.liarCount = Kit.clamp(Math.round(parsed.liarCount), 1, max);
    liarManuallySet = true;
  } else {
    settings.liarCount = suggestedLiarCount(settings.playerCount);
  }
  if (Array.isArray(parsed.categories)) {
    const valid = parsed.categories.filter((k) => TOPIC_CATEGORY_KEYS.includes(k));
    if (valid.length) settings.categories = valid;
  } else if (legacy && TOPIC_CATEGORY_KEYS.includes(legacy.categoryKey)) {
    settings.categories = [legacy.categoryKey];
  }
  if (TIMER_OPTIONS.includes(parsed.timerMinutes)) settings.timerMinutes = parsed.timerMinutes;
  if (QUIZ_OPTIONS.includes(parsed.quizLength)) settings.quizLength = parsed.quizLength;
  if (typeof parsed.secretVote === 'boolean') settings.secretVote = parsed.secretVote;
}

function saveSettings() {
  Kit.save(SETTINGS_KEY, settings);
}

/* ---------------------------------- DOM -------------------------------------- */

const el = {};

function cacheDom() {
  [
    'mode-options', 'player-count-value', 'btn-player-minus', 'btn-player-plus',
    'liar-row', 'liar-count-value', 'btn-liar-minus', 'btn-liar-plus', 'liar-hint',
    'quiz-length-row', 'quiz-length-value', 'btn-quiz-minus', 'btn-quiz-plus',
    'names-grid', 'btn-shuffle-names', 'category-options', 'category-summary', 'category-warning',
    'btn-cat-all', 'btn-cat-none', 'timer-row', 'time-value', 'timer-hint', 'btn-time-minus', 'btn-time-plus',
    'secret-vote-row', 'opt-secret-vote', 'opt-sound', 'opt-vibrate',
    'setup-scoreline', 'setup-score-text', 'btn-reset-scores', 'btn-start-game',
    'game-bar-title', 'btn-exit',
    'reveal-dots', 'reveal-player', 'hold-reveal-btn', 'role-panel', 'role-category-label', 'role-emoji',
    'role-content', 'role-extra', 'btn-next-player',
    'discussion-title', 'starter-name', 'discussion-help', 'timer-block', 'timer-display', 'timer-ring',
    'btn-timer-minus', 'btn-timer-toggle', 'btn-timer-plus', 'btn-go-vote',
    'vote-area',
    'quiz-progress', 'quiz-card', 'quiz-topic', 'quiz-fact', 'quiz-answer', 'quiz-help', 'quiz-who',
    'quiz-players', 'btn-quiz-reveal', 'btn-quiz-next',
    'verdict', 'verdict-emoji', 'verdict-title', 'verdict-text', 'reveal-box', 'results-topic',
    'results-facts', 'vote-summary', 'scoreboard-card', 'scoreboard', 'btn-play-again', 'btn-new-game'
  ].forEach((id) => {
    el[id.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = document.getElementById(id);
  });
}

/* -------------------------------- Pantalla: Setup ----------------------------- */

function renderSetup() {
  Kit.renderOptions(el.modeOptions, MODES, {
    className: 'mode-card',
    isSelected: (key) => settings.mode === key,
    onSelect: (key) => {
      settings.mode = key;
      saveSettings();
      renderSetup();
    }
  });

  const isQuiz = settings.mode === 'rapido';
  el.playerCountValue.textContent = String(settings.playerCount);
  el.btnPlayerMinus.disabled = settings.playerCount <= MIN_PLAYERS;
  el.btnPlayerPlus.disabled = settings.playerCount >= MAX_PLAYERS;

  const max = maxLiarsFor(settings.playerCount);
  el.liarRow.hidden = isQuiz;
  el.liarCountValue.textContent = String(settings.liarCount);
  el.btnLiarMinus.disabled = settings.liarCount <= 1;
  el.btnLiarPlus.disabled = settings.liarCount >= max;
  el.liarHint.textContent = `Máximo ${max} para ${settings.playerCount} jugadores`;

  el.quizLengthRow.hidden = !isQuiz;
  const qi = QUIZ_OPTIONS.indexOf(settings.quizLength);
  el.quizLengthValue.textContent = String(settings.quizLength);
  el.btnQuizMinus.disabled = qi <= 0;
  el.btnQuizPlus.disabled = qi >= QUIZ_OPTIONS.length - 1;

  Kit.renderNameInputs(el.namesGrid, settings.playerCount);

  Kit.renderOptions(el.categoryOptions, TOPIC_CATEGORY_KEYS.map((key) => ({
    key,
    emoji: TOPIC_CATEGORIES[key].emoji,
    label: TOPIC_CATEGORIES[key].label,
    sub: String(TOPIC_CATEGORIES[key].topics.length)
  })), {
    multi: true,
    isSelected: (key) => settings.categories.includes(key),
    onSelect: (key) => {
      settings.categories = settings.categories.includes(key)
        ? settings.categories.filter((k) => k !== key)
        : settings.categories.concat(key);
      saveSettings();
      renderSetup();
    }
  });
  const pool = selectedTopics();
  const factCount = pool.reduce((sum, item) => sum + item.topic.verdaderos.length + item.topic.falsos.length, 0);
  el.categorySummary.textContent = `${pool.length} temas · ${factCount} datos`;
  el.categoryWarning.hidden = pool.length > 0;
  el.btnStartGame.disabled = pool.length === 0;
  el.btnStartGame.textContent = isQuiz ? '¡Empezar el quiz! ⚡' : '¡Repartir datos! 🎲';

  el.timerRow.hidden = isQuiz;
  el.secretVoteRow.hidden = isQuiz;
  const ti = TIMER_OPTIONS.indexOf(settings.timerMinutes);
  el.timeValue.textContent = settings.timerMinutes ? `${settings.timerMinutes}′` : '—';
  el.timerHint.textContent = settings.timerMinutes ? 'Con cronómetro' : 'Sin cronómetro';
  el.btnTimeMinus.disabled = ti <= 0;
  el.btnTimePlus.disabled = ti >= TIMER_OPTIONS.length - 1;
  el.optSecretVote.checked = settings.secretVote;

  el.setupScoreline.hidden = scores.rounds === 0;
  el.setupScoreText.textContent = `🏆 Marcador: ${scores.rounds} ${scores.rounds === 1 ? 'ronda' : 'rondas'}`;
}

function changePlayerCount(delta) {
  settings.playerCount = Kit.clamp(settings.playerCount + delta, MIN_PLAYERS, MAX_PLAYERS);
  const max = maxLiarsFor(settings.playerCount);
  settings.liarCount = liarManuallySet ? Kit.clamp(settings.liarCount, 1, max) : suggestedLiarCount(settings.playerCount);
  saveSettings();
  renderSetup();
}

function changeLiarCount(delta) {
  const max = maxLiarsFor(settings.playerCount);
  settings.liarCount = Kit.clamp(settings.liarCount + delta, 1, max);
  liarManuallySet = true;
  saveSettings();
  renderSetup();
}

function stepOption(options, key, delta) {
  const idx = Kit.clamp(options.indexOf(settings[key]) + delta, 0, options.length - 1);
  settings[key] = options[idx];
  saveSettings();
  renderSetup();
}

/* -------------------------------- Pantalla: Reparto ----------------------------- */

function renderRevealForCurrentPlayer() {
  const i = round.current;
  el.revealPlayer.textContent = round.names[i];
  el.revealDots.innerHTML = round.names
    .map((_, idx) => `<li class="${idx < i ? 'is-done' : idx === i ? 'is-current' : ''}"></li>`)
    .join('');
  clearRole();
  el.btnNextPlayer.disabled = true;
  el.btnNextPlayer.textContent = i === round.names.length - 1 ? 'Ya lo vi, ¡a leer!' : 'Ya lo vi, pasar al siguiente';
}

function clearRole() {
  el.holdRevealBtn.classList.remove('is-held');
  el.rolePanel.classList.remove('is-alert');
  el.roleCategoryLabel.textContent = '';
  el.roleEmoji.textContent = '';
  el.roleContent.textContent = '';
  el.roleExtra.textContent = '';
}

function populateRole() {
  const i = round.current;
  el.roleCategoryLabel.textContent = `Tema: ${round.topic.nombre}`;
  el.roleEmoji.textContent = round.topic.emoji;
  el.roleContent.textContent = round.facts[i];
  if (round.mode === 'consciente' && round.liars.has(i)) {
    el.rolePanel.classList.add('is-alert');
    el.roleExtra.textContent = '🤥 Este dato es FALSO: defiéndelo como si fuera cierto';
  }
}

function startRevealHold() {
  if (!round) return;
  populateRole();
  el.holdRevealBtn.classList.add('is-held');
  el.btnNextPlayer.disabled = false;
  Kit.buzz(20);
}

function endRevealHold() {
  el.holdRevealBtn.classList.remove('is-held');
  setTimeout(() => {
    if (!el.holdRevealBtn.classList.contains('is-held')) clearRole();
  }, 300);
}

function goToNextPlayer() {
  if (isAdvancing || !round || el.btnNextPlayer.disabled) return;
  isAdvancing = true;
  clearRole();
  round.current += 1;
  if (round.current >= round.names.length) {
    startDiscussionPhase();
  } else {
    renderRevealForCurrentPlayer();
    Kit.sfx.tap();
  }
  isAdvancing = false;
}

/* ---------------------------- Lectura y debate ------------------------------- */

function startDiscussionPhase() {
  el.discussionTitle.textContent = `${round.topic.emoji} ${round.topic.nombre}`;
  el.starterName.textContent = Kit.pick(round.names);
  el.discussionHelp.textContent = round.mode === 'consciente'
    ? 'Leed vuestro dato en voz alta. Los mentirosos saben que el suyo es falso: ¡preguntadles, apretadles!'
    : 'Leed vuestro dato en voz alta. Ojo: quien tiene el dato falso no lo sabe. ¿Cuál suena a mentira?';
  el.timerBlock.hidden = settings.timerMinutes === 0;
  if (settings.timerMinutes > 0) timer.start(settings.timerMinutes * 60);
  Kit.sfx.reveal();
  Kit.showScreen('discussion');
}

/* -------------------------------- Votación -------------------------------- */

function startVote() {
  timer.stop();
  Kit.runVote(el.voteArea, {
    names: round.names,
    secret: settings.secretVote,
    onDone: finishVote
  });
  Kit.showScreen('vote');
}

function setVerdict(type, emoji, title, text) {
  el.verdict.className = 'verdict' + (type ? ` is-${type}` : '');
  el.verdictEmoji.textContent = emoji;
  el.verdictTitle.textContent = title;
  el.verdictText.innerHTML = text;
  el.verdictEmoji.style.animation = 'none';
  void el.verdictEmoji.offsetWidth;
  el.verdictEmoji.style.animation = '';
}

function namesOf(indices) {
  return indices.map((i) => `<strong>${Kit.esc(round.names[i])}</strong>`).join(' y ');
}

function finishVote(result) {
  const liars = Array.from(round.liars).sort((a, b) => a - b);
  const k = liars.length;
  const t = Kit.tally(result, k);
  const caught = t.accused.filter((i) => round.liars.has(i));
  const crewWins = caught.length === k;
  const plural = k > 1;

  scores.startRound();
  if (crewWins) {
    setVerdict('win', '🕵️', plural ? '¡Mentirosos descubiertos!' : '¡Mentiroso descubierto!',
      `${namesOf(liars)} ${plural ? 'tenían' : 'tenía'} el dato falso y no ${plural ? 'colaron' : 'coló'}. 1 punto para cada jugador con dato verdadero.`);
    round.names.forEach((name, i) => { if (!round.liars.has(i)) scores.add(name, 1); });
    Kit.sfx.win();
    Kit.confetti(['#38bdf8', '#818cf8', '#34d399', '#facc15', '#f0f6fb']);
  } else {
    let text;
    if (t.tie) {
      text = `Empate en la votación: no se acusa a nadie. ${namesOf(liars)} gana${plural ? 'n' : ''} 2 puntos.`;
    } else {
      const innocents = t.accused.filter((i) => !round.liars.has(i));
      text = (innocents.length ? `${namesOf(innocents)} decía la verdad. ` : '') +
        `${namesOf(liars)} ${plural ? 'tenían' : 'tenía'} el dato falso y gana${plural ? 'n' : ''} 2 puntos.`;
    }
    setVerdict('lose', '🤥', '¡La mentira ha colado!', text);
    liars.forEach((i) => scores.add(round.names[i], 2));
    Kit.sfx.lose();
  }
  scores.endRound();
  Kit.buzz(crewWins ? [60, 40, 60] : 200);

  el.resultsTopic.textContent = `${round.topic.emoji} ${round.topic.nombre}`;
  el.resultsFacts.innerHTML = round.facts.map((fact, i) => {
    const isLiar = round.liars.has(i);
    return `<li class="${isLiar ? 'is-false' : 'is-true'}"><strong>${isLiar ? '❌' : '✅'} ${Kit.esc(round.names[i])}</strong>${Kit.esc(fact)}</li>`;
  }).join('');
  const ranked = result.votes
    .map((v, i) => ({ v, name: round.names[i] }))
    .filter((x) => x.v > 0)
    .sort((a, b) => b.v - a.v);
  el.voteSummary.textContent = ranked.length ? 'Votos: ' + ranked.map((x) => `${x.name} ${x.v}`).join(' · ') : '';
  el.revealBox.hidden = false;

  scores.render(el.scoreboard, round.names);
  el.scoreboardCard.hidden = false;
  Kit.showScreen('results');
}

/* ---------------------------- Verdadero o falso ------------------------------ */

function startQuiz() {
  const pool = selectedTopics();
  const facts = [];
  pool.forEach(({ topic }) => {
    topic.verdaderos.forEach((text) => facts.push({ text, isTrue: true, topic }));
    topic.falsos.forEach((text) => facts.push({ text, isTrue: false, topic }));
  });
  // Mitad verdaderos, mitad falsos (aprox.), sin repetir tema seguido si se puede.
  const trues = Kit.shuffled(facts.filter((f) => f.isTrue));
  const falses = Kit.shuffled(facts.filter((f) => !f.isTrue));
  const total = Math.min(settings.quizLength, facts.length);
  const nFalse = Math.min(falses.length, Math.round(total * (0.35 + Math.random() * 0.3)));
  const chosen = Kit.shuffled(falses.slice(0, nFalse).concat(trues.slice(0, total - nFalse)));

  round = null;
  quiz = { names: Kit.playerNames(settings.playerCount), facts: chosen, index: 0, correct: new Set() };
  scores.startRound();
  el.gameBarTitle.textContent = `Quiz · ${modeInfo('rapido').label}`;
  Kit.keepAwake(true);
  Kit.showScreen('quiz');
  renderQuizFact();
}

function renderQuizFact() {
  const fact = quiz.facts[quiz.index];
  quiz.correct = new Set();
  el.quizProgress.textContent = `Dato ${quiz.index + 1} de ${quiz.facts.length}`;
  el.quizTopic.textContent = `${fact.topic.emoji} ${fact.topic.nombre}`;
  el.quizFact.textContent = fact.text;
  el.quizAnswer.hidden = true;
  el.quizCard.classList.remove('is-true', 'is-false');
  el.quizHelp.hidden = false;
  el.quizWho.hidden = true;
  el.btnQuizReveal.hidden = false;
  el.btnQuizNext.hidden = true;
}

function revealQuizFact() {
  const fact = quiz.facts[quiz.index];
  el.quizAnswer.hidden = false;
  el.quizAnswer.className = `quiz-answer ${fact.isTrue ? 'is-true' : 'is-false'}`;
  el.quizAnswer.textContent = fact.isTrue ? '✅ Verdadero' : '❌ Falso';
  el.quizCard.classList.add(fact.isTrue ? 'is-true' : 'is-false');
  el.quizHelp.hidden = true;
  el.quizWho.hidden = false;
  renderQuizPlayers();
  el.btnQuizReveal.hidden = true;
  el.btnQuizNext.hidden = false;
  el.btnQuizNext.textContent = quiz.index + 1 >= quiz.facts.length ? 'Ver resultados 🏁' : 'Siguiente dato ▶';
  if (fact.isTrue) Kit.sfx.win(); else Kit.sfx.reveal();
  Kit.buzz(30);
}

function renderQuizPlayers() {
  Kit.renderOptions(el.quizPlayers, quiz.names.map((name, i) => ({ key: i, label: name })), {
    multi: true,
    isSelected: (i) => quiz.correct.has(i),
    onSelect: (i) => {
      if (quiz.correct.has(i)) quiz.correct.delete(i); else quiz.correct.add(i);
      renderQuizPlayers();
    }
  });
}

function nextQuizFact() {
  quiz.correct.forEach((i) => scores.add(quiz.names[i], 1));
  quiz.index += 1;
  if (quiz.index < quiz.facts.length) {
    renderQuizFact();
    Kit.sfx.tap();
    return;
  }
  scores.endRound();
  el.revealBox.hidden = true;
  scores.render(el.scoreboard, quiz.names);
  el.scoreboardCard.hidden = false;
  setVerdict('win', '🏁', '¡Fin del quiz!', `${quiz.facts.length} datos después, así queda el marcador. ¿Otra ronda?`);
  Kit.sfx.win();
  Kit.confetti(['#38bdf8', '#818cf8', '#34d399', '#facc15', '#f0f6fb']);
  Kit.showScreen('results');
}

/* ---------------------------------- Ronda ----------------------------------- */

function startNewRound() {
  const pool = selectedTopics();
  if (!pool.length) {
    backToSetup();
    return;
  }
  if (settings.mode === 'rapido') {
    startQuiz();
    return;
  }
  const n = settings.playerCount;
  const item = pickTopic(pool);
  const liars = Kit.pickIndices(n, Kit.clamp(settings.liarCount, 1, maxLiarsFor(n)));
  quiz = null;
  round = {
    mode: settings.mode,
    names: Kit.playerNames(n),
    topic: item.topic,
    liars,
    facts: assignFacts(item.topic, n, liars),
    current: 0
  };
  el.gameBarTitle.textContent = `Ronda ${scores.rounds + 1} · ${modeInfo(round.mode).label}`;
  Kit.keepAwake(true);
  Kit.showScreen('reveal');
  renderRevealForCurrentPlayer();
}

function backToSetup() {
  if (timer) timer.stop();
  round = null;
  quiz = null;
  Kit.keepAwake(false);
  renderSetup();
  Kit.showScreen('setup');
}

function inGame() {
  return Boolean(round || quiz);
}

function confirmExit() {
  if (!inGame()) return true;
  return window.confirm('¿Salir de la partida? Se perderá la ronda actual (el marcador se mantiene).');
}

/* --------------------------------- Eventos ----------------------------------- */

function bindEvents() {
  el.btnPlayerMinus.addEventListener('click', () => changePlayerCount(-1));
  el.btnPlayerPlus.addEventListener('click', () => changePlayerCount(1));
  el.btnLiarMinus.addEventListener('click', () => changeLiarCount(-1));
  el.btnLiarPlus.addEventListener('click', () => changeLiarCount(1));
  el.btnQuizMinus.addEventListener('click', () => stepOption(QUIZ_OPTIONS, 'quizLength', -1));
  el.btnQuizPlus.addEventListener('click', () => stepOption(QUIZ_OPTIONS, 'quizLength', 1));
  el.btnTimeMinus.addEventListener('click', () => stepOption(TIMER_OPTIONS, 'timerMinutes', -1));
  el.btnTimePlus.addEventListener('click', () => stepOption(TIMER_OPTIONS, 'timerMinutes', 1));
  el.btnShuffleNames.addEventListener('click', () => {
    Kit.shuffleNames(el.namesGrid, settings.playerCount);
    Kit.toast('Orden mezclado 🔀');
  });
  el.btnCatAll.addEventListener('click', () => {
    settings.categories = TOPIC_CATEGORY_KEYS.slice();
    saveSettings();
    renderSetup();
  });
  el.btnCatNone.addEventListener('click', () => {
    settings.categories = [];
    saveSettings();
    renderSetup();
  });

  el.optSecretVote.addEventListener('change', () => {
    settings.secretVote = el.optSecretVote.checked;
    saveSettings();
  });
  Kit.bindPrefToggle(el.optSound, 'sound');
  Kit.bindPrefToggle(el.optVibrate, 'vibrate');

  el.btnResetScores.addEventListener('click', () => {
    scores.reset();
    renderSetup();
    Kit.toast('Marcador a cero');
  });

  el.btnStartGame.addEventListener('click', () => {
    saveSettings();
    try { history.pushState({ inGame: true }, ''); } catch (err) { /* sin historial */ }
    startNewRound();
  });

  Kit.bindHold(el.holdRevealBtn, startRevealHold, endRevealHold);
  el.btnNextPlayer.addEventListener('click', goToNextPlayer);

  timer = Kit.createTimer({
    display: el.timerDisplay,
    ring: el.timerRing,
    toggleBtn: el.btnTimerToggle,
    onEnd: () => Kit.toast('⏰ ¡Se acabó el tiempo! A votar')
  });
  el.btnTimerMinus.addEventListener('click', () => timer.adjust(-TIMER_STEP));
  el.btnTimerPlus.addEventListener('click', () => timer.adjust(TIMER_STEP));
  el.btnTimerToggle.addEventListener('click', () => timer.toggle());
  el.btnGoVote.addEventListener('click', startVote);

  el.btnQuizReveal.addEventListener('click', revealQuizFact);
  el.btnQuizNext.addEventListener('click', nextQuizFact);

  el.btnPlayAgain.addEventListener('click', startNewRound);
  el.btnNewGame.addEventListener('click', backToSetup);
  el.btnExit.addEventListener('click', () => {
    if (confirmExit()) backToSetup();
  });

  window.addEventListener('popstate', () => {
    if (!inGame()) return;
    if (confirmExit()) {
      backToSetup();
    } else {
      try { history.pushState({ inGame: true }, ''); } catch (err) { /* sin historial */ }
    }
  });
}

function init() {
  cacheDom();
  loadSettings();
  bindEvents();
  renderSetup();
  Kit.showScreen('setup');
}

document.addEventListener('DOMContentLoaded', init);
