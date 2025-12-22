import React from "react";
import { clamp } from "../lib/time.js";

/**
 * WaterGauge: soothing water level + slow wave drift (countdown),
 * or static wavy water for stopwatch.
 * level: 0..1 (1 = full) for animated mode
 */
export default function WaterGauge({ level = 0.5, variant = "countdown", size = 220 }) {
  const l = clamp(level, 0, 1);
  const y = `${(1 - l) * 100}%`;
  const isCountdown = variant === "countdown";
  const isStopwatch = variant === "stopwatch";

  return (
    <div
      className={`waterGauge ${isCountdown ? "waterGaugeCountdown" : ""} ${
        isStopwatch ? "waterGaugeStopwatch" : ""
      }`}
      aria-hidden="true"
      style={{ width: size, height: size }}
    >
      <div
        className={`waterSurface ${isStopwatch ? "waterSurfaceWave" : ""}`}
        style={{ top: y }}
      />
      <div
        className={`waterFill ${isStopwatch ? "waterFillStatic" : ""}`}
        style={{ "--water-shift": `${(1 - l) * 100}%` }}
      >
        <div className="wave wave1" />
        <div className="wave wave2" />
      </div>
    </div>
  );
}
