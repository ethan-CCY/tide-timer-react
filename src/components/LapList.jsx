import React from "react";
import { formatHMS } from "../lib/time.js";

export default function LapList({ laps }) {
  if (!laps.length) return null;
  return (
    <div className="laps">
      <div className="lapsTitle">記錄</div>
      <ol className="lapsList">
        {laps.map((ms, idx) => (
          <li key={idx} className="lapItem">
            <span className="lapIndex">{String(idx + 1).padStart(2, "0")}</span>
            <span className="lapTime">{formatHMS(ms, { showMs: true })}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
