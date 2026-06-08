V17.2 行程排序修正版

修正問題：
- Firebase 物件欄位順序可能和原本 Day 1~Day 5 不一致
- 畫面用 Object.keys(data) 直接渲染時，會出現 Day 4 排到第一個
- 本版改成依照 Day 數字排序，因此固定顯示：
  Day 1 → Day 2 → Day 3 → Day 4 → Day 5

使用方式：
1. 解壓縮 ZIP
2. 覆蓋到 D:\yao-travel-helper
3. GitHub Desktop：
   Summary 輸入：V17.2 day order fix
   Commit to main
   Push origin
4. 等 GitHub Pages 部署完成

手機測試：
請用 Safari 開：
https://gcb81748-ctrl.github.io/yao-travel-helper-V14/?v=172

如果主畫面 APP 還顯示錯誤：
1. 先刪除 iPhone 主畫面上的舊 APP 圖示
2. 用 Safari 開上面網址
3. 再重新加入主畫面
