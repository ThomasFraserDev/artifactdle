
// Deterministic pseudo-random number generator (Mulberry32)
function seededRandom(seed) {
  let t = seed += 0x6D2B79F5;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

function getSeedForDate(date, offset = 0, mode = 'normal') {
  // Use YYYYMMDD as seed base, plus offset and mode for variety
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  // Add mode hash to ensure different games get different artifacts
  let modeHash = 0;
  for (let i = 0; i < mode.length; i++) {
    modeHash += mode.charCodeAt(i);
  }
  return y * 10000 + m * 100 + day + offset + modeHash * 1000;
}

// For normal mode daily artifact
export const getDailyArtifactIndex = (artifactCount, offset = 0) => {
  const today = new Date();
  const seed = getSeedForDate(today, offset, 'normal');
  return Math.floor(seededRandom(seed) * artifactCount);
};

// For silhouette mode daily artifact
export const getDailySilhouetteArtifactIndex = (artifactCount, offset = 0) => {
  const today = new Date();
  const seed = getSeedForDate(today, offset, 'silhouette');
  return Math.floor(seededRandom(seed) * artifactCount);
};

// For normal mode, but for a specific date
export const getDailyArtifactIndexForDate = (artifactCount, offset = 0, date) => {
  const seed = getSeedForDate(date, offset, 'normal');
  return Math.floor(seededRandom(seed) * artifactCount);
};

// For silhouette mode, but for a specific date
export const getDailySilhouetteArtifactIndexForDate = (artifactCount, offset = 0, date) => {
  const seed = getSeedForDate(date, offset, 'silhouette');
  return Math.floor(seededRandom(seed) * artifactCount);
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