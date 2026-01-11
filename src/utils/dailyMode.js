export const getDailyArtifactIndex = (artifactCount, offset) => { // Select randpm daily artifact
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to midnight
  const startDate = new Date('2025-01-01'); // Base start date to allow for the randomising 
  startDate.setHours(0, 0, 0, 0);
  const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  return (daysSinceStart + offset) % artifactCount; // Calculate random index
};

export const getDailyArtifactIndexForDate = (artifactCount, offset, date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const startDate = new Date('2025-01-01');
  startDate.setHours(0, 0, 0, 0);
  const daysSinceStart = Math.floor((d - startDate) / (1000 * 60 * 60 * 24));
  return (daysSinceStart + offset) % artifactCount;
};

export const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // YYYY-MM-DD
};

export const getTimeUntilNextDaily = () => { // Display countdown until daily reset
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const msUntilTomorrow = tomorrow - now;
  const hours = Math.floor(msUntilTomorrow / (1000 * 60 * 60));
  const minutes = Math.floor((msUntilTomorrow % (1000 * 60 * 60)) / (1000 * 60));
  return { hours, minutes };
};