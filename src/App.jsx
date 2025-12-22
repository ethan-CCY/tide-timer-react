import React, { useMemo, useState } from "react";
import ModeSwitch from "./components/ModeSwitch.jsx";
import Ring from "./components/Ring.jsx";
import WaterGauge from "./components/WaterGauge.jsx";
import TimeDisplay from "./components/TimeDisplay.jsx";
import Controls from "./components/Controls.jsx";
import CountdownPresets from "./components/CountdownPresets.jsx";
import LapList from "./components/LapList.jsx";
import { formatHMS, clamp } from "./lib/time.js";
import { useCountdown, useStopwatch } from "./lib/hooks.js";

export default function App() {
  const [mode, setMode] = useState("stopwatch"); // "stopwatch" | "countdown"
  const sw = useStopwatch();
  const cd = useCountdown(5 * 60 * 1000);

  const [laps, setLaps] = useState([]);

  const active = mode === "stopwatch" ? sw : cd;

  // progress for visualization
  const viz = useMemo(() => {
    if (mode === "countdown") {
      const total = cd.totalMs || 1;
      const progress = clamp(cd.remainingMs / total, 0, 1);
      return {
        ringProgress: progress,
        waterLevel: progress,
        waterVariant: "countdown",
        title: "倒數",
        subtitle: `總長 ${formatHMS(cd.totalMs)}`,
        flashKey: null,
      };
    }

    // Stopwatch: make it feel calm by looping visuals each minute
    const loop = 10 * 1000;
    const phase = (sw.elapsedMs % loop) / loop;
    return {
      ringProgress: phase,
      waterLevel: 0.5,
      waterVariant: "stopwatch",
      title: "碼錶",
      subtitle: sw.isRunning ? "流動中…" : "跑跑跑~向前跑~",
    };
  }, [mode, sw.elapsedMs, sw.isRunning, cd.remainingMs, cd.totalMs]);

  const primaryTime =
    mode === "stopwatch"
      ? formatHMS(sw.elapsedMs, { showMs: true })
      : formatHMS(cd.remainingMs, { showMs: true });

  const onReset = () => {
    if (mode === "stopwatch") {
      sw.reset();
      setLaps([]);
    } else {
      cd.reset();
    }
  };

  const onLap = () => {
    if (mode !== "stopwatch") return;
    setLaps((prev) => [sw.elapsedMs, ...prev].slice(0, 50));
  };

  const onPickPreset = (ms) => {
    cd.setTotalWhileStopped(ms);
  };

  return (
    <div className={`app mode-${mode}`}>
      <header className="header">
        <div className="brand">
          <div className="brandTitle">Tide Timer</div>
          <div className="brandTag">療癒型碼錶 / 倒數</div>
        </div>
        <ModeSwitch mode={mode} setMode={(m) => {
          // stop running when switching modes (keeps mental model simple)
          if (sw.isRunning) sw.pause();
          if (cd.isRunning) cd.pause();
          setMode(m);
        }} />
      </header>

      <main className={`main mode-${mode}`}>
        {mode === "stopwatch" ? (
          <div className="stopwatchGrid">
            <section className="card breathe timerCard" aria-label="Stopwatch">
              <div className="vizWrap">
                <Ring progress={viz.ringProgress} size={300} />
                <WaterGauge level={viz.waterLevel} variant={viz.waterVariant} size={260} />
                <div className="vizOverlay">
                  <div className="modeTitle">{viz.title}</div>
                  <TimeDisplay primary={primaryTime} secondary={viz.subtitle} />
                </div>
              </div>

              <Controls
                isRunning={active.isRunning}
                onStart={active.start}
                onPause={active.pause}
                onReset={onReset}
                extraLeft={
                  <button
                    className="btn btnLap"
                    onClick={onLap}
                    disabled={!sw.isRunning}
                  >
                    記錄
                  </button>
                }
              />
            </section>

            <LapList laps={laps} />
          </div>
        ) : (
          <section className="card breathe" aria-label="Timer">
            <div className="vizWrap">
              <Ring progress={viz.ringProgress} size={300} />
              <WaterGauge level={viz.waterLevel} variant={viz.waterVariant} size={260} />
              <div className="vizOverlay">
                <div className="modeTitle">{viz.title}</div>
                <TimeDisplay primary={primaryTime} secondary={viz.subtitle} />
              </div>
            </div>

            {mode === "countdown" ? (
              <div className="countdownTools">
                <CountdownPresets disabled={cd.isRunning} onPick={onPickPreset} />
                <div className="hint">
                  小提示：使用快速鍵，依點擊次數，初始時間可累加，或按 "清除" 重新設定。
                </div>
              </div>
            ) : null}

            <Controls
              isRunning={active.isRunning}
              onStart={active.start}
              onPause={active.pause}
              onReset={onReset}
              extraLeft={null}
            />

            {mode === "countdown" && cd.remainingMs === 0 ? (
              <div className="done" role="status">
                完成 ✨
              </div>
            ) : null}
          </section>
        )}
      </main>

      <footer className="footer">
        <span>Made for Fork & Modify ✦ React + Vite</span>
      </footer>
    </div>
  );
}
