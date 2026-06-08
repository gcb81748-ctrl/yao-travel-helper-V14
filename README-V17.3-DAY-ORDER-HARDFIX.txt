V17.3 行程順序強制修正版

修正重點：
- 不再使用 Firebase 回傳物件順序。
- 強制固定顯示順序：
  Day 1：抵達・榮町之夜
  Day 2：武士與書香 (週六)
  Day 3：古意犬山・千年神宮 (週日)
  Day 4：樂高樂園・冒險之日
  Day 5：最後採買・歸途
- index.html 加上 ?v=173，避免手機繼續讀舊 app.js。
- sw.js 更新快取名稱。

使用方式：
1. 解壓縮 ZIP
2. 覆蓋到 D:\yao-travel-helper
3. GitHub Desktop：
   Summary 輸入：V17.3 day order hardfix
   Commit to main
   Push origin
4. 等 GitHub Pages 部署完成後，用以下網址測試：
   https://gcb81748-ctrl.github.io/yao-travel-helper-V14/?v=173

iPhone 若仍錯亂：
1. 刪除主畫面上的舊 APP 圖示
2. Safari 設定 → 進階 → 網站資料 → 搜尋 github.io → 刪除相關網站資料
3. Safari 重新開啟：
   https://gcb81748-ctrl.github.io/yao-travel-helper-V14/?v=173
4. 再重新加入主畫面
