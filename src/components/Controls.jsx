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
          className={`btn btnPrimary ${isRunning ? "btnPause" : "btnStart"}`}
          onClick={isRunning ? onPause : onStart}
          aria-label={isRunning ? "暫停" : "開始"}
        >
          {isRunning ? "暫停" : "開始"}
        </button>
        <button className="btn btnReset" onClick={onReset} aria-label="重新計時">
          重新計時
        </button>
        {extraRight}
      </div>
    </div>
  );
}
