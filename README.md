# Tide Timer（React + Vite）

療癒型計時器：可切換「碼表 / 倒數」，並用水位 + 圓環進度做視覺化。  
設計目標：一眼看懂、看起來舒服、方便你 Fork 後改功能。

## 本機執行
```bash
npm install
npm run dev
```

## 部署到 GitHub Pages（GitHub Actions）
> 本專案 `vite.config.js` 會在 GitHub Actions 內自動讀取 repo 名稱，設定正確的 `base` 路徑。

## 可以新增的練習方向
- 倒數：加「自訂分鐘/秒輸入」或滑桿
- 倒數結束：加提示音（並可開關）
- localStorage：記住上次模式與倒數秒數
- 視覺：波紋更慢、呼吸週期可調
- 統計：今日累積專注時間 / 完成次數  
