/* ============================================================
   progress.js
   Handles localStorage state for quiz results across the SIM.
   ============================================================ */

const ProgressTracker = (function() {
  const STORAGE_KEY = 'kmkk-sim-periodic-table-v01';

  function getState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { quizzes: {} };
    } catch (e) {
      return { quizzes: {} };
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* private mode, etc. */ }
  }

  function recordQuiz(quizId, isCorrect) {
    const state = getState();
    state.quizzes[quizId] = isCorrect ? 'correct' : 'incorrect';
    saveState(state);
  }

  function resetAll() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }

  return {
    getState,
    saveState,
    recordQuiz,
    resetAll
  };
})();
