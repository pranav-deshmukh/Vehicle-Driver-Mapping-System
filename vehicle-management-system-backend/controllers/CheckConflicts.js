function hasConflict(existingSchedule, newStartTime, newEndTime) {
  return existingSchedule.some(
    (entry) =>
      (newStartTime >= entry.startTime && newStartTime < entry.endTime) ||
      (newEndTime > entry.startTime && newEndTime <= entry.endTime) ||
      (newStartTime <= entry.startTime && newEndTime >= entry.endTime)
  );
}

module.exports = hasConflict;
