import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getDatabase } from "firebase/database"
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDMxzSTCR0b_Ms3OHr8i_UFYUzj9TFX99c",
  authDomain: "games-ab96b.firebaseapp.com",
  databaseURL: "https://games-ab96b-default-rtdb.firebaseio.com",
  projectId: "games-ab96b",
  storageBucket: "games-ab96b.appspot.com",
  messagingSenderId: "50015386277",
  appId: "1:50015386277:web:70377293a765beb3392b4c",
  measurementId: "G-QD4DQ8MGCJ",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getDatabase(app)
const analytics = getAnalytics(app)

// export const db = getFirestore(app);
// export const storage = getStorage(app);

// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAlztMMVXKXA5oSVpwe0XthJ6TWNe31BSo",
//   authDomain: "fir-course-beba9.firebaseapp.com",
//   projectId: "fir-course-beba9",
//   storageBucket: "fir-course-beba9.appspot.com",
//   messagingSenderId: "236316955671",
//   appId: "1:236316955671:web:2b18d92e1b6644fae3f852",
//   measurementId: "G-HENJ7D82KH",
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();

// export const db = getFirestore(app);
// export const storage = getStorage(app);
