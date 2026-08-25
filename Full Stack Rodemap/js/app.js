/**
 * app.js
 * Application Bootstrap & Orchestration
 * Entry point — wires everything together
 */

(function init() {
  'use strict';

  // ─── Wait for DOM ready ───────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }

  function bootstrap() {
    console.log('[FSP] Full Stack Developer Learning Planner — Loading...');

    try {
      // 1. Initialize UI (attaches nav listeners, renders first section)
      UI.init();

      // 2. If streak was broken, update the streak state
      //    (don't reset manually — checkStreakBroken is called in UI.init)

      // 3. Log app state for debugging
      const stats = Progress.getStats();
      console.log(`[FSP] Overall: ${stats.overallPercent}% | Month: ${stats.currentMonth} | Streak: ${stats.currentStreak}`);

    } catch (err) {
      console.error('[FSP] Bootstrap error:', err);
    }
  }

})();
