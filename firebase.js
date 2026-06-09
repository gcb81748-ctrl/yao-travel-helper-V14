/*
  V16 Firebase 雲端同步設定
  這個檔案負責連接 Firebase Firestore。
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


window.cloudListenItineraries = function (onData, onError) {
  return db.doc(TRAVEL_DOC_PATH).onSnapshot(
    (doc) => {
      if (!doc.exists) {
        onData(null);
        return;
      }

      const data = doc.data();

      if (data && data.itineraries) {
        onData(data.itineraries);
      } else {
        onData(null);
      }
    },
    (error) => {
      if (typeof onError === "function") {
        onError(error);
      } else {
        console.error("Firestore 即時監聽錯誤：", error);
      }
    }
  );
};

console.log("V17_CACHEFIX_ACTIVE Firebase realtime listener loaded");


/* ===== V20 團員定位分享 ===== */
window.cloudSaveMemberLocation = async function (memberName, locationData) {
  await db.collection("memberLocations").doc(memberName).set(
    {
      name: memberName,
      lat: locationData.lat,
      lng: locationData.lng,
      accuracy: locationData.accuracy || null,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    },
    { merge: true }
  );
};

window.cloudListenMemberLocations = function (onData, onError) {
  return db.collection("memberLocations").onSnapshot(
    (snapshot) => {
      const members = [];
      snapshot.forEach(doc => {
        members.push({
          id: doc.id,
          ...doc.data()
        });
      });
      onData(members);
    },
    (error) => {
      if (typeof onError === "function") onError(error);
      else console.error("memberLocations 即時監聽失敗：", error);
    }
  );
};

window.cloudClearMemberLocations = async function () {
  const snapshot = await db.collection("memberLocations").get();
  const batch = db.batch();

  snapshot.forEach(doc => {
    batch.delete(doc.ref);
  });

  await batch.commit();
};
