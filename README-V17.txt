V17 Firebase Realtime 即時同步版

使用方式：
1. 備份 D:\yao-travel-helper
2. 解壓縮本 ZIP
3. 將裡面的檔案覆蓋到 D:\yao-travel-helper
4. GitHub Desktop：
   Summary 輸入：V17 realtime sync
   Commit to main
   Push origin
5. 等 GitHub Pages 部署完成後，重新開啟網站。

本版新增：
- Firebase onSnapshot 即時監聽
- 團長修改行程後，團員頁面可自動收到更新
- 行程時間軸頁會顯示同步狀態
- Firebase 仍保留本機 localStorage 備援

測試方式：
1. 用電腦 Chrome 開正式網站
2. 用手機 Safari 也開同一個網站
3. 兩邊都進入 行程表 → Day 1
4. 電腦切團長模式，修改任一行程
5. 手機畫面應自動更新，不用手動重新整理

注意：
- 如果手機是加入主畫面的舊 PWA，可能會有快取。
- 如未更新，請先刪除主畫面 APP，重新用 Safari 開網址再加入主畫面。
