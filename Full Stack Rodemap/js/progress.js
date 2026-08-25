/**
 * progress.js
 * localStorage Management & Progress Tracking
 *
 * Keys used:
 *   fsp_progress  — completed/partial tasks, % progress
 *   fsp_streak    — streak state
 *   fsp_history   — daily history log
 *   fsp_today     — today's generated plan
 *   fsp_future    — future planned days
 *   fsp_settings  — app settings
 */

const Progress = (() => {

  const KEYS = {
    PROGRESS: 'fsp_progress',
    STREAK:   'fsp_streak',
    HISTORY:  'fsp_history',
    TODAY:    'fsp_today',
    FUTURE:   'fsp_future',
    SETTINGS: 'fsp_settings'
  };

  // ─── Default State ──────────────────────────────────────────────────────────

  function defaultProgress() {
    return {
      completedSubtopics: [],          // string[] — IDs of fully completed subtopics
      partialSubtopics: {},            // { id: { doneMinutes, totalMinutes } }
      overallPercent: 0,
      frontendPercent: 0,
      backendPercent: 0,
      projectsCompleted: 0,
      totalMinutesLearned: 0,
      lastUpdated: null
    };
  }

  function defaultStreak() {
    return {
      current: 0,
      longest: 0,
      lastCompletionDate: null,
      totalDaysLearned: 0
    };
  }

  function defaultToday() {
    return {
      date: getTodayStr(),
      availableMinutes: 0,
      scheduledTasks: [],
      completedToday: [],              // IDs completed in today's session
      startTime: null,
      lastActivityTime: null
    };
  }

  // ─── Local Storage Helpers ──────────────────────────────────────────────────

  function load(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn(`[Progress] Failed to load key "${key}"`, e);
      return null;
    }
  }

  function save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn(`[Progress] Failed to save key "${key}"`, e);
    }
  }

  // ─── Date Utilities ─────────────────────────────────────────────────────────

  function getTodayStr() {
    return new Date().toISOString().split('T')[0]; // "2026-08-25"
  }

  function isYesterday(dateStr) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0] === dateStr;
  }

  // ─── Progress Operations ────────────────────────────────────────────────────

  function getProgress() {
    return load(KEYS.PROGRESS) || defaultProgress();
  }

  function saveProgress(data) {
    data.lastUpdated = new Date().toISOString();
    save(KEYS.PROGRESS, data);
  }

  /**
   * Mark a subtopic as completed
   * Returns updated progress object
   */
  function completeSubtopic(subtopicId, minutesSpent) {
    const progress = getProgress();

    if (!progress.completedSubtopics.includes(subtopicId)) {
      progress.completedSubtopics.push(subtopicId);
    }

    // Remove from partial if it was partial
    delete progress.partialSubtopics[subtopicId];

    progress.totalMinutesLearned += minutesSpent;

    // Recalculate percentages
    const pct = Scheduler.calculateProgress(progress.completedSubtopics, progress.partialSubtopics);
    progress.overallPercent = pct.overall;
    progress.frontendPercent = pct.frontend;
    progress.backendPercent = pct.backend;

    saveProgress(progress);

    // Update today record
    addCompletedToday(subtopicId, minutesSpent);

    // Update streak
    updateStreak();

    return progress;
  }

  /**
   * Mark a subtopic as partially completed (split across days)
   */
  function partialComplete(subtopicId, doneMinutes, totalMinutes) {
    const progress = getProgress();

    progress.partialSubtopics[subtopicId] = { doneMinutes, totalMinutes };

    const pct = Scheduler.calculateProgress(progress.completedSubtopics, progress.partialSubtopics);
    progress.overallPercent = pct.overall;
    progress.frontendPercent = pct.frontend;
    progress.backendPercent = pct.backend;

    saveProgress(progress);
    return progress;
  }

  /**
   * Undo a completion (uncheck)
   */
  function uncompleteSubtopic(subtopicId) {
    const progress = getProgress();
    progress.completedSubtopics = progress.completedSubtopics.filter(id => id !== subtopicId);

    const pct = Scheduler.calculateProgress(progress.completedSubtopics, progress.partialSubtopics);
    progress.overallPercent = pct.overall;
    progress.frontendPercent = pct.frontend;
    progress.backendPercent = pct.backend;

    saveProgress(progress);

    // Update today record
    const today = getToday();
    today.completedToday = today.completedToday.filter(id => id !== subtopicId);
    saveToday(today);

    return progress;
  }

  // ─── Today Plan ─────────────────────────────────────────────────────────────

  function getToday() {
    const stored = load(KEYS.TODAY);
    const todayStr = getTodayStr();

    // If stored today is stale (different date), return fresh default
    if (!stored || stored.date !== todayStr) {
      return defaultToday();
    }
    return stored;
  }

  function saveToday(data) {
    data.date = getTodayStr();
    data.lastActivityTime = new Date().toISOString();
    save(KEYS.TODAY, data);
  }

  function setTodayPlan(availableMinutes, scheduledTasks) {
    const today = getToday();
    today.availableMinutes = availableMinutes;
    today.scheduledTasks = scheduledTasks;
    if (!today.startTime) today.startTime = new Date().toISOString();
    saveToday(today);
  }

  function addCompletedToday(subtopicId, minutesSpent) {
    const today = getToday();
    if (!today.completedToday.includes(subtopicId)) {
      today.completedToday.push(subtopicId);
    }
    saveToday(today);
  }

  function getCompletedToday() {
    return getToday().completedToday;
  }

  // ─── Streak Management ──────────────────────────────────────────────────────

  function getStreak() {
    return load(KEYS.STREAK) || defaultStreak();
  }

  function updateStreak() {
    const streak = getStreak();
    const todayStr = getTodayStr();

    if (streak.lastCompletionDate === todayStr) {
      // Already counted today
      save(KEYS.STREAK, streak);
      return streak;
    }

    if (isYesterday(streak.lastCompletionDate) || streak.lastCompletionDate === null) {
      // Continue or start streak
      streak.current += 1;
      streak.totalDaysLearned += 1;
    } else {
      // Missed day(s) — reset streak
      streak.current = 1;
      streak.totalDaysLearned = (streak.totalDaysLearned || 0) + 1;
    }

    streak.longest = Math.max(streak.longest, streak.current);
    streak.lastCompletionDate = todayStr;
    save(KEYS.STREAK, streak);
    return streak;
  }

  function checkStreakBroken() {
    const streak = getStreak();
    if (!streak.lastCompletionDate) return false;
    const todayStr = getTodayStr();
    // If last completion was not today or yesterday, streak is broken
    return streak.lastCompletionDate !== todayStr && !isYesterday(streak.lastCompletionDate);
  }

  // ─── History ─────────────────────────────────────────────────────────────────

  function getHistory() {
    return load(KEYS.HISTORY) || [];
  }

  function saveHistoryEntry(entry) {
    const history = getHistory();
    const todayStr = getTodayStr();

    // Update existing entry for today or create new one
    const existingIdx = history.findIndex(h => h.date === todayStr);
    if (existingIdx >= 0) {
      history[existingIdx] = { ...history[existingIdx], ...entry, date: todayStr };
    } else {
      history.unshift({ ...entry, date: todayStr });
    }

    // Keep last 365 days
    save(KEYS.HISTORY, history.slice(0, 365));
  }

  function recordDayEnd() {
    const today = getToday();
    const progress = getProgress();
    const streak = getStreak();

    const completedCount = today.completedToday.length;
    const totalTasks = today.scheduledTasks.length;

    saveHistoryEntry({
      date: getTodayStr(),
      availableMinutes: today.availableMinutes,
      completedIds: today.completedToday,
      completedCount,
      totalTasks,
      goalMet: completedCount >= totalTasks,
      progressSnapshot: {
        overall: progress.overallPercent,
        frontend: progress.frontendPercent,
        backend: progress.backendPercent
      },
      streak: streak.current
    });
  }

  // ─── Future Planning ─────────────────────────────────────────────────────────

  function getFuturePlans() {
    return load(KEYS.FUTURE) || [];
  }

  function setFuturePlan(dateStr, plannedMinutes) {
    const plans = getFuturePlans();
    const existing = plans.findIndex(p => p.date === dateStr);
    if (existing >= 0) {
      plans[existing].plannedMinutes = plannedMinutes;
    } else {
      plans.push({ date: dateStr, plannedMinutes });
    }
    // Sort by date and keep next 14 days only
    plans.sort((a,b) => a.date.localeCompare(b.date));
    save(KEYS.FUTURE, plans.slice(0, 14));
  }

  function getFuturePlan(dateStr) {
    const plans = getFuturePlans();
    return plans.find(p => p.date === dateStr) || null;
  }

  // ─── Settings ────────────────────────────────────────────────────────────────

  function getSettings() {
    return load(KEYS.SETTINGS) || {
      dailyReminder: false,
      showWeeklyRhythm: true,
      soundEffects: true,
      theme: 'dark'
    };
  }

  function saveSetting(key, value) {
    const settings = getSettings();
    settings[key] = value;
    save(KEYS.SETTINGS, settings);
  }

  // ─── Reset ───────────────────────────────────────────────────────────────────

  function resetAll() {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k));
  }

  function exportData() {
    const data = {};
    Object.entries(KEYS).forEach(([name, key]) => {
      data[name] = load(key);
    });
    return JSON.stringify(data, null, 2);
  }

  function importData(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      Object.entries(KEYS).forEach(([name, key]) => {
        if (data[name]) save(key, data[name]);
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  // ─── Stats Summary ──────────────────────────────────────────────────────────

  function getStats() {
    const progress = getProgress();
    const streak = getStreak();
    const history = getHistory();
    const allSubtopics = getAllSubtopics();

    const completedSet = new Set(progress.completedSubtopics);
    const currentMonth = Scheduler.getCurrentMonth(progress.completedSubtopics);

    // Projects completed (from roadmap)
    const projectsTotal = ROADMAP.months.length; // one per month
    const projectsCompleted = ROADMAP.months.filter(m => {
      // Month is complete if all subtopics done
      const monthSubs = allSubtopics.filter(st => st.month === m.month);
      return monthSubs.every(st => completedSet.has(st.id));
    }).length;

    const completedCount = progress.completedSubtopics.length;
    const totalCount = allSubtopics.length;
    const remainingCount = totalCount - completedCount;

    return {
      overallPercent: progress.overallPercent,
      frontendPercent: progress.frontendPercent,
      backendPercent: progress.backendPercent,
      currentMonth,
      currentStreak: streak.current,
      longestStreak: streak.longest,
      totalDaysLearned: streak.totalDaysLearned || 0,
      totalMinutesLearned: progress.totalMinutesLearned || 0,
      completedCount,
      totalCount,
      remainingCount,
      projectsCompleted,
      projectsTotal,
      lastActivity: progress.lastUpdated
    };
  }

  // Public API
  return {
    getProgress,
    completeSubtopic,
    partialComplete,
    uncompleteSubtopic,
    getToday,
    saveToday,
    setTodayPlan,
    addCompletedToday,
    getCompletedToday,
    getStreak,
    updateStreak,
    checkStreakBroken,
    getHistory,
    saveHistoryEntry,
    recordDayEnd,
    getFuturePlans,
    setFuturePlan,
    getFuturePlan,
    getSettings,
    saveSetting,
    resetAll,
    exportData,
    importData,
    getStats,
    getTodayStr
  };

})();
