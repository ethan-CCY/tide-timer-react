# Tide Timer（React 計時器學習專案）

本專案是一個以 **React + Vite** 建立的計時器練習作品，  
主要目標不是完成商業產品，而是作為 **React、前端動畫、GitHub Pages 與工作流程的學習紀錄**。

專案實作了「碼表 / 倒數計時」切換，並嘗試用「水位變化」與「緩慢波紋」呈現療癒型視覺效果。

---

## Demo（學習成果展示）

- 線上預覽（原始穩定版本）  
  [Demo](https://ethan-ccy.github.io/tide-timer-react/previews/restore/original-preview/)

> 此 Demo 由 GitHub Pages 發佈，並透過 branch preview workflow 產生。  
> 不同分支可對應不同預覽網址，方便測試與回溯版本。

---

## 專案學習目標

本專案主要用於練習與理解以下內容：

- React 元件結構與 props 設計
- 使用 hooks 管理計時狀態（stopwatch / countdown）
- CSS 動畫（transform、keyframes）在實務中的應用
- 視覺動畫拆層，避免 transform 互相干擾
- GitHub Actions + GitHub Pages 部署流程
- Branch preview 與版本回溯策略

---

## 功能說明

- 碼表與倒數計時模式切換
- 倒數計時時：
  - 水位隨剩餘時間填滿
  - 光影波紋獨立漂移
  - 倒數10秒數字變紅並閃爍
- 碼表模式：
  - 使用靜態深色水面，避免過多動態干擾
  - 每10秒出現閃波
- 所有動畫皆以「舒緩、不干擾閱讀」為設計原則

---

## 技術使用

- React
- Vite
- 原生 CSS（無動畫函式庫）
- GitHub Actions
- GitHub Pages

---

## 專案結構簡述

```text
src/
├─ components/
│  ├─ WaterGauge.jsx      # 水位與波紋視覺化
│  ├─ Ring.jsx            # 圓環進度顯示
│  ├─ Controls.jsx        # 控制按鈕
│  └─ ...
├─ lib/
│  ├─ hooks.js            # 計時邏輯（stopwatch / countdown）
│  └─ time.js             # 時間格式化工具
├─ App.jsx
└─ styles.css             # 所有動畫與樣式定義
