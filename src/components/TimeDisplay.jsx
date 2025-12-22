import React from "react";

export default function TimeDisplay({
  primary,
  secondary,
  className = "",
  primaryClassName = "",
}) {
  const [main, ms] = String(primary || "").split(".");

  return (
    <div className={`timeDisplay ${className}`}>
      <div className={`timePrimary ${primaryClassName}`}>
        <span className="timeMain">{main}</span>
        {ms ? <span className="timeMs">.{ms}</span> : null}
      </div>
      {secondary ? <div className="timeSecondary">{secondary}</div> : null}
    </div>
  );
}
