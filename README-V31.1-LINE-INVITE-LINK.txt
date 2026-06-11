V31.1 LINE 邀請連結版

重點：
1. 這個版本不儲存團員 LINE ID。
2. 也不儲存加密 LINE ID。
3. 聯絡頁只使用 LINE 好友邀請網址或 LINE 群組邀請網址。
4. 團員定位 Firebase 功能保留。
5. 密碼入口保留，預設密碼：1017。

如何填入邀請網址：
1. 用記事本或 VS Code 打開 app.js。
2. 搜尋：V31_LINE_INVITE_CONTACTS
3. 找到每位團員的 url:""
4. 把雙引號中間改成 LINE 好友邀請網址或群組邀請網址。

範例：
{name:"堯",role:"團長",url:"https://line.me/ti/p/你的邀請碼"}
{name:"名古屋旅遊群組",role:"LINE 群組",url:"https://line.me/R/ti/g/你的群組邀請碼"}

注意：
- 邀請網址不是 LINE ID，但它本身仍然是可被使用的連結。
- 請只把 APP 密碼和網址分享給團員。
- 如果不填 url，APP 會顯示「尚未設定」，按鈕會停用。

GitHub Commit 建議輸入：
V31.1 switch LINE ID to invite links
