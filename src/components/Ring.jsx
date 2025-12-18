import React from "react";
import { clamp } from "../lib/time.js";

export default function Ring({ progress = 0, size = 260, stroke = 10 }) {
  const p = clamp(progress, 0, 1);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - p);

  return (
    <svg className="ring" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        className="ringTrack"
        cx={size / 2}
        cy={size / 2}
        r={r}
        strokeWidth={stroke}
      />
      <circle
        className="ringProgress"
        cx={size / 2}
        cy={size / 2}
        r={r}
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={offset}
      />
    </svg>
  );
}
