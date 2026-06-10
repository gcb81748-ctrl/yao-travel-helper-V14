V30 乾淨基準版：LINE 固定通訊錄修正版

完整覆蓋版 ZIP，不需要剪貼片段。

本版專門解決：
- 電腦版 LINE ID 正常，但手機 Safari 顯示全部未設定
- 舊版聯絡(LINE)仍讀取 localStorage
- 首頁的「聯絡 (LINE)」實際 module 是「通話(LINE)」，導致 V29/V29.1 沒有接到正確頁面
- 手機快取讀到舊 app.js

本版處理：
- renderLine() 直接改為固定通訊錄
- 通話(LINE)、聯絡(LINE)、LINE 聯絡等全部導向同一個 V30 固定通訊錄
- 停用舊 LINE localStorage 寫入/讀取流程
- 更新 sw.js 為 network-first，減少手機快取問題
- 保留其他既有功能

固定名單：
堯 love720930
靜雯 0953310753
阿胖 yao_0615
靖娟ㄤ sn1204s
靖娟 jeantsai19
靖娟兒 gao0308de
潔茹 02029519
曼寧 manninglee
嘉安 ann9050
淑蓉 sande0722

使用方式：
1. 解壓縮 ZIP
2. 將全部內容上傳/覆蓋到 GitHub 專案根目錄
3. Commit message：V30 clean base fixed LINE
4. 測試：
   https://gcb81748-ctrl.github.io/yao-travel-helper-V14/?v=30
5. 手機仍舊版時測：
   https://gcb81748-ctrl.github.io/yao-travel-helper-V14/?v=3001
