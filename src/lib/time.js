export function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

export function formatHMS(ms, { showMs = false } = {}) {
  const total = Math.max(0, Math.floor(ms));
  const h = Math.floor(total / 3600000);
  const m = Math.floor((total % 3600000) / 60000);
  const s = Math.floor((total % 60000) / 1000);
  const msPart = total % 1000;

  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  const hh = String(h).padStart(2, "0");

  const base = `${hh}:${mm}:${ss}`;
  if (!showMs) return base;

  return `${base}.${String(msPart).padStart(3, "0")}`;
}
