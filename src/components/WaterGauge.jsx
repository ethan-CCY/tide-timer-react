import React from "react";
import { clamp } from "../lib/time.js";

/**
 * WaterGauge: soothing water level + slow wave drift (countdown),
 * or static dark plate for stopwatch.
 * level: 0..1 (1 = full) for animated mode
 */
export default function WaterGauge({ level = 0.5, variant = "countdown", size = 220 }) {
  if (variant === "stopwatch") {
    return (
      <div
        className="waterGauge waterGaugeStatic"
        aria-hidden="true"
        style={{ width: size, height: size }}
      >
        <div className="waterPlate" />
      </div>
    );
  }

  const l = clamp(level, 0, 1);
  const y = `${(1 - l) * 100}%`;

  return (
    <div
      className={`waterGauge ${variant === "countdown" ? "waterGaugeCountdown" : ""}`}
      aria-hidden="true"
      style={{ width: size, height: size }}
    >
      <div className="waterSurface" style={{ top: y }} />
      <div
        className="waterFill"
        style={{ "--water-shift": `${(1 - l) * 100}%` }}
      >
        <div className="wave wave1" />
        <div className="wave wave2" />
      </div>
    </div>
  );
}
