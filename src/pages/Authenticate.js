import React from 'react'
import { useState } from 'react'
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import '../css/login.css'
import Navbar from '../components/Navbar';



const Authenticate = ({ authStatus, setAuthStatus }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const getErrorMessageForUser = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Invalid email address. Please check and try again.';
      case 'auth/user-disabled':
        return 'Your account has been disabled. Please contact support.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again or reset your password.';
      case 'auth/user-not-found':
        return 'No account found with this email address. Please sign up.';
      case 'auth/email-already-in-use':
        return 'This email address is already in use. Please try a different one.';
      case 'auth/weak-password':
        return 'Password is too weak. Please choose a stronger password.';
      case 'auth/invalid-email':
        return 'Invalid email address. Please check and try again.';
      // Add more cases for other error codes as needed
      // Add more cases for other error codes as needed
      default:
        return 'An error occurred. Please try again later.';
    }
  };

  const login = async () => {
    setAuthStatus('loading')
    const res = await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // setUsername(userCredential.user)
      }).catch((error) => {
        setMessage(getErrorMessageForUser(error.code));
        setAuthStatus('error')
      });
  };

  const signup = () => {
    setAuthStatus('loading')
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(userCredential.user)
          .then(() => {
          }).catch((error) => { });

      })
      .catch((error) => {
        setMessage(getErrorMessageForUser(error.code));
        setAuthStatus('error')
        
      });
  }

  const signInWithGoogle = async () => {
    setAuthStatus('loading')
    const res = await signInWithPopup(auth, googleProvider)
  }


  return (

    <>

      <Navbar />
      <div className="login-body">
        <div className="login-form-div">
          {authStatus !== 'verify' ? (
            <div>
              <div className='message'>{message}</div>
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Passward" onChange={(e) => setPassword(e.target.value)} />
              <div className='email-auth-buttons'>
                <button className='signup-button' onClick={signup}>Signup</button>
                <button className='login-button' onClick={login}>Login</button>
              </div>
              <button className='google-button' onClick={signInWithGoogle}>Login with google</button>
            </div>) : ''}
          {authStatus === 'loading' ? <div className="loading"></div> : ''}
        </div>
      </div>
    </>
  )
}

export default Authenticate