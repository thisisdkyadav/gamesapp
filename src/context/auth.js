import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../lib/firebase/config"
import Authenticate from "../pages/Authenticate"
import VerifyEmail from "../components/VerifyEmail/VerifyEmail"
import Loading from "../components/Loading/Loading"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null)
  const [user, setUser] = useState(null)
  const [authStatus, setAuthStatus] = useState("initial")
  const [appStatus, setAppStatus] = useState("opening")

  // function to check is authenticated
  const isAuthenticated = () => {
    return user !== null
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      if (user && user.emailVerified) {
        setUsername(user.email.replace(/\./g, "_"))
        setAuthStatus("logged-in")
      } else if (user && !user.emailVerified) {
        setAuthStatus("verifying")
      } else {
        setUsername(null)
        setUser(null)
        setAuthStatus("guest")
      }
    })
    return () => unsubscribe()
  }, [])
  useEffect(() => {
    console.log(authStatus)

    switch (authStatus) {
      case "initial":
        setAppStatus("opening")
        break
      case "logged-in":
        setAppStatus("active")
        break
      // case "guest":
      //   setAppStatus("active")
      // break
      case "verifying":
        setAppStatus("authenticating")
        break
      default:
        setAppStatus("default")
        break
    }
  }, [authStatus])

  useEffect(() => {
    console.log(appStatus)

    return () => {}
  }, [appStatus])

  return (
    <AuthContext.Provider
      value={{
        setAppStatus,
        appStatus,
        username,
        user,
        isAuthenticated,
      }}
    >
      {["opening", "loading"].includes(appStatus) && <Loading />}

      {appStatus !== "authenticating" ? (
        children
      ) : authStatus === "verifying" ? (
        <VerifyEmail user={user} setUsername={setUsername} />
      ) : (
        <Authenticate
          authStatus={authStatus}
          setAuthStatus={setAuthStatus}
          setAppStatus={setAppStatus}
        />
      )}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
