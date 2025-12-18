import React from "react";

const PRESETS = [
  { label: "1 分", ms: 1 * 60 * 1000 },
  { label: "3 分", ms: 3 * 60 * 1000 },
  { label: "5 分", ms: 5 * 60 * 1000 },
  { label: "10 分", ms: 10 * 60 * 1000 },
  { label: "25 分", ms: 25 * 60 * 1000 },
];

export default function CountdownPresets({ disabled, onPick }) {
  return (
    <div className="presets">
      {PRESETS.map((p) => (
        <button
          key={p.ms}
          className="chip"
          onClick={() => onPick(p.ms)}
          disabled={disabled}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
