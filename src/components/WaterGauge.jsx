import React from "react";
import { clamp } from "../lib/time.js";

/**
 * WaterGauge: soothing water level + slow wave drift.
 * level: 0..1 (1 = full)
 */
export default function WaterGauge({ level = 0.5 }) {
  const l = clamp(level, 0, 1);
  const y = `${(1 - l) * 100}%`;

  return (
    <div className="waterGauge" aria-hidden="true">
      <div className="waterSurface" style={{ top: y }} />
      <div className="waterFill" style={{ transform: `translateY(${(1 - l) * 100}%)` }}>
        <div className="wave wave1" />
        <div className="wave wave2" />
      </div>
    </div>
  );
}
