import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth"
import { auth, googleProvider } from "../config/firebase"

const getErrorMessageForUser = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Invalid email address. Please check and try again."
    case "auth/user-disabled":
      return "Your account has been disabled. Please contact support."
    case "auth/wrong-password":
      return "Incorrect password. Please try again or reset your password."
    case "auth/user-not-found":
      return "No account found with this email address. Please sign up."
    case "auth/email-already-in-use":
      return "This email address is already in use. Please try a different one."
    case "auth/weak-password":
      return "Password is too weak. Please choose a stronger password."
    case "auth/invalid-email":
      return "Invalid email address. Please check and try again."
    default:
      return "An error occurred. Please try again later."
  }
}

export const login = async () => {
  setAuthStatus("loading")
  const res = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // setUsername(userCredential.user)
    })
    .catch((error) => {
      setMessage(getErrorMessageForUser(error.code))
      setAuthStatus("error")
    })
}

export const signup = () => {
  setAuthStatus("loading")
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      sendEmailVerification(userCredential.user)
        .then(() => {})
        .catch((error) => {})
    })
    .catch((error) => {
      setMessage(getErrorMessageForUser(error.code))
      setAuthStatus("error")
    })
}

export const signInWithGoogle = async () => {
  setAuthStatus("loading")
  const res = await signInWithPopup(auth, googleProvider)
}
