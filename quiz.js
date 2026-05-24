/* ============================================================
   quiz.js
   Handles quiz interaction across all unit pages.
   ============================================================ */

function answerQuiz(buttonEl, isCorrect, feedbackText) {
  const quizEl = buttonEl.closest('.quiz');
  const quizId = quizEl.dataset.quizId;

  // Lock all options in this quiz
  quizEl.querySelectorAll('.quiz-option').forEach(opt => {
    opt.classList.add('locked');
    opt.onclick = null;
  });

  // Mark this answer
  buttonEl.classList.add(isCorrect ? 'correct' : 'incorrect');

  // Show feedback
  const feedback = quizEl.querySelector('.quiz-feedback');
  feedback.querySelector('p').textContent = feedbackText;
  feedback.classList.add('visible');

  // Save state
  ProgressTracker.recordQuiz(quizId, isCorrect);

  // Update progress bar on this page if present
  updateUnitProgress();

  // Refresh sidebar status
  const activePage = document.body.dataset.page;
  if (typeof renderSidebar === 'function') {
    renderSidebar(activePage);
  }
}

function updateUnitProgress() {
  const progressFill = document.getElementById('unit-progress-fill');
  const progressText = document.getElementById('unit-progress-text');

  if (!progressFill || !progressText) return;

  // Read the list of quiz IDs for this unit from data attribute
  const unitContainer = document.querySelector('[data-unit-quizzes]');
  if (!unitContainer) return;

  const quizIds = unitContainer.dataset.unitQuizzes.split(',').map(s => s.trim());
  const state = ProgressTracker.getState();

  const completed = quizIds.filter(q => state.quizzes[q] === 'correct').length;
  const total = quizIds.length;
  const pct = total > 0 ? (completed / total * 100) : 0;

  progressFill.style.width = pct + '%';
  progressText.textContent = `${completed} of ${total} checkpoints complete`;
}

document.addEventListener('DOMContentLoaded', () => {
  updateUnitProgress();
});
