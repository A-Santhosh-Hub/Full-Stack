/**
 * history.js
 * Learning History & Streak UI Helpers
 * Handles history rendering and streak milestone detection
 */

const History = (() => {

  const MILESTONES = [3, 7, 14, 21, 30, 60, 90, 180, 365];

  /**
   * Check if current streak hit a milestone — return milestone number or null
   */
  function checkMilestone(currentStreak) {
    return MILESTONES.includes(currentStreak) ? currentStreak : null;
  }

  /**
   * Format minutes as "2h 30m" or "45m"
   */
  function formatMinutes(min) {
    if (!min || min === 0) return '0m';
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h === 0) return `${m}m`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
  }

  /**
   * Format a date string "2026-08-25" → "August 25, 2026"
   */
  function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  /**
   * Format a date string → short "Aug 25"
   */
  function formatDateShort(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  /**
   * Get day name from date string → "Monday"
   */
  function getDayName(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'long' });
  }

  /**
   * Get last 7 days as array of { date, dayName, hasActivity, entry }
   */
  function getLast7Days() {
    const history = Progress.getHistory();
    const historyMap = {};
    history.forEach(h => historyMap[h.date] = h);

    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      days.push({
        date: dateStr,
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate(),
        isToday: i === 0,
        entry: historyMap[dateStr] || null,
        hasActivity: !!historyMap[dateStr]
      });
    }
    return days;
  }

  /**
   * Build history card HTML for a single history entry
   */
  function buildHistoryCard(entry) {
    const completedTopics = getTopicsFromIds(entry.completedIds || []);
    const uniqueTopics = [...new Set(completedTopics)].slice(0, 4);
    const goalMet = entry.goalMet;
    const progress = entry.progressSnapshot || {};

    return `
      <div class="history-card ${goalMet ? 'goal-met' : 'goal-missed'}">
        <div class="history-card-header">
          <div class="history-date-group">
            <span class="history-date">${formatDate(entry.date)}</span>
            <span class="history-day">${getDayName(entry.date)}</span>
          </div>
          <div class="history-badge ${goalMet ? 'badge-success' : 'badge-warn'}">
            ${goalMet ? '✅ Goal Met' : '⚠️ Partial'}
          </div>
        </div>
        <div class="history-stats">
          <div class="h-stat">
            <span class="h-stat-icon">⏱️</span>
            <span class="h-stat-val">${formatMinutes(entry.availableMinutes)}</span>
            <span class="h-stat-label">Available</span>
          </div>
          <div class="h-stat">
            <span class="h-stat-icon">✅</span>
            <span class="h-stat-val">${entry.completedCount || 0}/${entry.totalTasks || 0}</span>
            <span class="h-stat-label">Tasks</span>
          </div>
          <div class="h-stat">
            <span class="h-stat-icon">🔥</span>
            <span class="h-stat-val">${entry.streak || 0}</span>
            <span class="h-stat-label">Streak</span>
          </div>
          <div class="h-stat">
            <span class="h-stat-icon">📈</span>
            <span class="h-stat-val">${progress.overall || 0}%</span>
            <span class="h-stat-label">Overall</span>
          </div>
        </div>
        ${uniqueTopics.length > 0 ? `
        <div class="history-topics">
          <span class="history-topics-label">Topics covered:</span>
          ${uniqueTopics.map(t => `<span class="topic-chip">${t}</span>`).join('')}
          ${completedTopics.length > 4 ? `<span class="topic-chip topic-chip-more">+${completedTopics.length - 4} more</span>` : ''}
        </div>` : ''}
      </div>
    `;
  }

  /**
   * Get topic titles from an array of subtopic IDs
   */
  function getTopicsFromIds(ids) {
    const allSubtopics = getAllSubtopics();
    const topicSet = new Set();
    ids.forEach(id => {
      const st = allSubtopics.find(s => s.id === id);
      if (st) topicSet.add(st.topicTitle);
    });
    return [...topicSet];
  }

  /**
   * Render the full history section into a container
   */
  function renderHistory(container) {
    const history = Progress.getHistory();

    if (history.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📅</div>
          <p>No learning history yet.</p>
          <p class="empty-sub">Complete your first task today to start tracking your journey!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = history.map(entry => buildHistoryCard(entry)).join('');
  }

  /**
   * Render the 7-day activity strip
   */
  function renderActivityStrip(container) {
    const days = getLast7Days();
    container.innerHTML = days.map(day => `
      <div class="activity-day ${day.hasActivity ? 'active' : ''} ${day.isToday ? 'today' : ''}" title="${formatDate(day.date)}">
        <span class="activity-day-name">${day.dayName}</span>
        <div class="activity-dot ${day.hasActivity ? 'dot-active' : ''} ${day.isToday ? 'dot-today' : ''}">
          ${day.hasActivity ? '✓' : day.isToday ? '•' : ''}
        </div>
        <span class="activity-day-num">${day.dayNum}</span>
      </div>
    `).join('');
  }

  /**
   * Show streak milestone celebration
   */
  function showMilestoneCelebration(streakCount) {
    const existing = document.querySelector('.milestone-celebration');
    if (existing) existing.remove();

    const el = document.createElement('div');
    el.className = 'milestone-celebration';
    el.innerHTML = `
      <div class="milestone-inner">
        <div class="milestone-fire">🔥</div>
        <div class="milestone-text">
          <strong>${streakCount}-Day Streak!</strong>
          <span>Keep it up — you're on fire!</span>
        </div>
        <button class="milestone-close" onclick="this.closest('.milestone-celebration').remove()">×</button>
      </div>
    `;
    document.body.appendChild(el);

    // Auto-remove after 5s
    setTimeout(() => el.remove(), 5000);
  }

  return {
    checkMilestone,
    formatMinutes,
    formatDate,
    formatDateShort,
    getDayName,
    getLast7Days,
    buildHistoryCard,
    renderHistory,
    renderActivityStrip,
    showMilestoneCelebration
  };

})();
