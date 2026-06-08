/*
  V16 Firebase 雲端同步設定
  這個檔案負責連接 Firebase Firestore。
  請不要把這個檔案改名，index.html 會載入它。
*/

const firebaseConfig = {
  apiKey: "AIzaSyAV7YTTMG1gvnnwewIPAvkkhYtKIwemuc",
  authDomain: "yao-travel-helper.firebaseapp.com",
  projectId: "yao-travel-helper",
  storageBucket: "yao-travel-helper.firebasestorage.app",
  messagingSenderId: "434884231169",
  appId: "1:434884231169:web:70024a845ee198f77e4000"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const TRAVEL_DOC_PATH = "travelData/nagoya2026";

window.cloudGetItineraries = async function () {
  const doc = await db.doc(TRAVEL_DOC_PATH).get();

  if (!doc.exists) {
    return null;
  }

  const data = doc.data();

  if (data && data.itineraries) {
    return data.itineraries;
  }

  return null;
};

window.cloudSaveItineraries = async function (itineraries) {
  await db.doc(TRAVEL_DOC_PATH).set(
    {
      title: "名古屋五天四夜",
      itineraries: itineraries,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    },
    { merge: true }
  );
};
