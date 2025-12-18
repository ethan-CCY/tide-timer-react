import React from "react";

export default function Controls({
  isRunning,
  onStart,
  onPause,
  onReset,
  extraLeft,
  extraRight,
}) {
  return (
    <div className="controls">
      <div className="controlsRow">
        {extraLeft}
        <button
          className="btn btnPrimary"
          onClick={isRunning ? onPause : onStart}
          aria-label={isRunning ? "Pause" : "Start"}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button className="btn" onClick={onReset} aria-label="Reset">
          Reset
        </button>
        {extraRight}
      </div>
    </div>
  );
}
