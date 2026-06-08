V16 Firebase 同步修正版

重要說明：
前一版可能只新增 firebase.js，但 app.js 仍然只用 localStorage。
這個修正版已把行程表的儲存流程改成：
1. 先存本機 localStorage
2. 再寫入 Firebase Firestore
3. 開啟網站時會先嘗試讀取 Firebase 最新行程

使用方式：
1. 備份 D:\yao-travel-helper
2. 解壓縮本 ZIP
3. 將裡面的檔案覆蓋到 D:\yao-travel-helper
4. 用 GitHub Desktop Commit
   Summary: V16 Firebase sync fix
5. Push origin
6. 等 GitHub Pages 部署完成
7. 重新開啟網站測試

測試方式：
1. 開啟網站
2. 切團長模式，密碼 720930
3. 行程表 → Day 1 → 編輯任一行程
4. 儲存
5. 回 Firebase Firestore → travelData → nagoya2026
6. 右側應該會出現 itineraries 與 updatedAt

如果仍看不到：
- 請按瀏覽器 Ctrl + F5
- 手機請刪除主畫面 APP 後重新加入
- Firestore 規則需允許 travelData 讀寫
