附近景點／附近餐廳／附近神社功能修正版

問題原因：
目前 app.js 內有 renderNearbySpots、renderNearbyRestaurants、renderNearbyShrines，
但缺少 renderNearbySearchPage() 與 openNearbyMapSearch() 兩個必要函式，
所以點擊附近景點、附近餐廳、附近神社時會失效。

修正內容：
已補回：
- openNearbyMapSearch(query)
- renderNearbySearchPage(title, description, groups)

使用方式：
1. 解壓縮本 ZIP
2. 將 app.js 覆蓋到：
   D:\yao-travel-helper\app.js
3. GitHub Desktop：
   Summary 輸入：fix nearby search
   Commit to main
   Push origin
4. 等 GitHub Pages 部署後，用網址測試：
   https://gcb81748-ctrl.github.io/yao-travel-helper-V14/?v=nearbyfix

注意：
第一次點擊搜尋時，手機可能會詢問定位權限，請允許。
如果拒絕定位，會改用一般 Google Maps 搜尋。
