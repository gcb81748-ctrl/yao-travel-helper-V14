V17.1 即時同步快取修正版

這版主要修正：
- iPhone / 加入主畫面的 PWA 可能還在讀舊版 app.js
- service worker 快取未更新，導致 V17 即時同步沒有真正載入
- sw.js 改成 network-first，並更新快取名稱

使用方式：
1. 解壓縮 ZIP
2. 覆蓋到 D:\yao-travel-helper
3. GitHub Desktop：
   Summary 輸入：V17.1 realtime cache fix
   Commit to main
   Push origin
4. 等 GitHub Pages 1～5 分鐘部署

手機測試前請務必：
1. 刪除 iPhone 主畫面上的舊 APP 圖示
2. Safari 開啟：
   https://gcb81748-ctrl.github.io/yao-travel-helper-V14/?v=17fix
3. 確認畫面正常後，再重新「加入主畫面」

即時同步測試：
1. 電腦 Chrome 開網站，進入 行程表 → Day 1
2. 手機 Safari 開網站，進入 行程表 → Day 1
3. 電腦切團長模式，修改 Day 1 任一行程
4. 手機應在數秒內自動更新

注意：
即時更新只會在手機也停留於同一天的時間軸頁時最明顯。
如果手機在首頁或其他頁面，資料仍會同步，但畫面不一定立即跳轉。
