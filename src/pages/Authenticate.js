import React from "react"
import { useState } from "react"
import "../css/login.css"
import { login, signup, authWithGoogle } from "../utils/auth"
import Loading from "../components/Loading/Loading"

const Authenticate = ({ authStatus, setAuthStatus, setAppStatus }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleError = (message) => {
    setMessage(message)
    setAuthStatus("error")
  }

  const handelLogin = async () => {
    setAuthStatus("loading")
    login(email, password, handleError)
  }

  const handleSignup = () => {
    setAuthStatus("loading")
    signup(email, password, handleError)
  }

  const handleSignInWithGoogle = async () => {
    setAuthStatus("loading")
    authWithGoogle()
  }

  return (
    <>
      <div className="login-body">
        <img src="logo.svg" className="logo" alt="" />
        <div className="login-form-div">
          {authStatus === "loading" && <Loading seeThrough={true} />}
          <div>
            <div className="message">{message}</div>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="email-auth-buttons">
              <button className="signup-button" onClick={handleSignup}>
                Signup
              </button>
              <button className="login-button" onClick={handelLogin}>
                Login
              </button>
            </div>
            <button className="google-button" onClick={handleSignInWithGoogle}>
              Login with google
            </button>
          </div>
        </div>
        <div
          className="skip-auth"
          onClick={() => {
            setAppStatus("active")
          }}
        >
          Continue without login
        </div>
      </div>
    </>
  )
}

export default Authenticate
