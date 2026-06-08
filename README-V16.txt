V16 Firebase 行程雲端同步版

使用方式：
1. 先備份目前 GitHub 專案資料夾。

2. 解壓縮此 ZIP。

3. 將 ZIP 裡面的檔案覆蓋到你的專案：
   yao-travel-helper-V14

4. 主要新增 / 修改：
   - 新增 firebase.js
   - 修改 index.html
   - 修改 app.js
   - 修改 style.css
   - 修改 sw.js

5. 用 GitHub Desktop：
   - Summary 輸入：V16 Firebase sync
   - Commit to main
   - Push origin

6. 等 GitHub Pages 重新部署後，打開：
   https://gcb81748-ctrl.github.io/yao-travel-helper-V14/

V16 功能：
- APP 開啟時會讀取 Firebase travelData/nagoya2026 的 itineraries
- 團長修改、新增、刪除、恢復預設行程時，會同步到 Firebase
- 團員重新開啟網站後，會讀取最新雲端行程
- 若 Firebase 暫時讀取失敗，APP 會先使用本機資料

Firebase 使用的文件：
travelData / nagoya2026

注意：
目前 Firestore 規則為測試版：
allow read, write: if true;

這代表知道網址的人理論上可以讀寫 travelData。
等多人同步確認正常後，下一版建議做 V17：團長雲端寫入保護。
