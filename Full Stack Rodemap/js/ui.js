/**
 * ui.js
 * All DOM Rendering & Event Handling
 * The "View" layer of the application
 */

const UI = (() => {

  // ─── State ───────────────────────────────────────────────────────────────────
  let currentSection = 'today';
  let todaySchedule = null;   // current generated schedule result
  let isGenerating = false;

  // ─── Section Navigation ──────────────────────────────────────────────────────

  function showSection(name) {
    currentSection = name;
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.section === name);
    });
    document.querySelectorAll('.section').forEach(sec => {
      sec.classList.toggle('active', sec.id === `section-${name}`);
    });

    // Render section-specific content
    if (name === 'today') renderTodaySection();
    if (name === 'progress') renderProgressSection();
    if (name === 'history') renderHistorySection();
    if (name === 'roadmap') renderRoadmapSection();
    if (name === 'settings') renderSettingsSection();
  }

  // ─── Header / Top Bar ────────────────────────────────────────────────────────

  function renderHeader() {
    const stats = Progress.getStats();
    const streak = Progress.getStreak();
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    const rhythm = getTodayRhythm();

    document.getElementById('header-date').textContent = dateStr;
    document.getElementById('header-streak').innerHTML = streak.current > 0
      ? `🔥 <span>${streak.current}</span> Day Streak`
      : `🎯 Start your streak today!`;
    document.getElementById('header-overall').textContent = `${stats.overallPercent}% Complete`;
    document.getElementById('header-month').textContent = `Month ${stats.currentMonth} of 12`;
    document.getElementById('header-rhythm').innerHTML = `${rhythm.icon} <span>${rhythm.label}</span>`;
  }

  // ─── TODAY Section ───────────────────────────────────────────────────────────

  function renderTodaySection() {
    renderHeader();
    const today = Progress.getToday();
    const todayStr = Progress.getTodayStr();

    // Check if we have a plan already generated for today
    if (today.availableMinutes > 0 && today.scheduledTasks && today.scheduledTasks.length > 0) {
      // Restore today's plan
      todaySchedule = {
        tasks: today.scheduledTasks,
        availableMinutes: today.availableMinutes,
        budgets: getTimeRatio(today.availableMinutes),
        todayFocus: today.focus || 'Today\'s Learning'
      };
      showTimePicker(false);
      renderTaskList(today.completedToday || []);
    } else {
      showTimePicker(true);
    }

    renderNextTaskBanner();
    renderMiniProgressBar();
  }

  function showTimePicker(visible) {
    document.getElementById('time-picker-section').style.display = visible ? 'block' : 'none';
    document.getElementById('todays-plan-section').style.display = visible ? 'none' : 'block';
  }

  function renderTimePicker() {
    const container = document.getElementById('time-picker-section');
    const futurePlan = Progress.getFuturePlan(Progress.getTodayStr());
    const suggested = futurePlan ? futurePlan.plannedMinutes : 120;

    container.innerHTML = `
      <div class="time-picker-card glass-card">
        <div class="time-picker-header">
          <div class="time-picker-icon">⏰</div>
          <div>
            <h2>How much time do you have today?</h2>
            <p class="time-picker-sub">I'll build a personalized learning schedule just for you.</p>
          </div>
        </div>

        <div class="quick-time-buttons">
          <button class="time-btn" data-minutes="60" id="tbtn-60">1 Hour</button>
          <button class="time-btn" data-minutes="90" id="tbtn-90">1.5 Hours</button>
          <button class="time-btn" data-minutes="120" id="tbtn-120">2 Hours</button>
          <button class="time-btn selected" data-minutes="180" id="tbtn-180">3 Hours</button>
          <button class="time-btn" data-minutes="240" id="tbtn-240">4 Hours</button>
          <button class="time-btn" data-minutes="custom" id="tbtn-custom">Custom ✏️</button>
        </div>

        <div class="custom-time-row" id="custom-time-row" style="display:none">
          <label>Custom time (minutes):</label>
          <input type="range" id="custom-time-slider" min="30" max="480" step="15" value="180"
            oninput="document.getElementById('custom-time-display').textContent = History.formatMinutes(+this.value)">
          <span class="custom-time-display" id="custom-time-display">3h</span>
        </div>

        <div class="time-preview" id="time-preview">
          <div class="preview-row">
            <span class="preview-dot dot-fe"></span>
            <span>Frontend <strong id="preview-fe">75 min</strong></span>
          </div>
          <div class="preview-row">
            <span class="preview-dot dot-be"></span>
            <span>Backend <strong id="preview-be">75 min</strong></span>
          </div>
          <div class="preview-row">
            <span class="preview-dot dot-pr"></span>
            <span>Practice <strong id="preview-pr">30 min</strong></span>
          </div>
        </div>

        <button class="generate-btn" id="generate-btn" onclick="UI.handleGeneratePlan()">
          <span class="generate-btn-icon">⚡</span>
          Generate Today's Plan
        </button>

        <div class="rhythm-tip">
          <span>${getTodayRhythm().icon}</span>
          <span>${getTodayRhythm().tip}</span>
        </div>
      </div>
    `;

    // Attach quick-time button listeners
    document.querySelectorAll('.time-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        if (btn.dataset.minutes === 'custom') {
          document.getElementById('custom-time-row').style.display = 'flex';
        } else {
          document.getElementById('custom-time-row').style.display = 'none';
          updateTimePreview(+btn.dataset.minutes);
        }
      });
    });

    updateTimePreview(suggested);
  }

  function updateTimePreview(minutes) {
    const ratio = getTimeRatio(minutes);
    const feEl = document.getElementById('preview-fe');
    const beEl = document.getElementById('preview-be');
    const prEl = document.getElementById('preview-pr');
    if (feEl) feEl.textContent = History.formatMinutes(ratio.frontend);
    if (beEl) beEl.textContent = History.formatMinutes(ratio.backend);
    if (prEl) prEl.textContent = ratio.practice > 0 ? History.formatMinutes(ratio.practice) : '—';
  }

  function getSelectedMinutes() {
    const selected = document.querySelector('.time-btn.selected');
    if (!selected) return 120;
    if (selected.dataset.minutes === 'custom') {
      return +document.getElementById('custom-time-slider').value;
    }
    return +selected.dataset.minutes;
  }

  function handleGeneratePlan() {
    if (isGenerating) return;
    isGenerating = true;

    const minutes = getSelectedMinutes();
    const progress = Progress.getProgress();
    const completedToday = Progress.getCompletedToday();

    const result = Scheduler.generateSchedule(
      minutes,
      progress.completedSubtopics,
      progress.partialSubtopics
    );

    todaySchedule = result;

    // Save to localStorage
    Progress.setTodayPlan(minutes, result.tasks);

    // Update today storage with focus
    const today = Progress.getToday();
    today.focus = result.todayFocus;
    Progress.saveToday(today);

    // Animate transition
    const pickerEl = document.getElementById('time-picker-section');
    pickerEl.style.opacity = '0';
    pickerEl.style.transform = 'translateY(-20px)';

    setTimeout(() => {
      showTimePicker(false);
      renderTaskList(completedToday);
      renderNextTaskBanner();
      renderMiniProgressBar();
      renderHeader();
      isGenerating = false;
    }, 350);
  }

  // ─── Task List ───────────────────────────────────────────────────────────────

  function renderTaskList(completedToday = []) {
    if (!todaySchedule) return;

    const completedSet = new Set(completedToday);
    const container = document.getElementById('todays-plan-section');
    const { tasks, availableMinutes, budgets, todayFocus } = todaySchedule;

    const feTasks = tasks.filter(t => t.area === 'frontend');
    const beTasks = tasks.filter(t => t.area === 'backend');
    const prTasks = tasks.filter(t => t.area === 'practice' || (t.type === 'project' && !feTasks.includes(t) && !beTasks.includes(t)));

    const feCompleted = feTasks.filter(t => completedSet.has(t.id)).length;
    const beCompleted = beTasks.filter(t => completedSet.has(t.id)).length;
    const todayCompleted = tasks.filter(t => completedSet.has(t.id)).length;
    const totalTasks = tasks.length;

    container.innerHTML = `
      <div class="plan-header glass-card">
        <div class="plan-title-row">
          <div class="plan-title-group">
            <h2 class="plan-title">Today's Learning Plan</h2>
            <p class="plan-focus">${todayFocus}</p>
          </div>
          <div class="plan-meta-group">
            <div class="plan-time-badge">
              <span class="plan-time-icon">⏱️</span>
              <span>${History.formatMinutes(availableMinutes)}</span>
            </div>
            <button class="adjust-time-btn" id="adjust-time-btn" onclick="UI.handleAdjustTime()">
              ✏️ Adjust Time
            </button>
          </div>
        </div>

        <div class="plan-progress-row">
          <div class="plan-progress-label">${todayCompleted} / ${totalTasks} tasks completed</div>
          <div class="plan-progress-bar">
            <div class="plan-progress-fill" style="width: ${totalTasks > 0 ? Math.round(todayCompleted/totalTasks*100) : 0}%"></div>
          </div>
        </div>

        <div class="plan-budgets">
          <div class="budget-pill budget-fe">
            <span class="budget-area">Frontend</span>
            <span class="budget-time">${History.formatMinutes(budgets.frontend)}</span>
            <span class="budget-done">${feCompleted}/${feTasks.length}</span>
          </div>
          <div class="budget-pill budget-be">
            <span class="budget-area">Backend</span>
            <span class="budget-time">${History.formatMinutes(budgets.backend)}</span>
            <span class="budget-done">${beCompleted}/${beTasks.length}</span>
          </div>
          ${budgets.practice > 0 ? `
          <div class="budget-pill budget-pr">
            <span class="budget-area">Practice</span>
            <span class="budget-time">${History.formatMinutes(budgets.practice)}</span>
          </div>` : ''}
        </div>
      </div>

      ${feTasks.length > 0 ? renderTaskGroup('Frontend', '🎨', feTasks, completedSet, 'fe') : ''}
      ${beTasks.length > 0 ? renderTaskGroup('Backend', '⚙️', beTasks, completedSet, 'be') : ''}
      ${prTasks.length > 0 ? renderTaskGroup('Practice / Build', '🏗️', prTasks, completedSet, 'pr') : ''}

      ${tasks.length === 0 ? `
        <div class="empty-state glass-card">
          <div class="empty-icon">🎉</div>
          <p><strong>You've completed the entire roadmap!</strong></p>
          <p class="empty-sub">Congratulations — you're a Full Stack Developer!</p>
        </div>
      ` : ''}
    `;
  }

  function renderTaskGroup(title, icon, tasks, completedSet, areaClass) {
    const completedCount = tasks.filter(t => completedSet.has(t.id)).length;
    const allDone = completedCount === tasks.length;

    return `
      <div class="task-group glass-card ${allDone ? 'group-done' : ''}">
        <div class="task-group-header">
          <div class="task-group-title">
            <span class="task-group-icon">${icon}</span>
            <h3>${title}</h3>
            <span class="task-count-badge ${areaClass}-badge">${completedCount}/${tasks.length}</span>
          </div>
          <div class="task-group-bar">
            <div class="task-group-fill area-${areaClass}" style="width: ${tasks.length > 0 ? Math.round(completedCount/tasks.length*100) : 0}%"></div>
          </div>
        </div>

        <div class="task-list">
          ${tasks.map((task, idx) => renderTaskItem(task, completedSet.has(task.id), idx)).join('')}
        </div>
      </div>
    `;
  }

  function renderTaskItem(task, isCompleted, idx) {
    const isPartial = task.isSplitContinuation;
    const isNext = !isCompleted && idx === 0; // approximate "next" logic

    return `
      <div class="task-item ${isCompleted ? 'task-done' : ''} ${isNext && !isCompleted ? 'task-next' : ''}"
           id="task-${task.id}" data-task-id="${task.id}">
        <div class="task-check-wrap">
          <label class="task-checkbox-label">
            <input type="checkbox" class="task-checkbox" data-id="${task.id}"
              ${isCompleted ? 'checked' : ''}
              onchange="UI.handleTaskToggle('${task.id}', ${task.scheduledMinutes}, this.checked)">
            <span class="task-checkmark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
          </label>
        </div>

        <div class="task-content">
          <div class="task-title-row">
            <span class="task-title ${isCompleted ? 'task-title-done' : ''}">${task.title}</span>
            ${isPartial ? '<span class="task-partial-badge">↩ Continuing</span>' : ''}
            ${task.isSplit && !isCompleted ? '<span class="task-split-badge">📅 Part today</span>' : ''}
            ${isNext && !isCompleted ? '<span class="task-next-badge">▶ Next</span>' : ''}
          </div>

          <div class="task-meta-row">
            <span class="task-topic">${task.topicTitle}</span>
            <span class="task-area-tag tag-${task.area}">${task.area === 'frontend' ? '🎨 Frontend' : '⚙️ Backend'}</span>
            <span class="task-time">
              <span class="task-time-icon">⏱</span>
              ${History.formatMinutes(task.scheduledMinutes)}
            </span>
          </div>

          ${task.practiceTask && !isCompleted ? `
          <div class="task-practice-hint" id="hint-${task.id}">
            <span class="hint-label">🎯 Practice:</span>
            <span>${task.practiceTask}</span>
          </div>` : ''}
        </div>
      </div>
    `;
  }

  // ─── Task Toggle Handler ─────────────────────────────────────────────────────

  function handleTaskToggle(taskId, minutes, checked) {
    const taskEl = document.getElementById(`task-${taskId}`);

    if (checked) {
      // Animate completion
      taskEl.classList.add('task-completing');
      setTimeout(() => {
        taskEl.classList.remove('task-completing');
        taskEl.classList.add('task-done');
      }, 300);

      Progress.completeSubtopic(taskId, minutes);

      // Check streak milestone
      const streak = Progress.getStreak();
      const milestone = History.checkMilestone(streak.current);
      if (milestone) {
        setTimeout(() => History.showMilestoneCelebration(milestone), 500);
      }

      // Record in history
      Progress.recordDayEnd();

    } else {
      taskEl.classList.remove('task-done');
      Progress.uncompleteSubtopic(taskId);
    }

    // Re-render progress areas
    renderNextTaskBanner();
    renderMiniProgressBar();
    renderHeader();
    updatePlanProgressBar();
  }

  function updatePlanProgressBar() {
    const completedToday = Progress.getCompletedToday();
    const completedSet = new Set(completedToday);
    if (!todaySchedule) return;

    const tasks = todaySchedule.tasks;
    const done = tasks.filter(t => completedSet.has(t.id)).length;
    const pct = tasks.length > 0 ? Math.round(done / tasks.length * 100) : 0;

    const fillEl = document.querySelector('.plan-progress-fill');
    const labelEl = document.querySelector('.plan-progress-label');
    if (fillEl) fillEl.style.width = `${pct}%`;
    if (labelEl) labelEl.textContent = `${done} / ${tasks.length} tasks completed`;

    // Update budget pills
    ['fe', 'be'].forEach(area => {
      const areaFull = area === 'fe' ? 'frontend' : 'backend';
      const areaTasks = tasks.filter(t => t.area === areaFull);
      const areaDone = areaTasks.filter(t => completedSet.has(t.id)).length;
      const pill = document.querySelector(`.budget-${area} .budget-done`);
      if (pill) pill.textContent = `${areaDone}/${areaTasks.length}`;
    });
  }

  // ─── Adjust Time ─────────────────────────────────────────────────────────────

  function handleAdjustTime() {
    const currentMinutes = todaySchedule ? todaySchedule.availableMinutes : 120;
    const completedToday = Progress.getCompletedToday();

    // Show adjust dialog
    const dialog = document.createElement('div');
    dialog.className = 'adjust-dialog-overlay';
    dialog.innerHTML = `
      <div class="adjust-dialog glass-card">
        <h3>Adjust Available Time</h3>
        <p>Completed tasks will be preserved. Only remaining tasks will be rescheduled.</p>
        <div class="quick-time-buttons" style="margin: 16px 0">
          ${[60, 90, 120, 180, 240].map(m => `
            <button class="time-btn adj-btn ${m === currentMinutes ? 'selected' : ''}" data-minutes="${m}">
              ${History.formatMinutes(m)}
            </button>
          `).join('')}
        </div>
        <div style="display:flex; gap:12px; justify-content:flex-end; margin-top:16px">
          <button class="btn-secondary" onclick="this.closest('.adjust-dialog-overlay').remove()">Cancel</button>
          <button class="btn-primary" onclick="UI.applyAdjustedTime()">Apply</button>
        </div>
      </div>
    `;
    document.body.appendChild(dialog);

    // Attach listeners for adj buttons
    dialog.querySelectorAll('.adj-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        dialog.querySelectorAll('.adj-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
  }

  function applyAdjustedTime() {
    const dialog = document.querySelector('.adjust-dialog-overlay');
    const selected = dialog.querySelector('.adj-btn.selected');
    const newMinutes = selected ? +selected.dataset.minutes : 120;
    dialog.remove();

    const completedToday = Progress.getCompletedToday();
    const progress = Progress.getProgress();

    const result = Scheduler.regenerateSchedule(
      newMinutes,
      completedToday,
      progress.completedSubtopics,
      progress.partialSubtopics
    );

    todaySchedule = result;
    Progress.setTodayPlan(newMinutes, result.tasks);

    const today = Progress.getToday();
    today.focus = result.todayFocus;
    Progress.saveToday(today);

    renderTaskList(completedToday);
    renderNextTaskBanner();
    renderMiniProgressBar();
    renderHeader();
  }

  // ─── Next Task Banner ────────────────────────────────────────────────────────

  function renderNextTaskBanner() {
    const container = document.getElementById('next-task-banner');
    if (!container) return;

    const completedToday = new Set(Progress.getCompletedToday());
    const allSubtopics = getAllSubtopics();
    const progress = Progress.getProgress();
    const completedAll = new Set(progress.completedSubtopics);

    // Find next incomplete subtopic
    const next = allSubtopics.find(st => !completedAll.has(st.id));

    if (!next) {
      container.innerHTML = `
        <div class="next-task-card done glass-card">
          <span class="next-task-icon">🏆</span>
          <span class="next-task-text"><strong>All tasks complete!</strong> You've finished the roadmap!</span>
        </div>
      `;
      return;
    }

    // Is the next task in today's schedule?
    const inToday = todaySchedule && todaySchedule.tasks.find(t => t.id === next.id && !completedToday.has(t.id));
    const monthInfo = ROADMAP.months.find(m => m.month === next.month);

    container.innerHTML = `
      <div class="next-task-card glass-card">
        <div class="next-task-left">
          <span class="next-task-label">▶ NEXT UP</span>
          <span class="next-task-title">${next.title}</span>
          <span class="next-task-meta">
            <span class="tag-${next.area}">${next.area === 'frontend' ? '🎨' : '⚙️'} ${next.area}</span>
            &nbsp;·&nbsp;
            <span>${next.topicTitle}</span>
            &nbsp;·&nbsp;
            <span>Month ${next.month}: ${monthInfo ? monthInfo.title : ''}</span>
          </span>
        </div>
        <div class="next-task-right">
          <span class="next-task-time">${History.formatMinutes(next.minutes)}</span>
          ${inToday ? '<span class="next-task-badge">In today\'s plan</span>' : ''}
        </div>
      </div>
    `;
  }

  // ─── Mini Progress Bar (Today Section) ──────────────────────────────────────

  function renderMiniProgressBar() {
    const stats = Progress.getStats();
    const container = document.getElementById('mini-progress-bar');
    if (!container) return;

    container.innerHTML = `
      <div class="mini-progress-row">
        <span class="mini-progress-label">Overall</span>
        <div class="mini-bar">
          <div class="mini-fill fill-overall" style="width:${stats.overallPercent}%"></div>
        </div>
        <span class="mini-pct">${stats.overallPercent}%</span>
      </div>
      <div class="mini-progress-row">
        <span class="mini-progress-label">Frontend</span>
        <div class="mini-bar">
          <div class="mini-fill fill-fe" style="width:${stats.frontendPercent}%"></div>
        </div>
        <span class="mini-pct">${stats.frontendPercent}%</span>
      </div>
      <div class="mini-progress-row">
        <span class="mini-progress-label">Backend</span>
        <div class="mini-bar">
          <div class="mini-fill fill-be" style="width:${stats.backendPercent}%"></div>
        </div>
        <span class="mini-pct">${stats.backendPercent}%</span>
      </div>
    `;
  }

  // ─── PROGRESS Section ────────────────────────────────────────────────────────

  function renderProgressSection() {
    const stats = Progress.getStats();
    const streak = Progress.getStreak();
    const container = document.getElementById('section-progress');

    const hoursLearned = Math.round(stats.totalMinutesLearned / 60);
    const daysToGo = Math.max(0, 365 - (streak.totalDaysLearned || 0));

    container.innerHTML = `
      <div class="progress-page">
        <!-- Big stats row -->
        <div class="big-stats-row">
          <div class="big-stat glass-card">
            <div class="big-stat-value" data-target="${stats.overallPercent}">0%</div>
            <div class="big-stat-label">Overall Progress</div>
            <div class="radial-container">
              ${buildRadial(stats.overallPercent, '#4F8EF7')}
            </div>
          </div>
          <div class="big-stat glass-card">
            <div class="big-stat-value" data-target="${stats.frontendPercent}">0%</div>
            <div class="big-stat-label">Frontend</div>
            <div class="radial-container">
              ${buildRadial(stats.frontendPercent, '#7C3AED')}
            </div>
          </div>
          <div class="big-stat glass-card">
            <div class="big-stat-value" data-target="${stats.backendPercent}">0%</div>
            <div class="big-stat-label">Backend</div>
            <div class="radial-container">
              ${buildRadial(stats.backendPercent, '#10B981')}
            </div>
          </div>
        </div>

        <!-- Detailed stats cards -->
        <div class="detail-stats-row">
          <div class="detail-stat glass-card">
            <span class="detail-icon">🔥</span>
            <span class="detail-val">${streak.current}</span>
            <span class="detail-lbl">Current Streak</span>
          </div>
          <div class="detail-stat glass-card">
            <span class="detail-icon">🏆</span>
            <span class="detail-val">${streak.longest}</span>
            <span class="detail-lbl">Longest Streak</span>
          </div>
          <div class="detail-stat glass-card">
            <span class="detail-icon">📅</span>
            <span class="detail-val">${streak.totalDaysLearned || 0}</span>
            <span class="detail-lbl">Days Learned</span>
          </div>
          <div class="detail-stat glass-card">
            <span class="detail-icon">⏱️</span>
            <span class="detail-val">${hoursLearned}h</span>
            <span class="detail-lbl">Hours Learned</span>
          </div>
          <div class="detail-stat glass-card">
            <span class="detail-icon">✅</span>
            <span class="detail-val">${stats.completedCount}</span>
            <span class="detail-lbl">Topics Done</span>
          </div>
          <div class="detail-stat glass-card">
            <span class="detail-icon">📋</span>
            <span class="detail-val">${stats.remainingCount}</span>
            <span class="detail-lbl">Topics Left</span>
          </div>
          <div class="detail-stat glass-card">
            <span class="detail-icon">🗂️</span>
            <span class="detail-val">${stats.projectsCompleted}/${stats.projectsTotal}</span>
            <span class="detail-lbl">Projects Done</span>
          </div>
          <div class="detail-stat glass-card">
            <span class="detail-icon">📆</span>
            <span class="detail-val">M${stats.currentMonth}</span>
            <span class="detail-lbl">Current Month</span>
          </div>
        </div>

        <!-- Month-by-month progress -->
        <div class="month-progress-section glass-card">
          <h3>Month-by-Month Progress</h3>
          <div class="month-progress-list">
            ${ROADMAP.months.map(m => buildMonthProgressRow(m, Progress.getProgress())).join('')}
          </div>
        </div>

        <!-- 7-day Activity strip -->
        <div class="activity-section glass-card">
          <h3>Last 7 Days</h3>
          <div class="activity-strip" id="activity-strip"></div>
        </div>
      </div>
    `;

    // Render activity strip
    History.renderActivityStrip(document.getElementById('activity-strip'));

    // Animate stat counters
    animateCounters();
  }

  function buildRadial(percent, color) {
    const r = 42;
    const circ = 2 * Math.PI * r;
    const dash = (percent / 100) * circ;
    const gap = circ - dash;

    return `
      <svg viewBox="0 0 100 100" class="radial-svg">
        <circle class="radial-bg" cx="50" cy="50" r="${r}" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="10"/>
        <circle class="radial-fill" cx="50" cy="50" r="${r}" fill="none"
          stroke="${color}" stroke-width="10" stroke-linecap="round"
          stroke-dasharray="${dash.toFixed(1)} ${gap.toFixed(1)}"
          transform="rotate(-90 50 50)"/>
        <text x="50" y="56" text-anchor="middle" class="radial-text" fill="${color}">${percent}%</text>
      </svg>
    `;
  }

  function buildMonthProgressRow(month, progress) {
    const allSubtopics = getAllSubtopics();
    const monthSubs = allSubtopics.filter(st => st.month === month.month);
    const completedSet = new Set(progress.completedSubtopics);
    const done = monthSubs.filter(st => completedSet.has(st.id)).length;
    const pct = monthSubs.length > 0 ? Math.round(done / monthSubs.length * 100) : 0;
    const isCurrent = Scheduler.getCurrentMonth(progress.completedSubtopics) === month.month;

    return `
      <div class="month-row ${isCurrent ? 'month-current' : pct === 100 ? 'month-done' : 'month-future'}">
        <div class="month-row-header">
          <span class="month-num">Month ${month.month}</span>
          <span class="month-title">${month.title}</span>
          <span class="month-pct">${pct}%</span>
        </div>
        <div class="month-bar">
          <div class="month-fill ${pct === 100 ? 'fill-complete' : isCurrent ? 'fill-current' : 'fill-future'}"
               style="width:${pct}%"></div>
        </div>
        ${isCurrent ? '<span class="month-current-badge">📍 You are here</span>' : ''}
      </div>
    `;
  }

  function animateCounters() {
    document.querySelectorAll('.big-stat-value[data-target]').forEach(el => {
      const target = parseInt(el.dataset.target);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const interval = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = `${current}%`;
        if (current >= target) clearInterval(interval);
      }, 20);
    });
  }

  // ─── HISTORY Section ─────────────────────────────────────────────────────────

  function renderHistorySection() {
    const container = document.getElementById('section-history');
    const historyList = document.createElement('div');
    historyList.className = 'history-page';

    // Header
    historyList.innerHTML = `
      <div class="section-title-row">
        <h2>Learning History</h2>
        <p>Your daily learning log — every day you showed up.</p>
      </div>
      <div class="history-list" id="history-list"></div>
    `;

    container.innerHTML = '';
    container.appendChild(historyList);
    History.renderHistory(document.getElementById('history-list'));
  }

  // ─── ROADMAP Section ─────────────────────────────────────────────────────────

  function renderRoadmapSection() {
    const container = document.getElementById('section-roadmap');
    const progress = Progress.getProgress();
    const completedSet = new Set(progress.completedSubtopics);
    const currentMonth = Scheduler.getCurrentMonth(progress.completedSubtopics);

    container.innerHTML = `
      <div class="roadmap-page">
        <div class="section-title-row">
          <h2>12-Month Roadmap</h2>
          <p>Your complete learning journey — from zero to Full Stack Developer.</p>
        </div>

        <div class="stack-path glass-card">
          <div class="stack-path-label">Your Tech Stack</div>
          <div class="stack-chips">
            ${['HTML','CSS','JavaScript','DOM','Git','React','TypeScript','Next.js'].map(t => `<span class="stack-chip chip-fe">${t}</span>`).join('<span class="stack-arrow">→</span>')}
          </div>
          <div class="stack-chips" style="margin-top:8px">
            ${['Node.js','Express','REST APIs','SQL','PostgreSQL','Auth','Security','Docker','Deploy'].map(t => `<span class="stack-chip chip-be">${t}</span>`).join('<span class="stack-arrow">→</span>')}
          </div>
        </div>

        <div class="roadmap-months">
          ${ROADMAP.months.map(m => buildMonthCard(m, completedSet, currentMonth)).join('')}
        </div>
      </div>
    `;
  }

  function buildMonthCard(month, completedSet, currentMonth) {
    const allSubtopics = getAllSubtopics();
    const monthSubs = allSubtopics.filter(st => st.month === month.month);
    const done = monthSubs.filter(st => completedSet.has(st.id)).length;
    const pct = monthSubs.length > 0 ? Math.round(done / monthSubs.length * 100) : 0;
    const isCurrent = month.month === currentMonth;
    const isPast = month.month < currentMonth;
    const state = pct === 100 ? 'done' : isCurrent ? 'current' : 'future';

    const feTopics = month.frontend.map(t => t.topic);
    const beTopics = month.backend.map(t => t.topic);

    return `
      <div class="month-card glass-card month-${state} ${isCurrent ? 'month-card-current' : ''}">
        <div class="month-card-header">
          <div class="month-card-num">
            <span>${state === 'done' ? '✅' : isCurrent ? '📍' : '🔒'}</span>
            <span>Month ${month.month}</span>
          </div>
          <div class="month-card-title">${month.title}</div>
          <div class="month-card-pct ${state === 'done' ? 'pct-done' : isCurrent ? 'pct-current' : 'pct-future'}">${pct}%</div>
        </div>

        <div class="month-card-goal">${month.goal}</div>

        <div class="month-card-bar">
          <div class="month-card-fill fill-${state}" style="width:${pct}%"></div>
        </div>

        <div class="month-card-topics">
          <div class="month-topics-col">
            <span class="topics-area-label">🎨 Frontend</span>
            ${feTopics.map(t => `<span class="topic-item">${t}</span>`).join('')}
          </div>
          <div class="month-topics-col">
            <span class="topics-area-label">⚙️ Backend</span>
            ${beTopics.map(t => `<span class="topic-item">${t}</span>`).join('')}
          </div>
        </div>

        <div class="month-project-tag">
          🏗️ Project: <strong>${month.project.name}</strong>
          <span class="project-stack">${month.project.stack}</span>
        </div>

        ${done > 0 ? `<div class="month-subtopics-done">${done}/${monthSubs.length} subtopics completed</div>` : ''}
      </div>
    `;
  }

  // ─── SETTINGS Section ────────────────────────────────────────────────────────

  function renderSettingsSection() {
    const stats = Progress.getStats();
    const container = document.getElementById('section-settings');

    container.innerHTML = `
      <div class="settings-page">
        <div class="section-title-row">
          <h2>Settings</h2>
          <p>Manage your data and preferences.</p>
        </div>

        <div class="settings-card glass-card">
          <h3>📊 Progress Overview</h3>
          <div class="settings-info-row"><span>Total Subtopics Completed</span><strong>${stats.completedCount} / ${stats.totalCount}</strong></div>
          <div class="settings-info-row"><span>Overall Progress</span><strong>${stats.overallPercent}%</strong></div>
          <div class="settings-info-row"><span>Days Learned</span><strong>${stats.totalDaysLearned}</strong></div>
          <div class="settings-info-row"><span>Current Month</span><strong>Month ${stats.currentMonth}</strong></div>
        </div>

        <div class="settings-card glass-card">
          <h3>📅 Tomorrow's Plan</h3>
          <p>Set how much time you'll have tomorrow so your schedule is ready.</p>
          <div class="quick-time-buttons" style="margin:16px 0">
            ${[60, 90, 120, 180, 240].map(m => `
              <button class="time-btn tomorrow-btn" data-minutes="${m}">${History.formatMinutes(m)}</button>
            `).join('')}
          </div>
          <button class="btn-primary" onclick="UI.saveTomorrowPlan()">Save Tomorrow's Plan</button>
          <div id="tomorrow-saved-msg" style="display:none; color:#10B981; margin-top:8px">✅ Saved!</div>
        </div>

        <div class="settings-card glass-card">
          <h3>💾 Data Management</h3>
          <div class="settings-actions">
            <button class="btn-secondary" onclick="UI.handleExport()">📤 Export Progress</button>
            <button class="btn-secondary" onclick="document.getElementById('import-file').click()">📥 Import Progress</button>
            <input type="file" id="import-file" accept=".json" style="display:none" onchange="UI.handleImport(this)">
          </div>
        </div>

        <div class="settings-card glass-card danger-card">
          <h3>⚠️ Reset Progress</h3>
          <p>This will permanently delete all your learning progress, history, and streak data.</p>
          <button class="btn-danger" onclick="UI.handleReset()">🗑️ Reset All Progress</button>
        </div>
      </div>
    `;

    // Tomorrow plan buttons
    container.querySelectorAll('.tomorrow-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.tomorrow-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
  }

  function saveTomorrowPlan() {
    const selected = document.querySelector('.tomorrow-btn.selected');
    if (!selected) return;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    Progress.setFuturePlan(tomorrowStr, +selected.dataset.minutes);

    const msg = document.getElementById('tomorrow-saved-msg');
    if (msg) {
      msg.style.display = 'block';
      setTimeout(() => msg.style.display = 'none', 2000);
    }
  }

  function handleExport() {
    const data = Progress.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fullstack-progress-${Progress.getTodayStr()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const success = Progress.importData(e.target.result);
      alert(success ? '✅ Progress imported successfully! Refreshing...' : '❌ Invalid file. Import failed.');
      if (success) location.reload();
    };
    reader.readAsText(file);
  }

  function handleReset() {
    if (confirm('Are you sure you want to reset ALL progress? This cannot be undone.')) {
      Progress.resetAll();
      todaySchedule = null;
      location.reload();
    }
  }

  // ─── Init ─────────────────────────────────────────────────────────────────────

  function init() {
    // Render nav listeners
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => showSection(btn.dataset.section));
    });

    // Mobile nav
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        showSection(btn.dataset.section);
        document.querySelectorAll('.mobile-nav-btn').forEach(b => b.classList.toggle('active', b === btn));
      });
    });

    // Render initial section
    renderTimePicker();
    showSection('today');

    // Check streak broken state
    if (Progress.checkStreakBroken()) {
      const streak = Progress.getStreak();
      if (streak.current > 0) {
        // Streak was reset — show notification
        showStreakBrokenNotice();
      }
    }
  }

  function showStreakBrokenNotice() {
    const el = document.createElement('div');
    el.className = 'milestone-celebration streak-broken';
    el.innerHTML = `
      <div class="milestone-inner">
        <div class="milestone-fire">💔</div>
        <div class="milestone-text">
          <strong>Streak Reset</strong>
          <span>You missed a day. Start a new streak today!</span>
        </div>
        <button class="milestone-close" onclick="this.closest('.milestone-celebration').remove()">×</button>
      </div>
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }

  // Public API
  return {
    init,
    showSection,
    renderHeader,
    renderTimePicker,
    handleGeneratePlan,
    handleTaskToggle,
    handleAdjustTime,
    applyAdjustedTime,
    renderNextTaskBanner,
    renderMiniProgressBar,
    renderProgressSection,
    renderHistorySection,
    renderRoadmapSection,
    renderSettingsSection,
    saveTomorrowPlan,
    handleExport,
    handleImport,
    handleReset
  };

})();
