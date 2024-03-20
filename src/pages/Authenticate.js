import React from 'react'
import { useState } from 'react'
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import '../css/login.css'
import Navbar from '../components/Navbar';



const Authenticate = ({ authStatus,setAuthStatus }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const login = async () => {
    setAuthStatus('loading')
    const res = await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // setUsername(userCredential.user)
      }).catch((error) => {
        setMessage(error.message);
      });
  };

  const signup = () => {
    console.log('clicked signup');
    setAuthStatus('loading')
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(userCredential.user)
        .then(() => {
        }).catch((error) => {});

      })
      .catch((error) => {
        setMessage(error.message);
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