import React from "react";
import { formatHMS } from "../lib/time.js";

export default function LapList({ laps }) {
  return (
    <section className="card lapCard" aria-label="Laps">
      <div className="laps">
        <div className="lapsTitle">記錄</div>
        {laps.length ? (
          <ol className="lapsList">
            {laps.map((ms, idx) => (
              <li key={idx} className="lapItem">
                <span className="lapIndex">{String(idx + 1).padStart(2, "0")}</span>
                <span className="lapTime">{formatHMS(ms, { showMs: true })}</span>
              </li>
            ))}
          </ol>
        ) : (
          <div className="lapsEmpty">尚無紀錄</div>
        )}
      </div>
    </section>
  );
}
