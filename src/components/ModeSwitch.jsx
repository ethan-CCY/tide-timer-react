import React from "react";

export default function ModeSwitch({ mode, setMode }) {
  return (
    <div className="modeSwitch" role="tablist" aria-label="Timer mode">
      <button
        className={`pill ${mode === "stopwatch" ? "active" : ""}`}
        onClick={() => setMode("stopwatch")}
        role="tab"
        aria-selected={mode === "stopwatch"}
      >
        碼表
      </button>
      <button
        className={`pill ${mode === "countdown" ? "active" : ""}`}
        onClick={() => setMode("countdown")}
        role="tab"
        aria-selected={mode === "countdown"}
      >
        倒數
      </button>
    </div>
  );
}
