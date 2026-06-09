V20 團員定位分享版

新增功能：
- 位置分享頁正式可用
- 團員可選擇自己的名字
- 一鍵取得 GPS 並上傳 Firebase
- 顯示所有團員最後位置
- 顯示最後更新時間
- 點擊團員位置可開啟 Google Maps
- 團長模式可清除全部定位資料

重要限制：
- 網頁版無法背景持續定位。
- 團員需要打開 APP 並按「更新我的位置」。
- 定位需要 iPhone / 瀏覽器允許定位權限。

Firebase 規則提醒：
目前 Firestore 規則要允許 travelData 與 memberLocations 讀寫。
建議規則：

rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /travelData/{document} {
      allow read, write: if true;
    }

    match /memberLocations/{document} {
      allow read, write: if true;
    }
  }
}

使用方式：
1. 解壓縮 ZIP
2. 覆蓋到 D:\yao-travel-helper
3. GitHub Desktop：
   Summary 輸入：V20 member location share
   Commit to main
   Push origin
4. 等 GitHub Pages 部署完成
5. 測試網址：
   https://gcb81748-ctrl.github.io/yao-travel-helper-V14/?v=20
