import React from "react";

export default function TimeDisplay({ primary, secondary }) {
  return (
    <div className="timeDisplay">
      <div className="timePrimary">{primary}</div>
      {secondary ? <div className="timeSecondary">{secondary}</div> : null}
    </div>
  );
}
