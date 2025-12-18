export function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

export function formatHMS(ms, { showMs = false } = {}) {
  const total = Math.max(0, Math.floor(ms));
  const h = Math.floor(total / 3600000);
  const m = Math.floor((total % 3600000) / 60000);
  const s = Math.floor((total % 60000) / 1000);
  const cs = Math.floor((total % 1000) / 10); // centiseconds

  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  const hh = String(h).padStart(2, "0");

  if (h > 0) {
    return showMs ? `${hh}:${mm}:${ss}.${String(cs).padStart(2, "0")}` : `${hh}:${mm}:${ss}`;
  }
  return showMs ? `${mm}:${ss}.${String(cs).padStart(2, "0")}` : `${mm}:${ss}`;
}
