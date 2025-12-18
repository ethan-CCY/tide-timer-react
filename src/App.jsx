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
        title: "倒數",
        subtitle: `總長 ${formatHMS(cd.totalMs)}`,
      };
    }

    // Stopwatch: make it feel calm by looping visuals each minute
    const loop = 60 * 1000;
    const phase = (sw.elapsedMs % loop) / loop;
    return {
      ringProgress: phase,
      waterLevel: 0.15 + phase * 0.7, // keep some padding (never fully empty/full)
      title: "碼表",
      subtitle: sw.isRunning ? "流動中…" : "休息一下也很好",
    };
  }, [mode, sw.elapsedMs, sw.isRunning, cd.remainingMs, cd.totalMs]);

  const primaryTime =
    mode === "stopwatch"
      ? formatHMS(sw.elapsedMs, { showMs: true })
      : formatHMS(cd.remainingMs);

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
    <div className="app">
      <header className="header">
        <div className="brand">
          <div className="brandTitle">Tide Timer</div>
          <div className="brandTag">療癒型碼表 / 倒數</div>
        </div>
        <ModeSwitch mode={mode} setMode={(m) => {
          // stop running when switching modes (keeps mental model simple)
          if (sw.isRunning) sw.pause();
          if (cd.isRunning) cd.pause();
          setMode(m);
        }} />
      </header>

      <main className="main">
        <section className="card breathe" aria-label="Timer">
          <div className="vizWrap">
            <Ring progress={viz.ringProgress} />
            <WaterGauge level={viz.waterLevel} />
            <div className="vizOverlay">
              <div className="modeTitle">{viz.title}</div>
              <TimeDisplay primary={primaryTime} secondary={viz.subtitle} />
            </div>
          </div>

          {mode === "countdown" ? (
            <div className="countdownTools">
              <CountdownPresets disabled={cd.isRunning} onPick={onPickPreset} />
              <div className="hint">
                小提示：倒數時可以先用預設，之後再加「自訂滑桿 / 輸入框」練習。
              </div>
            </div>
          ) : null}

          <Controls
            isRunning={active.isRunning}
            onStart={active.start}
            onPause={active.pause}
            onReset={onReset}
            extraLeft={
              mode === "stopwatch" ? (
                <button className="btn" onClick={onLap} disabled={!sw.isRunning}>
                  Lap
                </button>
              ) : null
            }
          />

          {mode === "stopwatch" ? <LapList laps={laps} /> : null}

          {mode === "countdown" && cd.remainingMs === 0 ? (
            <div className="done" role="status">
              完成 ✨
            </div>
          ) : null}
        </section>

        <section className="side">
          <div className="panel">
            <div className="panelTitle">你可以接著練的功能</div>
            <ul className="panelList">
              <li>倒數自訂：分鐘/秒輸入、滑桿、+10s/-10s</li>
              <li>音效開關（完成提示音）</li>
              <li>localStorage：記住上次模式與倒數秒數</li>
              <li>更療癒：水波更慢、呼吸週期可調</li>
              <li>統計：今日累積專注時間 / 完成次數</li>
            </ul>
          </div>

          <div className="panel">
            <div className="panelTitle">部署到 GitHub Pages</div>
            <ol className="panelList">
              <li>把整包檔案推到你的 GitHub repo</li>
              <li>Repo Settings → Pages → Source 選 GitHub Actions</li>
              <li>等待 Actions 跑完，就會自動發佈</li>
            </ol>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>Made for Fork & Modify ✦ React + Vite</span>
      </footer>
    </div>
  );
}
