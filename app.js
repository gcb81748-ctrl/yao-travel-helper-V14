let isLeader = false;

const homePage = document.getElementById("homePage");
const contentPage = document.getElementById("contentPage");
const roleSelect = document.getElementById("roleSelect");
const roleStatus = document.getElementById("roleStatus");

/*
  V13 LINE 聯絡人設定版：
  1. 保留 V10 行程表時間軸
  2. 景點分類改成「分類卡片 → 地點清單 → 詳情頁」
  3. 詳情頁提供推薦標籤、說明、Google Maps
  4. 團長模式才顯示「編輯」按鈕
*/
const menuItems = [
  {
    title: "行程表",
    subtitle: "管理我的行程",
    icon: "./assets/icons/icon-itinerary.png",
    module: "行程表"
  },
  {
    title: "聯絡 (LINE)",
    subtitle: "旅遊專屬聯繫",
    icon: "./assets/icons/icon-line.png",
    module: "通話(LINE)"
  },
  {
    title: "景點分類",
    subtitle: "探索熱門景點",
    icon: "./assets/icons/icon-sightseeing.png",
    module: "景點分類"
  },
  {
    title: "地區瀏覽",
    subtitle: "尋找目的地",
    icon: "./assets/icons/icon-location.png",
    module: "景點分類"
  },
  {
    title: "導航",
    subtitle: "規劃路線導航",
    icon: "./assets/icons/icon-navigation.png",
    module: "導航"
  },
  {
    title: "位置",
    subtitle: "查看目前位置",
    icon: "./assets/icons/icon-nearby-spots.png",
    module: "位置分享"
  },
  {
    title: "附近景點",
    subtitle: "探索周邊景點",
    icon: "./assets/icons/icon-sightseeing.png",
    module: "附近景點"
  },
  {
    title: "附近餐廳",
    subtitle: "尋找在地美食",
    icon: "./assets/icons/icon-nearby-food.png",
    module: "附近餐廳"
  },
  {
    title: "附近神社",
    subtitle: "參拜周邊神社",
    icon: "./assets/icons/icon-nearby-shrine.png",
    module: "附近神社"
  }
];

const itineraries = {
  "Day 1：抵達・榮町之夜": [
    { time: "13:00 - 14:00", title: "抵達中部機場，通關。", place: "中部國際機場" },
    { time: "14:00 - 15:00", title: "包車接機前往飯店。", place: "名古屋櫻通口LiVEMAX飯店" },
    { time: "15:30 - 16:30", title: "飯店 Check-in 放置行李。", place: "名古屋櫻通口LiVEMAX飯店" },
    { time: "17:00 - 18:30", title: "景點 1：綠洲 21 & 中部電力 MIRAI TOWER", place: "綠洲21 中部電力 MIRAI TOWER" },
    { time: "19:00 - 21:00", title: "晚餐：燒肉 朧 Oboro", place: "焼肉 朧 名古屋" }
  ],
  "Day 2：武士與書香 (週六)": [
    { time: "08:00 - 09:00", title: "早餐：加藤咖啡店 Kato Coffee", place: "加藤咖啡店 名古屋" },
    { time: "09:00 - 11:30", title: "景點 1：名古屋城", place: "名古屋城" },
    { time: "12:00 - 13:30", title: "午餐：金虎橫丁 義直區", place: "金鯱橫丁 義直區" },
    { time: "14:00 - 16:30", title: "景點 2：大須觀音 & 大須商店街", place: "大須觀音 大須商店街" },
    { time: "17:00 - 18:30", title: "景點 3：則武之森 & 蔦屋書店", place: "則武之森 蔦屋書店 名古屋" }
  ],
  "Day 3：古意犬山・千年神宮 (週日)": [
    { time: "09:00 - 11:00", title: "景點 1：國寶犬山城", place: "犬山城" },
    { time: "11:30 - 13:30", title: "午餐：犬山城下町散策", place: "犬山城下町" },
    { time: "14:00 - 15:30", title: "景點 2：三光稻荷神社", place: "三光稻荷神社" },
    { time: "17:00 - 18:30", title: "景點 3：熱田神宮", place: "熱田神宮" },
    { time: "18:30 - 20:30", title: "晚餐：蓬萊軒鰻魚飯", place: "熱田蓬萊軒" }
  ],
  "Day 4：樂高樂園・冒險之日": [
    { time: "09:00 - 10:00", title: "前往金城埠頭。", place: "金城埠頭" },
    { time: "10:00 - 15:00", title: "景點 1：名古屋樂高樂園 LEGOLAND Japan", place: "LEGOLAND Japan" },
    { time: "15:30 - 17:30", title: "景點 2：磁浮鐵道館", place: "SCMAGLEV and Railway Park" },
    { time: "18:30 - 20:30", title: "景點 3：名古屋車站 JR Central Towers 展望台", place: "JR Central Towers 名古屋車站" }
  ],
  "Day 5：最後採買・歸途": [
    { time: "08:30 - 09:30", title: "早餐：飯店周邊便利商店或咖啡廳。", place: "名古屋櫻通口LiVEMAX飯店" },
    { time: "10:00 - 11:00", title: "包車送機前往機場。", place: "中部國際機場" },
    { time: "11:45", title: "抵達中部國際機場，辦理登機。", place: "中部國際機場" }
  ]
};


const ITINERARY_KEY = "yaoTravelItinerariesV14";

function getItineraries() {
  try {
    const saved = JSON.parse(localStorage.getItem(ITINERARY_KEY));
    if (saved && typeof saved === "object") return saved;
  } catch (error) {
    // ignore invalid saved data
  }

  saveItineraries(itineraries);
  return JSON.parse(JSON.stringify(itineraries));
}

function saveItineraries(data) {
  localStorage.setItem(ITINERARY_KEY, JSON.stringify(data));
}

function resetItineraries() {
  if (!confirm("確定要恢復預設行程？目前已修改的行程會被覆蓋。")) return;
  localStorage.removeItem(ITINERARY_KEY);
  alert("已恢復預設行程。");
  openModule("行程表");
}

function updateItineraryItem(day, index, field, value) {
  const data = getItineraries();
  if (!data[day] || !data[day][index]) return;

  data[day][index][field] = value;
  saveItineraries(data);
}

function saveEditItineraryForm(day, index) {
  const timeInput = document.getElementById("editTime");
  const titleInput = document.getElementById("editTitle");
  const placeInput = document.getElementById("editPlace");

  if (!timeInput || !titleInput || !placeInput) return;

  const data = getItineraries();

  if (!data[day] || !data[day][index]) {
    alert("找不到這筆行程資料。");
    return;
  }

  data[day][index] = {
    time: timeInput.value.trim(),
    title: titleInput.value.trim(),
    place: placeInput.value.trim()
  };

  saveItineraries(data);
  alert("行程已儲存。");
  renderDayTimeline(day);
}

function deleteItineraryItem(day, index) {
  const data = getItineraries();

  if (!data[day] || !data[day][index]) return;

  if (!confirm("確定要刪除這筆行程？")) return;

  data[day].splice(index, 1);
  saveItineraries(data);
  renderDayTimeline(day);
}

function addItineraryItem(day) {
  const data = getItineraries();

  if (!data[day]) data[day] = [];

  data[day].push({
    time: "請輸入時間",
    title: "請輸入行程內容",
    place: "請輸入 Google Maps 搜尋地點"
  });

  saveItineraries(data);
  renderDayTimeline(day);
}


const lineMembers = [
  "堯", "靜雯", "阿胖", "小兒", "靖公", "靖娟",
  "娟大兒", "小妹", "潔如", "曼寧", "家安", "淑蓉"
];

const placeCategoryMeta = {
  "觀光景點": { icon: "🏯", summary: "名古屋、犬山、高山等熱門景點" },
  "古蹟": { icon: "🏛️", summary: "城郭、古街、歷史建築與戰場遺跡" },
  "購物商場": { icon: "🛍️", summary: "百貨、商店街、玩具與美妝購物" },
  "神社": { icon: "⛩️", summary: "御守、御朱印、特色神社與寺院" },
  "美食店家": { icon: "🍜", summary: "名古屋美食、鰻魚飯、燒肉與咖啡" },
  "伴手禮": { icon: "🎁", summary: "甜點、名古屋特色點心與禮品" }
};

const categories = {
  "觀光景點": [
    "名古屋車站 JR Central Towers 展望台", "犬山城", "犬山城下町",
    "犬山城下町昭和橫丁", "名古屋城", "中部電力未來塔", "綠洲21",
    "宮川朝市", "高山陣屋", "飛騨高山古建築群", "大須商店街",
    "鶴舞公園", "桶狹間古戰場公園", "日本樂高樂園", "世界淡水魚園水族館",
    "博物館 明治村", "吉卜力公園", "白鳥庭園", "清洲城", "織田信長濃姬像"
  ],
  "古蹟": ["犬山城下町", "名古屋城", "高山陣屋", "飛騨高山古建築群", "桶狹間古戰場公園", "清洲城"],
  "購物商場": ["HARBS 榮本店", "唐吉訶德榮本店", "Jill Stuart Nagoya Sakae", "SKYLE", "Super Kids Land Osu", "大須商店街"],
  "神社": ["三輪神社", "三光稻荷神社", "桃太郎神社", "愛知縣護國神社", "那古野神社", "名古屋東照宮", "若宮八幡社", "万松寺", "大須觀音", "曹洞宗千光寺", "豐國神社", "富部神社", "洲嵜神社", "熱田神宮", "津島神社"],
  "美食店家": ["麵家 獅子丸", "燒肉 飛騨牛", "焼肉 朧", "鳥開総本家", "小雞布丁蛋糕", "驛釜棊子麵", "青柳總本家", "世界的山將", "天然酵母 食パン つばめパン Milk", "三明治 喫茶リヨン", "金鯱橫丁義直區", "天婦羅飯糰 地雷也", "由乃別邸", "鰻櫃 花岡", "味噌鍋燒烏龍 山本屋總本家", "矢場丼 榮", "矢場丼矢場町本店", "Konparu Osu", "包包亭", "御手洗糰子 新雀本店", "青蛙饅頭 青柳總本家", "鯛福茶庵", "熱田蓬萊軒"],
  "伴手禮": ["小雞布丁蛋糕", "青柳總本家", "青蛙饅頭 青柳總本家"]
};

const placeDetails = {
  "犬山城": {
    emoji: "🏯",
    tags: ["國寶城郭", "拍照景點", "犬山必訪"],
    description: "犬山城是愛知縣代表性的歷史景點，適合搭配犬山城下町、昭和橫丁與三光稻荷神社一起安排。",
    tip: "建議早上前往，避開人潮後再慢慢逛城下町。"
  },
  "名古屋城": {
    emoji: "🏯",
    tags: ["武將文化", "名古屋地標", "金鯱"],
    description: "名古屋城是名古屋最具代表性的歷史地標，適合安排半日遊，搭配金鯱橫丁用餐。",
    tip: "若搭配金鯱橫丁，建議保留至少 2.5 小時。"
  },
  "綠洲21": {
    emoji: "✨",
    tags: ["夜景", "榮町", "拍照"],
    description: "綠洲21以水之宇宙船聞名，夜晚燈光氣氛佳，適合與中部電力 MIRAI TOWER 一起安排。",
    tip: "傍晚到晚上最適合拍照。"
  },
  "中部電力未來塔": {
    emoji: "🗼",
    tags: ["夜景", "電視塔", "榮町"],
    description: "中部電力 MIRAI TOWER 是名古屋市中心的重要地標，可搭配綠洲21與榮町商圈。",
    tip: "建議晚上去，周邊夜景比較漂亮。"
  },
  "熱田神宮": {
    emoji: "⛩️",
    tags: ["神宮", "參拜", "歷史"],
    description: "熱田神宮是名古屋重要神社，環境清幽，適合安排在犬山或市區行程後段。",
    tip: "可搭配熱田蓬萊軒鰻魚飯。"
  },
  "三光稻荷神社": {
    emoji: "⛩️",
    tags: ["粉色鳥居", "愛心繪馬", "犬山"],
    description: "三光稻荷神社以粉色鳥居與愛心繪馬聞名，與犬山城距離近，非常適合一起安排。",
    tip: "與犬山城一起步行安排最順。"
  },
  "大須商店街": {
    emoji: "🛍️",
    tags: ["逛街", "美食", "動漫周邊"],
    description: "大須商店街集合美食、藥妝、電器、二手店與動漫周邊，適合自由逛街與吃小點。",
    tip: "建議保留至少 2 小時。"
  },
  "大須觀音": {
    emoji: "🏮",
    tags: ["寺院", "大須", "順遊"],
    description: "大須觀音位於大須商店街旁，是逛街前後容易順路參拜的景點。",
    tip: "可安排在大須商店街前後。"
  },
  "日本樂高樂園": {
    emoji: "🎢",
    tags: ["親子", "主題樂園", "金城埠頭"],
    description: "日本樂高樂園位於金城埠頭，是適合親子與喜歡積木主題設施的景點。",
    tip: "建議早上入園，下午再接磁浮鐵道館。"
  },
  "磁浮鐵道館": {
    emoji: "🚄",
    tags: ["鐵道", "室內", "親子"],
    description: "磁浮鐵道館展示新幹線、磁浮列車與鐵道歷史，適合與樂高樂園排同一天。",
    tip: "雨天或炎熱時很適合作為室內景點。"
  },
  "名古屋車站 JR Central Towers 展望台": {
    emoji: "🌃",
    tags: ["夜景", "名古屋站", "高樓"],
    description: "位於名古屋車站周邊，適合最後一天採買或晚間安排。",
    tip: "可與名古屋站商圈、百貨一起安排。"
  },
  "青柳總本家": {
    emoji: "🎁",
    tags: ["伴手禮", "青蛙饅頭", "名古屋甜點"],
    description: "青柳總本家是名古屋知名伴手禮品牌，青蛙饅頭是很有代表性的可愛甜點。",
    tip: "適合最後一天採買伴手禮。"
  },
  "熱田蓬萊軒": {
    emoji: "🍱",
    tags: ["鰻魚飯", "名古屋名物", "人氣店"],
    description: "熱田蓬萊軒以鰻魚飯聞名，是名古屋具代表性的美食之一。",
    tip: "用餐熱門時段可能需要排隊。"
  },
  "矢場丼矢場町本店": {
    emoji: "🍚",
    tags: ["味噌豬排", "名古屋名物", "本店"],
    description: "矢場丼是名古屋味噌豬排名店，矢場町本店很適合與大須、榮町行程搭配。",
    tip: "適合作為大須或榮町附近用餐選項。"
  }
};



const LINE_CONTACTS_KEY = "yaoTravelLineContactsV13";

const defaultLineContacts = [
  { name: "堯", lineId: "", note: "團長" },
  { name: "靜雯", lineId: "", note: "團員" },
  { name: "阿胖", lineId: "", note: "團員" },
  { name: "小兒", lineId: "", note: "團員" },
  { name: "靖公", lineId: "", note: "團員" },
  { name: "靖娟", lineId: "", note: "團員" },
  { name: "娟大兒", lineId: "", note: "團員" },
  { name: "小妹", lineId: "", note: "團員" },
  { name: "潔如", lineId: "", note: "團員" },
  { name: "曼寧", lineId: "", note: "團員" },
  { name: "家安", lineId: "", note: "團員" },
  { name: "淑蓉", lineId: "", note: "團員" }
];

function getLineContacts() {
  try {
    const saved = JSON.parse(localStorage.getItem(LINE_CONTACTS_KEY));
    if (Array.isArray(saved) && saved.length > 0) return saved;
  } catch (error) {
    // ignore
  }

  saveLineContacts(defaultLineContacts);
  return [...defaultLineContacts];
}

function saveLineContacts(contacts) {
  localStorage.setItem(LINE_CONTACTS_KEY, JSON.stringify(contacts));
}

function updateLineContact(index) {
  const contacts = getLineContacts();
  const contact = contacts[index];

  if (!contact) return;

  const newId = prompt(
    "請輸入 " + contact.name + " 的 LINE ID\\n\\n注意：網頁版無法直接發起 LINE 通話，但可以開啟 LINE 個人頁或加好友連結。",
    contact.lineId || ""
  );

  if (newId === null) return;

  contacts[index].lineId = newId.trim();
  saveLineContacts(contacts);
  renderLine();

  if (contacts[index].lineId) {
    alert(contact.name + " 的 LINE ID 已儲存。");
  } else {
    alert(contact.name + " 的 LINE ID 已清空。");
  }
}

function openLineContact(index) {
  const contacts = getLineContacts();
  const contact = contacts[index];

  if (!contact) return;

  if (!contact.lineId) {
    alert("尚未設定 " + contact.name + " 的 LINE ID。\\n請切換團長模式後，點選「設定 ID」。");
    return;
  }

  const cleanId = contact.lineId.replace("@", "").trim();

  /*
    LINE 官方網址格式可開啟 LINE 個人頁或加好友頁。
    但瀏覽器無法保證能直接撥打 LINE 通話，這是 LINE App 的限制。
  */
  const lineUrl = "https://line.me/ti/p/~" + encodeURIComponent(cleanId);
  window.open(lineUrl, "_blank");
}

function resetLineContacts() {
  if (!confirm("確定要重設所有 LINE 聯絡人 ID？")) return;
  saveLineContacts(defaultLineContacts);
  renderLine();
}


const FAVORITES_KEY = "yaoTravelFavoritesV12";

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function isFavorite(place) {
  return getFavorites().some(item => item.place === place);
}

function toggleFavorite(place, category) {
  const favorites = getFavorites();
  const index = favorites.findIndex(item => item.place === place);

  if (index >= 0) {
    favorites.splice(index, 1);
    saveFavorites(favorites);
    alert("已從我的收藏移除：" + place);
  } else {
    const detail = getPlaceDetail(place, category);
    favorites.push({
      place,
      category,
      emoji: detail.emoji,
      tags: detail.tags,
      description: detail.description,
      savedAt: new Date().toISOString()
    });
    saveFavorites(favorites);
    alert("已加入我的收藏：" + place);
  }

  renderPlaceDetail(category, place);
}

function removeFavorite(place) {
  const favorites = getFavorites().filter(item => item.place !== place);
  saveFavorites(favorites);
  renderFavorites();
}


roleSelect.addEventListener("change", () => {
  if (roleSelect.value === "leader") {
    const password = prompt("請輸入團長密碼");
    if (password === "720930") {
      isLeader = true;
      document.body.classList.add("leader-mode");
      roleStatus.textContent = "團長模式";
      alert("團長驗證成功");
    } else {
      isLeader = false;
      document.body.classList.remove("leader-mode");
      roleSelect.value = "member";
      roleStatus.textContent = "團員模式";
      alert("密碼錯誤，已切回團員模式");
    }
  } else {
    isLeader = false;
    document.body.classList.remove("leader-mode");
    roleStatus.textContent = "團員模式";
  }
});


function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderHome() {
  homePage.innerHTML = "";
  contentPage.classList.add("hidden");
  homePage.classList.remove("hidden");

  menuItems.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "feature-card";
    btn.type = "button";
    btn.innerHTML = `
      <div class="card-icon-wrap">
        <img src="${item.icon}" class="card-icon-img" alt="${item.title}">
      </div>
      <div class="card-title">${item.title}</div>
      <div class="card-subtitle">${item.subtitle}</div>
    `;
    btn.onclick = () => openModule(item.module);
    homePage.appendChild(btn);
  });
}

function openModule(name) {
  homePage.classList.add("hidden");
  contentPage.classList.remove("hidden");

  contentPage.innerHTML = `
    <button class="back-btn" onclick="renderHome()" type="button">← 返回首頁</button>
    <h2>${name}</h2>
  `;

  if (name === "行程表") renderItinerary();
  else if (name === "通話(LINE)") renderLine();
  else if (name === "景點分類") renderCategories();
  else if (name === "導航") renderNavigation();
  else if (name === "位置分享") renderLocationShare();
  else if (name === "附近景點") renderNearbySpots();
  else if (name === "附近餐廳") renderNearbyRestaurants();
  else if (name === "附近神社") renderNearbyShrines();
  else if (name === "設定") renderSettings();
  else if (name === "我的收藏") renderFavorites();
}

function renderItinerary() {
  const data = getItineraries();

  contentPage.innerHTML += `
    <div class="note">
      團長模式可新增、編輯、刪除行程。修改後會儲存在目前這台裝置的瀏覽器內。
    </div>
    <div class="timeline-actions leader-only" style="margin-bottom:14px;">
      <button class="edit-itinerary-btn" type="button" onclick="resetItineraries()">恢復預設行程</button>
    </div>
  `;

  Object.keys(data).forEach((day, index) => {
    const items = data[day];
    const btn = document.createElement("button");
    btn.className = "day-card";
    btn.type = "button";
    btn.innerHTML = `
      <div class="day-card-top">
        <span class="day-badge">Day ${index + 1}</span>
        <span class="day-title">${day.replace(`Day ${index + 1}：`, "")}</span>
      </div>
      <div class="day-summary">${items.length} 個行程項目・點擊查看時間軸</div>
    `;
    btn.onclick = () => renderDayTimeline(day);
    contentPage.appendChild(btn);
  });
}

function renderDayTimeline(day) {
  const data = getItineraries();
  const items = data[day] || [];

  contentPage.innerHTML = `
    <button class="back-btn" onclick="openModule('行程表')" type="button">← 返回行程表</button>
    <h2>${day}</h2>
    <div class="timeline-actions leader-only" style="margin-bottom:14px;">
      <button class="edit-itinerary-btn" type="button" onclick="addItineraryItem('${escapeQuote(day)}')">新增行程</button>
    </div>
    <div class="timeline"></div>
  `;

  const timeline = contentPage.querySelector(".timeline");

  if (items.length === 0) {
    timeline.innerHTML = `<div class="note">這一天目前沒有行程。團長模式可新增行程。</div>`;
    return;
  }

  items.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "timeline-item";
    row.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <div class="timeline-time">${item.time}</div>
        <div class="timeline-title">${item.title}</div>
        <div class="timeline-place">📍 ${item.place}</div>
        <div class="timeline-actions">
          <button class="map-btn" type="button">Google Maps</button>
          <button class="edit-itinerary-btn leader-only" type="button">編輯</button>
          <button class="delete-itinerary-btn leader-only" type="button">刪除</button>
        </div>
      </div>
    `;

    row.querySelector(".map-btn").onclick = () => openGoogleMap(item.place + " 愛知 名古屋");
    row.querySelector(".edit-itinerary-btn").onclick = () => renderEditItineraryForm(day, index);
    row.querySelector(".delete-itinerary-btn").onclick = () => deleteItineraryItem(day, index);

    timeline.appendChild(row);
  });
}

function renderEditItineraryForm(day, index) {
  const data = getItineraries();
  const item = data[day] && data[day][index];

  if (!item) {
    alert("找不到這筆行程資料。");
    return;
  }

  contentPage.innerHTML = `
    <button class="back-btn" onclick="renderDayTimeline('${escapeQuote(day)}')" type="button">← 返回時間軸</button>
    <h2>編輯行程</h2>

    <div class="edit-form-card">
      <label class="edit-label" for="editTime">時間</label>
      <input id="editTime" class="edit-input" type="text" value="${escapeHtml(item.time)}" placeholder="例如：09:00 - 10:00">

      <label class="edit-label" for="editTitle">行程內容</label>
      <textarea id="editTitle" class="edit-textarea" rows="4" placeholder="請輸入行程內容">${escapeHtml(item.title)}</textarea>

      <label class="edit-label" for="editPlace">Google Maps 搜尋地點</label>
      <input id="editPlace" class="edit-input" type="text" value="${escapeHtml(item.place)}" placeholder="例如：名古屋城">

      <div class="edit-form-actions">
        <button class="save-edit-btn" type="button" onclick="saveEditItineraryForm('${escapeQuote(day)}', ${index})">儲存</button>
        <button class="cancel-edit-btn" type="button" onclick="renderDayTimeline('${escapeQuote(day)}')">取消</button>
      </div>
    </div>
  `;
}


function renderLine() {
  const contacts = getLineContacts();

  contentPage.innerHTML += `
    <div class="note">
      LINE 功能已升級為正式聯絡人設定版。<br>
      團員可以點選聯絡人開啟 LINE 個人頁；團長模式可設定或修改每個人的 LINE ID。<br>
      <strong>提醒：</strong>網頁版無法保證直接撥打 LINE 通話，這是 LINE App 的限制。
    </div>
  `;

  const tools = document.createElement("div");
  tools.className = "line-tools";
  tools.innerHTML = `
    <button class="line-tool-btn leader-only" type="button" onclick="resetLineContacts()">重設 LINE ID</button>
  `;
  contentPage.appendChild(tools);

  const grid = document.createElement("div");
  grid.className = "line-contact-grid";

  contacts.forEach((contact, index) => {
    const btn = document.createElement("div");
    btn.className = "line-contact-card";

    const hasId = contact.lineId && contact.lineId.trim() !== "";

    btn.innerHTML = `
      <div class="line-avatar">${contact.name.charAt(0)}</div>
      <div class="line-contact-name">${contact.name}</div>
      <div class="line-contact-note">${contact.note || "團員"}</div>
      <div class="line-id-status ${hasId ? "line-ready" : "line-empty"}">
        ${hasId ? "已設定 LINE ID" : "尚未設定 ID"}
      </div>
      <div class="line-actions">
        <button class="line-open-btn" type="button">開啟 LINE</button>
        <button class="line-edit-btn leader-only" type="button">設定 ID</button>
      </div>
    `;

    btn.querySelector(".line-open-btn").onclick = () => openLineContact(index);
    btn.querySelector(".line-edit-btn").onclick = () => updateLineContact(index);

    grid.appendChild(btn);
  });

  contentPage.appendChild(grid);
}


function renderCategories() {
  contentPage.innerHTML += `<div class="note">選擇分類後，可以查看地點資料頁與 Google Maps 導航。</div>`;

  Object.keys(categories).forEach(category => {
    const meta = placeCategoryMeta[category] || { icon: "📍", summary: "查看此分類地點" };
    const btn = document.createElement("button");
    btn.className = "category-card";
    btn.type = "button";
    btn.innerHTML = `
      <div class="category-row">
        <span class="category-icon">${meta.icon}</span>
        <div class="category-info">
          <div class="category-title">${category}</div>
          <div class="category-summary">${meta.summary}・${categories[category].length} 個地點</div>
        </div>
      </div>
    `;
    btn.onclick = () => renderPlaceList(category);
    contentPage.appendChild(btn);
  });
}

function renderPlaceList(category) {
  contentPage.innerHTML = `
    <button class="back-btn" onclick="openModule('景點分類')" type="button">← 返回分類</button>
    <h2>${category}</h2>
    <div class="place-list"></div>
  `;

  const list = contentPage.querySelector(".place-list");

  categories[category].forEach(place => {
    const detail = getPlaceDetail(place, category);
    const btn = document.createElement("button");
    btn.className = "place-card";
    btn.type = "button";
    btn.innerHTML = `
      <div class="place-card-top">
        <span class="place-emoji">${detail.emoji}</span>
        <div class="place-card-main">
          <div class="place-name">${place}</div>
          <div class="place-tags">
            ${detail.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join("")}
          </div>
          <div class="place-desc">${detail.description}</div>
        </div>
      </div>
    `;
    btn.onclick = () => renderPlaceDetail(category, place);
    list.appendChild(btn);
  });
}

function renderPlaceDetail(category, place) {
  const detail = getPlaceDetail(place, category);

  contentPage.innerHTML = `
    <button class="back-btn" onclick="renderPlaceList('${escapeQuote(category)}')" type="button">← 返回${category}</button>

    <div class="place-detail-hero">
      <div class="place-detail-title-row">
        <span class="place-detail-emoji">${detail.emoji}</span>
        <div class="place-detail-title">${place}</div>
      </div>

      <div class="place-tags">
        ${detail.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
      </div>

      <div class="place-section">
        <div class="place-section-title">景點說明</div>
        <div class="place-section-text">${detail.description}</div>
      </div>

      <div class="place-section">
        <div class="place-section-title">行程建議</div>
        <div class="place-section-text">${detail.tip}</div>
      </div>

      <div class="place-actions">
        <button class="place-main-btn" type="button" onclick="openGoogleMap('${escapeQuote(place)} 愛知 名古屋')">Google Maps 導航</button>
        <button class="favorite-btn" type="button" onclick="toggleFavorite('${escapeQuote(place)}', '${escapeQuote(category)}')">
          ${isFavorite(place) ? "取消收藏" : "加入收藏"}
        </button>
        <button class="place-secondary-btn leader-only" type="button" onclick="alert('V12 先顯示團長專用編輯入口。下一階段可加入真正修改與儲存功能。')">團長編輯</button>
      </div>
    </div>
  `;
}

function getPlaceDetail(place, category) {
  if (placeDetails[place]) {
    return placeDetails[place];
  }

  const meta = placeCategoryMeta[category] || { icon: "📍" };

  const fallbackDescriptions = {
    "觀光景點": "這是本次名古屋旅遊可安排的觀光景點，適合依照路線與當日體力彈性加入行程。",
    "古蹟": "這是具歷史感的地點，適合搭配周邊商店街或其他文化景點一起安排。",
    "購物商場": "這是可安排採買、逛街或休息的地點，適合放在行程後段或雨天備案。",
    "神社": "這是可安排參拜、收集御守或御朱印的地點，適合與周邊景點一起順遊。",
    "美食店家": "這是本次旅程可參考的餐飲選項，建議依照當日位置與排隊狀況彈性調整。",
    "伴手禮": "這是適合採買伴手禮的選項，可安排於最後一天或車站周邊採買時段。"
  };

  const fallbackTags = {
    "觀光景點": ["觀光", "拍照", "順遊"],
    "古蹟": ["歷史", "文化", "散策"],
    "購物商場": ["購物", "商圈", "採買"],
    "神社": ["參拜", "御守", "御朱印"],
    "美食店家": ["美食", "用餐", "名古屋"],
    "伴手禮": ["伴手禮", "甜點", "採買"]
  };

  return {
    emoji: meta.icon || "📍",
    tags: fallbackTags[category] || ["推薦", "名古屋", "旅遊"],
    description: fallbackDescriptions[category] || "這是本次旅程可安排的地點，適合依照路線與時間彈性調整。",
    tip: "建議點選 Google Maps 確認營業時間、交通方式與即時評價。"
  };
}

function renderNavigation() {
  const places = ["名古屋櫻通口LiVEMAX飯店", "中部國際機場", "名古屋城", "犬山城", "熱田神宮", "日本樂高樂園", "大須商店街", "綠洲21", "名古屋車站"];
  contentPage.innerHTML += `<div class="note">請選擇常用導航目的地。</div>`;
  const grid = document.createElement("div");
  grid.className = "content-grid";

  places.forEach(place => {
    const btn = document.createElement("button");
    btn.className = "small-card";
    btn.type = "button";
    btn.textContent = place;
    btn.onclick = () => openGoogleNavigation(place);
    grid.appendChild(btn);
  });

  contentPage.appendChild(grid);
}

function renderLocationShare() {
  contentPage.innerHTML += `<div class="note">免費前端版目前可開啟 Google Maps。<br>若要顯示所有團員即時定位，需要下一階段加入 Firebase。</div>`;
  const btn = document.createElement("button");
  btn.className = "list-btn";
  btn.type = "button";
  btn.textContent = "開啟 Google Maps";
  btn.onclick = () => window.open("https://www.google.com/maps", "_blank");
  contentPage.appendChild(btn);
}

function renderNearbySpots() {
  renderNearbySearchButtons(["附近室內旅遊景點 評分3以上", "附近室外旅遊景點 評分3以上", "附近觀光景點", "附近博物館", "附近公園"]);
}

function renderNearbyRestaurants() {
  renderNearbySearchButtons(["附近餐廳 評分3以上", "附近名古屋美食", "附近鰻魚飯", "附近燒肉", "附近咖啡廳"]);
}

function renderNearbyShrines() {
  renderNearbySearchButtons(["附近神社 御守", "附近神社 御朱印", "附近特色神社", "附近寺廟", "附近熱田神宮"]);
}

function renderNearbySearchButtons(options) {
  contentPage.innerHTML += `<div class="note">點選後會開啟 Google Maps，依照你手機目前位置搜尋。</div>`;
  const grid = document.createElement("div");
  grid.className = "content-grid";

  options.forEach(query => {
    const btn = document.createElement("button");
    btn.className = "small-card";
    btn.type = "button";
    btn.textContent = query;
    btn.onclick = () => openGoogleMap(query);
    grid.appendChild(btn);
  });

  contentPage.appendChild(grid);
}

function renderFavorites() {
  const favorites = getFavorites();

  if (favorites.length === 0) {
    contentPage.innerHTML += `
      <div class="note">
        目前還沒有收藏。<br>
        請到「景點分類」裡面的地點詳情頁，點選「加入收藏」。
      </div>
    `;
    return;
  }

  contentPage.innerHTML += `
    <div class="note">
      已收藏 ${favorites.length} 個地點。收藏資料會儲存在目前這台裝置的瀏覽器內。
    </div>
    <div class="favorites-list"></div>
  `;

  const list = contentPage.querySelector(".favorites-list");

  favorites.forEach(item => {
    const card = document.createElement("div");
    card.className = "favorite-card";
    card.innerHTML = `
      <div class="favorite-top">
        <span class="favorite-emoji">${item.emoji || "📍"}</span>
        <div class="favorite-main">
          <div class="favorite-title">${item.place}</div>
          <div class="favorite-category">分類：${item.category}</div>
          <div class="place-tags">
            ${(item.tags || []).slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join("")}
          </div>
          <div class="favorite-desc">${item.description || "已加入收藏的地點。"}</div>
        </div>
      </div>
      <div class="favorite-actions">
        <button class="place-main-btn" type="button">Google Maps</button>
        <button class="place-secondary-btn" type="button">查看詳情</button>
        <button class="remove-favorite-btn" type="button">移除</button>
      </div>
    `;

    card.querySelector(".place-main-btn").onclick = () => openGoogleMap(item.place + " 愛知 名古屋");
    card.querySelector(".place-secondary-btn").onclick = () => renderPlaceDetail(item.category, item.place);
    card.querySelector(".remove-favorite-btn").onclick = () => {
      if (confirm("確定要移除收藏：" + item.place + "？")) {
        removeFavorite(item.place);
      }
    };

    list.appendChild(card);
  });
}

function renderSettings() {
  contentPage.innerHTML += `<div class="note">APP名稱：堯的旅遊小助手 test1.5<br>目前模式：免費網頁版 PWA<br>團長密碼：720930<br>目的地：愛知縣、名古屋</div>`;
}

function openGoogleMap(query) {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  window.open(url, "_blank");
}

function openGoogleNavigation(destination) {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=transit`;
  window.open(url, "_blank");
}

function escapeQuote(text) {
  return String(text).replace(/'/g, "\\'");
}

renderHome();
