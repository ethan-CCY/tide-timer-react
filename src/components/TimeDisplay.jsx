import React from "react";

export default function TimeDisplay({ primary, secondary }) {
  const [main, ms] = String(primary || "").split(".");

  return (
    <div className="timeDisplay">
      <div className="timePrimary">
        <span className="timeMain">{main}</span>
        {ms ? <span className="timeMs">.{ms}</span> : null}
      </div>
      {secondary ? <div className="timeSecondary">{secondary}</div> : null}
    </div>
  );
}
