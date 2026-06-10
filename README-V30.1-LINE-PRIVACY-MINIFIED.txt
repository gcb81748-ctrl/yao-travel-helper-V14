V30.1 LINE 隱私簡化版

本版調整：
1. 聯絡(LINE)頁面不再顯示實際 LINE ID。
2. 搜尋欄不再用 LINE ID 搜尋，只能搜尋姓名或角色。
3. 按鈕文字改為「複製 LINE 資訊 / 開啟 LINE」。
4. 複製成功提示不再顯示實際 LINE ID。
5. app.js 已壓縮，並將 LINE ID 改為 Base64 編碼儲存，避免一般人直接在畫面或原始碼搜尋到明文 LINE ID。

注意：
這不是正式資安防護。公開 GitHub Pages 的前端程式仍可能被懂技術的人還原。
本版目標是降低一般陌生人直接看到 LINE 資訊的機率。

使用方式：
請將本 ZIP 內所有檔案覆蓋 GitHub 專案根目錄，等待 GitHub Pages 重新部署後，用 ?v=31 測試。
