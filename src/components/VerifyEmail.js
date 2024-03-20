import React from 'react'
import '../css/login.css'
import { sendEmailVerification } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { auth } from "../config/firebase";


const VerifyEmail = ({ user, setUsername }) => {
    
    const [verifyStatus, setVerifyStatus] = useState('initail')
    const [message, setMessage] = useState('')

    const resendEmail = () => {
        setVerifyStatus('loading')
        sendEmailVerification(user)
            .then(() => {
                setMessage('Verification email sent')
                setVerifyStatus('resend')
            })
            .catch((error) => {
                setMessage(error.message)
            });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            
            if (auth?.currentUser?.emailVerified) {
                setUsername(auth.currentUser.email.replace(/\./g, '_'))
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="login-body">
        <div className="login-form-div">
              <div className="verification-message">
                <div className='message'>{message}</div>
              We've sent a verification email to {user.email}. Please check your inbox and click the link to complete your registration.
              <button className='resend-button' onClick={resendEmail}>Resend Verification Email</button>
            </div>
          {verifyStatus === 'loading' ? <div className="loading"></div> : ''}
        </div>
      </div>
    )
}

export default VerifyEmail