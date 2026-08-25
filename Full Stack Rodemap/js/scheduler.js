/**
 * scheduler.js
 * Intelligent Daily Schedule Generator
 *
 * Core responsibility:
 *   Given (availableMinutes, completedSubtopicIds, partialSubtopics)
 *   → Return today's task list
 *
 * Algorithm:
 *   1. Calculate FE/BE/Practice budgets from README time ratios
 *   2. Walk all subtopics in roadmap order
 *   3. Skip completed ones
 *   4. Handle partial topics (resume from where left off)
 *   5. Fill budgets, splitting tasks if needed
 *   6. Return scheduled tasks + metadata
 */

const Scheduler = (() => {

  /**
   * Generate today's schedule
   * @param {number} availableMinutes - e.g. 120, 180, 240
   * @param {string[]} completedIds - array of completed subtopic IDs
   * @param {Object} partialMap - { subtopicId: { doneMinutes, totalMinutes } }
   * @returns {{ tasks: Task[], summary: Object }}
   */
  function generateSchedule(availableMinutes, completedIds = [], partialMap = {}) {
    const completedSet = new Set(completedIds);
    const budgets = getTimeRatio(availableMinutes);
    const allSubtopics = getAllSubtopics();

    // Separate into frontend, backend, practice queues
    const feQueue = allSubtopics.filter(st => st.area === 'frontend' && !completedSet.has(st.id));
    const beQueue = allSubtopics.filter(st => st.area === 'backend' && !completedSet.has(st.id));

    const scheduledFE = fillBucket(feQueue, budgets.frontend, partialMap, 'frontend');
    const scheduledBE = fillBucket(beQueue, budgets.backend, partialMap, 'backend');

    // Practice/project tasks come from whichever area needs it or from project topics
    let scheduledPractice = [];
    if (budgets.practice > 0) {
      const practiceQueue = allSubtopics.filter(st =>
        (st.type === 'project' || st.practiceTask) &&
        !completedSet.has(st.id) &&
        !scheduledFE.find(t => t.id === st.id) &&
        !scheduledBE.find(t => t.id === st.id)
      );
      scheduledPractice = fillBucket(practiceQueue, budgets.practice, partialMap, 'practice');
    }

    const allTasks = [...scheduledFE, ...scheduledBE, ...scheduledPractice];

    // Next task (first non-completed from full list)
    const nextTask = allSubtopics.find(st => !completedSet.has(st.id));

    return {
      tasks: allTasks,
      budgets,
      availableMinutes,
      totalScheduledMinutes: allTasks.reduce((sum, t) => sum + t.scheduledMinutes, 0),
      frontendCount: scheduledFE.length,
      backendCount: scheduledBE.length,
      practiceCount: scheduledPractice.length,
      nextTask: nextTask || null,
      todayFocus: deriveFocus(allTasks)
    };
  }

  /**
   * Fill a time bucket with subtopics from the queue
   */
  function fillBucket(queue, budgetMinutes, partialMap, area) {
    const tasks = [];
    let remaining = budgetMinutes;

    for (const st of queue) {
      if (remaining <= 0) break;

      // Check if partially done
      const partial = partialMap[st.id];
      const alreadyDone = partial ? partial.doneMinutes : 0;
      const needed = st.minutes - alreadyDone;

      if (needed <= 0) continue; // effectively complete

      if (needed <= remaining) {
        // Schedule this subtopic fully
        tasks.push(makeTask(st, needed, alreadyDone, false));
        remaining -= needed;
      } else {
        // Schedule partial (split across days)
        tasks.push(makeTask(st, remaining, alreadyDone, true));
        remaining = 0;
      }
    }

    return tasks;
  }

  /**
   * Create a task object from a subtopic
   */
  function makeTask(subtopic, scheduledMinutes, alreadyDoneMinutes, isSplit) {
    return {
      id: subtopic.id,
      title: subtopic.title,
      topicId: subtopic.topicId,
      topicTitle: subtopic.topicTitle,
      month: subtopic.month,
      monthTitle: subtopic.monthTitle,
      area: subtopic.area,
      type: subtopic.type || 'learn',
      scheduledMinutes,
      totalMinutes: subtopic.minutes,
      alreadyDoneMinutes,
      isSplit,
      practiceTask: subtopic.practiceTask || null,
      status: 'pending', // 'pending' | 'in-progress' | 'completed'
      isSplitContinuation: alreadyDoneMinutes > 0,
      label: isSplit
        ? `${subtopic.title} (Part ${Math.ceil(alreadyDoneMinutes / subtopic.minutes * 2) + 1})`
        : subtopic.title
    };
  }

  /**
   * Derive today's focus description from the task list
   */
  function deriveFocus(tasks) {
    if (!tasks.length) return 'All tasks completed! 🎉';

    const months = [...new Set(tasks.map(t => t.monthTitle))];
    const topics = [...new Set(tasks.map(t => t.topicTitle))];

    if (months.length === 1) {
      return `Month ${tasks[0].month} — ${topics.slice(0, 2).join(' & ')}`;
    }
    return topics.slice(0, 2).join(' & ');
  }

  /**
   * Regenerate schedule after time change, preserving completed tasks
   * @param {number} newMinutes
   * @param {string[]} completedTodayIds - already completed in today's session
   * @param {string[]} allCompletedIds - all-time completed IDs
   * @param {Object} partialMap
   */
  function regenerateSchedule(newMinutes, completedTodayIds, allCompletedIds, partialMap) {
    // Remove today's completed from all-completed to get the "remaining" correctly
    const frozenCompleted = allCompletedIds.filter(id => !completedTodayIds.includes(id));
    const result = generateSchedule(newMinutes, allCompletedIds, partialMap);

    // Mark today's already-completed tasks in the result
    result.tasks.forEach(task => {
      if (completedTodayIds.includes(task.id)) {
        task.status = 'completed';
      }
    });

    return result;
  }

  /**
   * Calculate overall progress percentage
   */
  function calculateProgress(completedIds, partialMap) {
    const allSubtopics = getAllSubtopics();
    const total = allSubtopics.length;
    if (total === 0) return { overall: 0, frontend: 0, backend: 0 };

    const completedSet = new Set(completedIds);

    const feSubtopics = allSubtopics.filter(st => st.area === 'frontend');
    const beSubtopics = allSubtopics.filter(st => st.area === 'backend');

    // Count partial progress as fractional completions
    let feCompleted = 0, beCompleted = 0, totalCompleted = 0;

    allSubtopics.forEach(st => {
      let fraction = 0;
      if (completedSet.has(st.id)) {
        fraction = 1;
      } else if (partialMap[st.id]) {
        fraction = partialMap[st.id].doneMinutes / st.minutes;
      }

      totalCompleted += fraction;
      if (st.area === 'frontend') feCompleted += fraction;
      else if (st.area === 'backend') beCompleted += fraction;
    });

    return {
      overall: Math.round((totalCompleted / total) * 100),
      frontend: feSubtopics.length ? Math.round((feCompleted / feSubtopics.length) * 100) : 0,
      backend: beSubtopics.length ? Math.round((beCompleted / beSubtopics.length) * 100) : 0
    };
  }

  /**
   * Get current month based on progress
   */
  function getCurrentMonth(completedIds) {
    const allSubtopics = getAllSubtopics();
    const completedSet = new Set(completedIds);
    const firstIncomplete = allSubtopics.find(st => !completedSet.has(st.id));
    return firstIncomplete ? firstIncomplete.month : 12;
  }

  /**
   * Get all subtopics for a specific month
   */
  function getMonthSubtopics(monthNum) {
    return getAllSubtopics().filter(st => st.month === monthNum);
  }

  /**
   * Generate "tomorrow's preview" schedule
   */
  function previewTomorrow(tomorrowMinutes, completedIds, partialMap) {
    return generateSchedule(tomorrowMinutes, completedIds, partialMap);
  }

  // Public API
  return {
    generateSchedule,
    regenerateSchedule,
    calculateProgress,
    getCurrentMonth,
    getMonthSubtopics,
    previewTomorrow
  };

})();
