V26 附近探索中心（重製版）

這是完整覆蓋版 ZIP，不需要剪貼片段。

保留既有功能：
- 密碼門禁 1017
- 目前 UI 風格
- 行程表
- Firebase 行程同步
- 團員定位分享
- 行前倒數
- 收藏與其他既有功能

本版只重製：
- 附近景點
- 附近餐廳
- 附近神社

設計方式：
- 不使用 Google Places API
- 不使用額外 API Key
- 不增加費用
- 點擊後直接取得手機目前 GPS 位置
- 開啟 Google Maps 搜尋目前位置附近
- 若定位失敗，會自動改用名古屋地區搜尋

使用方式：
1. 解壓縮 ZIP
2. 將所有檔案直接覆蓋到：
   D:\yao-travel-helper
3. GitHub Desktop：
   Summary 輸入：V26 nearby explore center
   Commit to main
   Push origin
4. 測試網址：
   https://gcb81748-ctrl.github.io/yao-travel-helper-V14/?v=26

手機若仍顯示舊版：
1. 刪除 iPhone 主畫面 APP
2. 用 Safari 開啟上方測試網址
3. 再重新加入主畫面
