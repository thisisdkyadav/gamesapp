import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getDatabase } from "firebase/database"

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

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getDatabase(app)
