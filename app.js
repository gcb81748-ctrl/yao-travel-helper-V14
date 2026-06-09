console.log("V29_CLEAN_LINE_CONTACT_CENTER app.js loaded");
/*
  V27 程式碼整理穩定版
  基礎：使用者已測試成功的 V26
  保留：密碼門禁、Firebase、行程表、團員定位、行前倒數、附近探索中心
*/


/* ===== V25 網站密碼門禁 ===== */
const SITE_PASSWORD = "1017";
const PASSWORD_SESSION_KEY = "yaoTravelPasswordPassedV25";

function unlockSite() {
  document.body.classList.add("site-unlocked");
  const gate = document.getElementById("passwordGate");
  if (gate) gate.classList.add("password-gate-hidden");
}

function checkSitePassword() {
  const input = document.getElementById("passwordInput");
  const error = document.getElementById("passwordError");
  const value = input ? input.value.trim() : "";

  if (value === SITE_PASSWORD) {
    sessionStorage.setItem(PASSWORD_SESSION_KEY, "true");
    unlockSite();
    return;
  }

  if (error) error.textContent = "密碼錯誤，請重新輸入。";
  if (input) {
    input.value = "";
    input.focus();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("passwordButton");
  const input = document.getElementById("passwordInput");

  if (sessionStorage.getItem(PASSWORD_SESSION_KEY) === "true") {
    unlockSite();
    return;
  }

  if (button) button.addEventListener("click", checkSitePassword);
  if (input) {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") checkSitePassword();
    });
    setTimeout(() => input.focus(), 300);
  }
});

let isLeader = false;

const homePage = document.getElementById("homePage");
const contentPage = document.getElementById("contentPage");
const roleSelect = document.getElementById("roleSelect");
const roleStatus = document.getElementById("roleStatus");

const tripInfo = {
  destination: "愛知縣、名古屋",
  tripName: "名古屋五天四夜",
  startDate: "2026-06-19T09:00:00+08:00",
  endDate: "2026-06-23T15:50:00+08:00",
  outboundFlight: "IT206",
  returnFlight: "IT207",
  hotel: "名古屋櫻通口LiVEMAX飯店"
};

function getCountdownParts(targetDateText) {
  const now = new Date();
  const target = new Date(targetDateText);
  const diff = target.getTime() - now.getTime();

  if (Number.isNaN(target.getTime())) {
    return { days: 0, hours: 0, minutes: 0, status: "日期設定錯誤" };
  }

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, status: "旅程已開始" };
  }

  const totalMinutes = Math.floor(diff / 1000 / 60);
  const days = Math.floor(totalMinutes / 60 / 24);
  const hours = Math.floor((totalMinutes - days * 24 * 60) / 60);
  const minutes = totalMinutes % 60;

  return { days, hours, minutes, status: "距離出發" };
}

function formatTripDateRange() {
  return "2026/06/19 ～ 2026/06/23";
}

function renderCountdownCenter() {
  const countdown = getCountdownParts(tripInfo.startDate);

  return `
    <section class="countdown-center">
      <div class="countdown-main">
        <div class="countdown-label">✈️ ${countdown.status}</div>
        <div class="countdown-number">${countdown.days}</div>
        <div class="countdown-unit">天</div>
        <div class="countdown-time">${countdown.hours} 小時 ${countdown.minutes} 分鐘</div>
      </div>

      <div class="trip-summary-card">
        <div class="trip-summary-title">${tripInfo.tripName}</div>
        <div class="trip-summary-subtitle">${tripInfo.destination}</div>
        <div class="trip-summary-date">${formatTripDateRange()}</div>
      </div>

      <div class="trip-mini-grid">
        <button class="trip-mini-card" type="button" onclick="openGoogleMap('${tripInfo.hotel}')">
          <span>🏨</span>
          <strong>飯店</strong>
          <small>LiVEMAX 櫻通口</small>
        </button>

        <button class="trip-mini-card" type="button" onclick="openGoogleMap('中部國際機場')">
          <span>🛫</span>
          <strong>去程 ${tripInfo.outboundFlight}</strong>
          <small>06/19 09:00</small>
        </button>

        <button class="trip-mini-card" type="button" onclick="openGoogleMap('中部國際機場')">
          <span>🛬</span>
          <strong>回程 ${tripInfo.returnFlight}</strong>
          <small>06/23 13:45</small>
        </button>
      </div>
    </section>
  `;
}

function renderWeatherShortcuts() {
  contentPage.innerHTML += `
    <div class="countdown-detail-card">
      <h3>☀️ 天氣快捷</h3>
      <p>點選後會開啟 Google 搜尋天氣資訊。</p>
      <div class="weather-grid">
        <button type="button" onclick="openWeatherSearch('名古屋 天氣')">名古屋天氣</button>
        <button type="button" onclick="openWeatherSearch('犬山 天氣')">犬山天氣</button>
        <button type="button" onclick="openWeatherSearch('LEGOLAND Japan 天氣')">樂高樂園天氣</button>
        <button type="button" onclick="openWeatherSearch('中部國際機場 天氣')">中部機場天氣</button>
      </div>
    </div>
  `;
}

function openWeatherSearch(query) {
  window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
}

function renderCountdownDetail() {
  const countdown = getCountdownParts(tripInfo.startDate);

  contentPage.innerHTML += `
    <div class="countdown-detail-card">
      <h3>✈️ 行前倒數</h3>
      <div class="big-countdown-row">
        <span>${countdown.days}</span>
        <strong>天</strong>
        <small>${countdown.hours} 小時 ${countdown.minutes} 分鐘</small>
      </div>
    </div>

    <div class="countdown-detail-card">
      <h3>🧳 旅遊資訊</h3>
      <div class="info-list">
        <div><span>目的地</span><strong>${tripInfo.destination}</strong></div>
        <div><span>旅遊日期</span><strong>${formatTripDateRange()}</strong></div>
        <div><span>飯店</span><strong>${tripInfo.hotel}</strong></div>
        <div><span>去程航班</span><strong>${tripInfo.outboundFlight}｜06/19 09:00 → 12:55</strong></div>
        <div><span>回程航班</span><strong>${tripInfo.returnFlight}｜06/23 13:45 → 15:50</strong></div>
      </div>
    </div>
  `;

  renderWeatherShortcuts();
}


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
    title: "行前倒數",
    subtitle: "出發資訊中心",
    icon: "./assets/icons/icon-navigation.png",
    module: "行前倒數"
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
let itineraryCache = null;
let cloudSyncReady = false;
let realtimeUnsubscribe = null;
let currentOpenDay = null;
let isEditingItinerary = false;
let lastCloudSignature = ""; 

function deepCopy(data) {
  return JSON.parse(JSON.stringify(data));
}

function getLocalItineraries() {
  try {
    const saved = JSON.parse(localStorage.getItem(ITINERARY_KEY));
    if (saved && typeof saved === "object") return saved;
  } catch (error) {
    console.warn("讀取本機行程失敗，改用預設行程。", error);
  }

  return deepCopy(itineraries);
}

function getItineraries() {
  if (!itineraryCache) {
    itineraryCache = getLocalItineraries();
  }

  return itineraryCache;
}

function saveItineraries(data) {
  itineraryCache = data;
  localStorage.setItem(ITINERARY_KEY, JSON.stringify(data));

  if (typeof window.cloudSaveItineraries === "function") {
    window.cloudSaveItineraries(data)
      .then(() => {
        cloudSyncReady = true;
        lastCloudSignature = JSON.stringify(data);
        updateSyncStatus("☁️ 已同步到 Firebase");
        console.log("Firebase 行程同步成功");
      })
      .catch((error) => {
        cloudSyncReady = false;
        console.error("Firebase 行程同步失敗：", error);
        alert("本機已儲存，但 Firebase 雲端同步失敗。請檢查網路或 Firestore 規則。");
      });
  }
}

async function initializeItineraries() {
  itineraryCache = getLocalItineraries();

  if (typeof window.cloudGetItineraries !== "function") {
    console.warn("firebase.js 尚未載入，使用本機行程。");
    return;
  }

  try {
    const cloudData = await window.cloudGetItineraries();

    if (cloudData && typeof cloudData === "object") {
      itineraryCache = cloudData;
      lastCloudSignature = JSON.stringify(cloudData);
      localStorage.setItem(ITINERARY_KEY, JSON.stringify(cloudData));
      cloudSyncReady = true;
      console.log("已從 Firebase 讀取行程。");
    } else {
      await window.cloudSaveItineraries(itineraryCache);
      cloudSyncReady = true;
      console.log("Firebase 尚無行程，已建立第一份雲端行程。");
    }
  } catch (error) {
    cloudSyncReady = false;
    console.error("Firebase 讀取失敗，使用本機行程：", error);
  }
}

function resetItineraries() {
  if (!confirm("確定要恢復預設行程？目前已修改的行程會被覆蓋。")) return;
  const defaultData = deepCopy(itineraries);
  saveItineraries(defaultData);
  alert("已恢復預設行程，並嘗試同步到 Firebase。");
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
  alert("行程已儲存，並嘗試同步到 Firebase。");
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
  currentOpenDay = null;
  isEditingItinerary = false;
  homePage.innerHTML = renderCountdownCenter();
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
  currentOpenDay = null;
  isEditingItinerary = false;
  homePage.classList.add("hidden");
  contentPage.classList.remove("hidden");

  contentPage.innerHTML = `
    <button class="back-btn" onclick="renderHome()" type="button">← 返回首頁</button>
    <h2>${name}</h2>
  `;

    if (name === "聯絡(LINE)" || name === "聯絡 LINE" || name === "LINE聯絡" || name === "LINE 聯絡" || name === "聯絡人") {
    renderV29LineContactCenter();
    return;
  }

if (name === "行前倒數") renderCountdownDetail();
  else if (name === "行程表") renderItinerary();
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





const FIXED_DAY_ORDER = [
  "Day 1：抵達・榮町之夜",
  "Day 2：武士與書香 (週六)",
  "Day 3：古意犬山・千年神宮 (週日)",
  "Day 4：樂高樂園・冒險之日",
  "Day 5：最後採買・歸途"
];

function normalizeDayTitle(dayTitle) {
  return String(dayTitle || "").replace(/\s+/g, " ").trim();
}

function getDayNumberFromTitle(dayTitle) {
  const match = normalizeDayTitle(dayTitle).match(/Day\s*(\d+)/i);
  return match ? Number(match[1]) : 999;
}

function getDayDisplayTitle(dayTitle) {
  return normalizeDayTitle(dayTitle).replace(/^Day\s*\d+\s*[：:]\s*/, "");
}

function getOrderedDayKeys(data) {
  const keys = Object.keys(data || {});
  const used = new Set();
  const result = [];

  FIXED_DAY_ORDER.forEach(expected => {
    const expectedNo = getDayNumberFromTitle(expected);
    const found = keys.find(key => getDayNumberFromTitle(key) === expectedNo);
    if (found) {
      result.push(found);
      used.add(found);
    }
  });

  keys
    .filter(key => !used.has(key))
    .sort((a, b) => getDayNumberFromTitle(a) - getDayNumberFromTitle(b))
    .forEach(key => result.push(key));

  return result;
}

function renderItinerary() {
  const data = getItineraries();

  contentPage.innerHTML += `
    <div class="note">
      團長模式可新增、編輯、刪除行程。修改後會先儲存在本機，並同步到 Firebase 雲端。
    </div>
    <div class="timeline-actions leader-only" style="margin-bottom:14px;">
      <button class="edit-itinerary-btn" type="button" onclick="resetItineraries()">恢復預設行程</button>
    </div>
  `;

  getOrderedDayKeys(data).forEach((day) => {
    const items = data[day] || [];
    const dayNumber = getDayNumberFromTitle(day);

    const btn = document.createElement("button");
    btn.className = "day-card";
    btn.type = "button";
    btn.innerHTML = `
      <div class="day-card-top">
        <span class="day-badge">Day ${dayNumber}</span>
        <span class="day-title">${getDayDisplayTitle(day)}</span>
      </div>
      <div class="day-summary">${items.length} 個行程項目・點擊查看時間軸</div>
    `;
    btn.onclick = () => renderDayTimeline(day);
    contentPage.appendChild(btn);
  });
}

function renderDayTimeline(day) {
  currentOpenDay = day;
  isEditingItinerary = false;

  const data = getItineraries();
  const items = data[day] || [];

  contentPage.innerHTML = `
    <button class="back-btn" onclick="openModule('行程表')" type="button">← 返回行程表</button>
    <h2>${day}</h2>
    <div class="sync-status" id="syncStatus">☁️ Firebase 即時同步已啟用</div>
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
  isEditingItinerary = true;
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


const MEMBER_LOCATION_KEY = "yaoTravelSelectedMemberV20";
let memberLocationUnsubscribe = null;
let latestMemberLocations = [];

const locationMembers = [
  "堯", "靜雯", "阿胖", "小兒", "靖公", "靖娟",
  "娟大兒", "小妹", "潔如", "曼寧", "家安", "淑蓉"
];

function getSelectedMemberName() {
  return localStorage.getItem(MEMBER_LOCATION_KEY) || "";
}

function saveSelectedMemberName(name) {
  localStorage.setItem(MEMBER_LOCATION_KEY, name);
}

function formatLocationTime(value) {
  if (!value) return "尚無更新時間";

  let date;

  if (value.toDate && typeof value.toDate === "function") {
    date = value.toDate();
  } else if (typeof value === "string" || typeof value === "number") {
    date = new Date(value);
  } else {
    return "剛剛更新";
  }

  if (Number.isNaN(date.getTime())) return "剛剛更新";

  return date.toLocaleString("zh-TW", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function startMemberLocationListener() {
  if (typeof window.cloudListenMemberLocations !== "function") {
    console.warn("Firebase memberLocations 監聽尚未載入。");
    return;
  }

  if (memberLocationUnsubscribe) {
    memberLocationUnsubscribe();
    memberLocationUnsubscribe = null;
  }

  memberLocationUnsubscribe = window.cloudListenMemberLocations(
    (members) => {
      latestMemberLocations = members || [];
      renderMemberLocationList();
    },
    (error) => {
      console.error("團員定位同步失敗：", error);
      const list = document.getElementById("memberLocationList");
      if (list) {
        list.innerHTML = `<div class="note">Firebase 團員定位同步失敗，請檢查網路或 Firestore 規則。</div>`;
      }
    }
  );
}

function updateMyLocation() {
  const select = document.getElementById("memberNameSelect");
  const memberName = select ? select.value : "";

  if (!memberName) {
    alert("請先選擇你是哪一位團員。");
    return;
  }

  saveSelectedMemberName(memberName);

  if (!navigator.geolocation) {
    alert("此裝置不支援定位功能。");
    return;
  }

  const status = document.getElementById("locationStatus");
  if (status) status.textContent = "正在取得 GPS 位置...";

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const locationData = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy
      };

      try {
        if (typeof window.cloudSaveMemberLocation !== "function") {
          throw new Error("Firebase 定位儲存功能尚未載入");
        }

        await window.cloudSaveMemberLocation(memberName, locationData);

        if (status) {
          status.textContent = `已更新 ${memberName} 的位置，精準度約 ${Math.round(locationData.accuracy || 0)} 公尺。`;
        }

        alert("位置已更新到 Firebase。");
      } catch (error) {
        console.error("位置上傳失敗：", error);
        if (status) status.textContent = "位置取得成功，但上傳 Firebase 失敗。";
        alert("位置取得成功，但上傳 Firebase 失敗。請檢查 Firestore 規則。");
      }
    },
    (error) => {
      console.error("取得定位失敗：", error);
      if (status) status.textContent = "取得定位失敗。請確認手機定位權限已開啟。";
      alert("取得定位失敗。請確認 Safari / 瀏覽器允許定位。");
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 30000
    }
  );
}

function openMemberLocationMap(lat, lng, name) {
  const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  window.open(url, "_blank");
}

function openAllMemberLocationsMap() {
  const valid = latestMemberLocations.filter(member => member.lat && member.lng);

  if (valid.length === 0) {
    alert("目前沒有任何團員位置。");
    return;
  }

  const first = valid[0];
  const url = `https://www.google.com/maps/search/?api=1&query=${first.lat},${first.lng}`;
  window.open(url, "_blank");
}

async function clearAllMemberLocations() {
  if (!confirm("確定要清除所有團員定位資料？")) return;

  try {
    if (typeof window.cloudClearMemberLocations !== "function") {
      throw new Error("Firebase 清除定位功能尚未載入");
    }

    await window.cloudClearMemberLocations();
    alert("已清除所有團員定位資料。");
  } catch (error) {
    console.error("清除定位失敗：", error);
    alert("清除定位失敗，請檢查 Firebase 設定。");
  }
}

function renderMemberLocationList() {
  const list = document.getElementById("memberLocationList");
  if (!list) return;

  const sortedMembers = [...latestMemberLocations].sort((a, b) => {
    return locationMembers.indexOf(a.name) - locationMembers.indexOf(b.name);
  });

  if (sortedMembers.length === 0) {
    list.innerHTML = `<div class="note">目前尚未有團員更新位置。</div>`;
    return;
  }

  list.innerHTML = "";

  sortedMembers.forEach(member => {
    const hasLocation = member.lat && member.lng;
    const card = document.createElement("div");
    card.className = "member-location-card";
    card.innerHTML = `
      <div class="member-location-top">
        <div class="member-location-avatar">${String(member.name || "?").charAt(0)}</div>
        <div class="member-location-main">
          <div class="member-location-name">${member.name || "未命名團員"}</div>
          <div class="member-location-time">最後更新：${formatLocationTime(member.updatedAt)}</div>
          <div class="member-location-coord">
            ${hasLocation ? `座標：${Number(member.lat).toFixed(5)}, ${Number(member.lng).toFixed(5)}` : "尚無座標"}
          </div>
        </div>
      </div>
      <div class="member-location-actions">
        <button class="member-map-btn" type="button" ${hasLocation ? "" : "disabled"}>Google Maps</button>
      </div>
    `;

    const mapBtn = card.querySelector(".member-map-btn");
    mapBtn.onclick = () => openMemberLocationMap(member.lat, member.lng, member.name);

    list.appendChild(card);
  });
}


/* ===== V29 CLEAN LINE CONTACT CENTER ===== */
const v29LineContacts = [
  { name: "堯", lineId: "love720930", role: "團長" },
  { name: "靜雯", lineId: "0953310753", role: "團員" },
  { name: "阿胖", lineId: "yao_0615", role: "團員" },
  { name: "靖娟ㄤ", lineId: "sn1204s", role: "團員" },
  { name: "靖娟", lineId: "jeantsai19", role: "團員" },
  { name: "靖娟兒", lineId: "gao0308de", role: "團員" },
  { name: "潔茹", lineId: "02029519", role: "團員" },
  { name: "曼寧", lineId: "manninglee", role: "團員" },
  { name: "嘉安", lineId: "ann9050", role: "團員" },
  { name: "淑蓉", lineId: "sande0722", role: "團員" }
];

function v29CopyText(text, label) {
  if (!text) {
    alert("尚未設定 LINE ID。");
    return;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => alert(`已複製${label || "內容"}：${text}`))
      .catch(() => v29FallbackCopyText(text, label));
    return;
  }

  v29FallbackCopyText(text, label);
}

function v29FallbackCopyText(text, label) {
  const input = document.createElement("input");
  input.value = text;
  input.setAttribute("readonly", "readonly");
  input.style.position = "fixed";
  input.style.top = "-1000px";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
  alert(`已複製${label || "內容"}：${text}`);
}

function v29OpenLine(lineId) {
  if (!lineId) {
    alert("尚未設定 LINE ID。");
    return;
  }

  v29CopyText(lineId, " LINE ID");

  setTimeout(() => {
    window.location.href = "line://nv/addFriends";
  }, 350);
}

function v29FilterLineContacts() {
  const input = document.getElementById("v29LineSearch");
  const keyword = input ? input.value.trim().toLowerCase() : "";
  document.querySelectorAll(".v29-line-card").forEach(card => {
    const search = (card.dataset.search || "").toLowerCase();
    card.style.display = search.includes(keyword) ? "" : "none";
  });
}

function v29ShowLineNotice() {
  alert("LINE 官方不保證可用 LINE ID 直接撥打或直接開啟聊天。本功能採用最穩定方式：先複製 LINE ID，再嘗試開啟 LINE。進入 LINE 後請貼上 ID 搜尋對方。");
}

function renderV29LineContactCenter() {
  contentPage.innerHTML += `
    <section class="v29-line-shell">
      <div class="v29-line-head">
        <div>
          <div class="v29-line-badge">LINE 聯絡名單</div>
          <h2>聯絡(LINE)</h2>
          <p>固定名單版，已移除舊版團長手動輸入欄位。點選複製後可到 LINE 搜尋。</p>
        </div>
        <button class="v29-line-notice-btn" type="button" onclick="v29ShowLineNotice()">說明</button>
      </div>

      <div class="v29-line-search-wrap">
        <input id="v29LineSearch" class="v29-line-search" type="text" placeholder="搜尋姓名或 LINE ID" oninput="v29FilterLineContacts()">
      </div>

      <div class="v29-line-list">
        ${v29LineContacts.map(person => `
          <article class="v29-line-card" data-search="${person.name} ${person.lineId} ${person.role}">
            <div class="v29-line-avatar">${person.name.slice(0, 1)}</div>
            <div class="v29-line-main">
              <div class="v29-line-name-row">
                <strong>${person.name}</strong>
                <span>${person.role}</span>
              </div>
              <div class="v29-line-id">LINE ID：${person.lineId}</div>
              <div class="v29-line-actions">
                <button type="button" onclick="v29CopyText('${person.lineId}', ' LINE ID')">複製 ID</button>
                <button type="button" onclick="v29OpenLine('${person.lineId}')">開啟 LINE</button>
              </div>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderLocationShare() {
  const selectedMember = getSelectedMemberName();

  contentPage.innerHTML += `
    <div class="location-share-panel">
      <div class="location-share-title">📍 團員定位分享</div>
      <div class="location-share-desc">
        請先選擇自己的名字，再按「更新我的位置」。其他團員會透過 Firebase 看到你的最後位置。
      </div>

      <label class="location-label" for="memberNameSelect">我是誰？</label>
      <select id="memberNameSelect" class="location-select">
        <option value="">請選擇團員</option>
        ${locationMembers.map(name => `<option value="${name}" ${selectedMember === name ? "selected" : ""}>${name}</option>`).join("")}
      </select>

      <div id="locationStatus" class="location-status">尚未更新位置</div>

      <div class="location-actions">
        <button class="update-location-btn" type="button" onclick="updateMyLocation()">更新我的位置</button>
        <button class="all-location-btn" type="button" onclick="openAllMemberLocationsMap()">開啟最近一位位置</button>
        <button class="clear-location-btn leader-only" type="button" onclick="clearAllMemberLocations()">團長清除定位</button>
      </div>
    </div>

    <div class="location-share-panel">
      <div class="location-share-title">👥 團員目前位置</div>
      <div class="location-share-desc">
        此頁會即時顯示團員最後更新的位置。網頁版無法背景持續定位，請團員需要時手動更新。
      </div>
      <div id="memberLocationList" class="member-location-list">
        <div class="note">正在讀取團員位置...</div>
      </div>
    </div>
  `;

  startMemberLocationListener();
}


/* ===== V26 附近探索中心：重製版 ===== */
function openV26MapsSearch(query) {
  const fallbackQuery = `${query} 愛知 名古屋`;

  if (!navigator.geolocation) {
    openGoogleMap(fallbackQuery);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const url = `https://www.google.com/maps/search/${encodeURIComponent(query)}/@${lat},${lng},16z`;
      window.open(url, "_blank");
    },
    () => {
      alert("無法取得目前位置，將改用名古屋地區搜尋。");
      openGoogleMap(fallbackQuery);
    },
    {
      enableHighAccuracy: true,
      timeout: 12000,
      maximumAge: 60000
    }
  );
}

function renderV26NearbyExploreCenter(type) {
  const configs = {
    spots: {
      title: "附近景點",
      subtitle: "依照目前位置直接開啟 Google Maps 搜尋附近景點。",
      main: { icon: "📍", label: "搜尋目前位置附近景點", query: "附近 景點" },
      groups: [
        {
          title: "快速探索",
          items: [
            { icon: "🏯", label: "附近景點", query: "附近 景點" },
            { icon: "⭐", label: "高評價景點", query: "附近 旅遊景點 評分4以上" },
            { icon: "☔", label: "室內景點", query: "附近 室內景點" },
            { icon: "📸", label: "拍照景點", query: "附近 拍照景點" }
          ]
        },
        {
          title: "散步購物",
          items: [
            { icon: "🌸", label: "公園散步", query: "附近 公園" },
            { icon: "🛍️", label: "購物商場", query: "附近 購物商場" },
            { icon: "🏛️", label: "博物館", query: "附近 博物館" },
            { icon: "🌃", label: "夜景景點", query: "附近 夜景 景點" }
          ]
        }
      ]
    },
    restaurants: {
      title: "附近餐廳",
      subtitle: "依照目前位置搜尋附近餐廳、咖啡廳與名古屋美食。",
      main: { icon: "🍽️", label: "搜尋目前位置附近餐廳", query: "附近 餐廳" },
      groups: [
        {
          title: "熱門餐食",
          items: [
            { icon: "🍽️", label: "附近餐廳", query: "附近 餐廳" },
            { icon: "⭐", label: "高評價餐廳", query: "附近 餐廳 評分4以上" },
            { icon: "🍜", label: "拉麵", query: "附近 拉麵" },
            { icon: "🥩", label: "燒肉", query: "附近 燒肉" }
          ]
        },
        {
          title: "名古屋美食",
          items: [
            { icon: "🍱", label: "鰻魚飯", query: "附近 鰻魚飯" },
            { icon: "🍛", label: "味噌豬排", query: "附近 味噌豬排" },
            { icon: "☕", label: "咖啡廳", query: "附近 咖啡廳" },
            { icon: "🍰", label: "甜點", query: "附近 甜點" }
          ]
        }
      ]
    },
    shrines: {
      title: "附近神社",
      subtitle: "依照目前位置搜尋附近神社、寺院、御守與御朱印。",
      main: { icon: "⛩️", label: "搜尋目前位置附近神社", query: "附近 神社" },
      groups: [
        {
          title: "參拜搜尋",
          items: [
            { icon: "⛩️", label: "附近神社", query: "附近 神社" },
            { icon: "🏮", label: "附近寺廟", query: "附近 寺廟" },
            { icon: "⭐", label: "高評價神社", query: "附近 神社 評分4以上" },
            { icon: "🌲", label: "安靜神社", query: "附近 安靜 神社" }
          ]
        },
        {
          title: "御守御朱印",
          items: [
            { icon: "📖", label: "御朱印", query: "附近 神社 御朱印" },
            { icon: "🎐", label: "御守", query: "附近 神社 御守" },
            { icon: "💕", label: "戀愛御守", query: "附近 戀愛御守 神社" },
            { icon: "💰", label: "開運金運", query: "附近 開運 金運 神社" }
          ]
        }
      ]
    }
  };

  const config = configs[type] || configs.spots;

  contentPage.innerHTML += `
    <div class="v26-nearby-hero">
      <div class="v26-nearby-kicker">V26 Nearby Explore</div>
      <div class="v26-nearby-title">${config.title}</div>
      <div class="v26-nearby-subtitle">${config.subtitle}</div>
      <button class="v26-nearby-main-btn" type="button" id="v26NearbyMainBtn">
        <span>${config.main.icon}</span>
        <strong>${config.main.label}</strong>
      </button>
      <div class="v26-nearby-tip">
        第一次使用會詢問定位權限；若定位失敗，會自動改用名古屋地區搜尋。
      </div>
    </div>
    <div class="v26-nearby-sections" id="v26NearbySections"></div>
  `;

  const mainBtn = document.getElementById("v26NearbyMainBtn");
  if (mainBtn) {
    mainBtn.onclick = () => openV26MapsSearch(config.main.query);
  }

  const sections = document.getElementById("v26NearbySections");
  if (!sections) return;

  config.groups.forEach(group => {
    const section = document.createElement("div");
    section.className = "v26-nearby-section";
    section.innerHTML = `
      <div class="v26-nearby-section-title">${group.title}</div>
      <div class="v26-nearby-grid"></div>
    `;

    const grid = section.querySelector(".v26-nearby-grid");

    group.items.forEach(item => {
      const btn = document.createElement("button");
      btn.className = "v26-nearby-card";
      btn.type = "button";
      btn.innerHTML = `
        <span>${item.icon}</span>
        <strong>${item.label}</strong>
        <small>${item.query}</small>
      `;
      btn.onclick = () => openV26MapsSearch(item.query);
      grid.appendChild(btn);
    });

    sections.appendChild(section);
  });
}

function renderNearbySpots() {
  renderV26NearbyExploreCenter("spots");
}

function renderNearbyRestaurants() {
  renderV26NearbyExploreCenter("restaurants");
}

function renderNearbyShrines() {
  renderV26NearbyExploreCenter("shrines");
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
    btn.onclick = () => openV26MapsSearch(query);
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


function updateSyncStatus(message) {
  const syncStatus = document.getElementById("syncStatus");
  if (syncStatus) {
    syncStatus.textContent = message;
  }
}

function startRealtimeSync() {
  if (typeof window.cloudListenItineraries !== "function") {
    console.warn("Firebase 即時監聽功能尚未載入。");
    return;
  }

  if (realtimeUnsubscribe) {
    realtimeUnsubscribe();
    realtimeUnsubscribe = null;
  }

  realtimeUnsubscribe = window.cloudListenItineraries((cloudData) => {
    if (!cloudData || typeof cloudData !== "object") return;

    const newSignature = JSON.stringify(cloudData);
    if (newSignature === lastCloudSignature) return;

    lastCloudSignature = newSignature;
    itineraryCache = cloudData;
    localStorage.setItem(ITINERARY_KEY, JSON.stringify(cloudData));
    cloudSyncReady = true;

    updateSyncStatus("☁️ 已收到 Firebase 最新行程");

    if (currentOpenDay && !isEditingItinerary) {
      renderDayTimeline(currentOpenDay);
    }
  }, (error) => {
    cloudSyncReady = false;
    console.error("Firebase 即時同步失敗：", error);
    updateSyncStatus("⚠️ Firebase 即時同步失敗，請檢查網路");
  });
}


async function startApp() {
  await initializeItineraries();
  startRealtimeSync();
  renderHome();
}

startApp();
