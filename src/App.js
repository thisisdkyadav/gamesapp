import './App.css';
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import Authenticate from './pages/Authenticate';
import VerifyEmail from './components/VerifyEmail';
import Loading from './components/Loading'
import { appContext } from './context/appContext'

function App() {

  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [authStatus, setAuthStatus] = useState('initial')
  const [appStatus, setappStatus] = useState('opening')



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user && user.emailVerified) {
        setUsername(user.email.replace(/\./g, '_'));
        setAuthStatus('loggedin');
      } else if (user && !user.emailVerified) {

        setAuthStatus('verify')

      } else {
        setUsername('');
        setUser(null);
        setAuthStatus('loggedout')
      }
    });
    return () => unsubscribe();
  }, [])

  useEffect(() => {
    switch (authStatus) {
      case 'initial':
        setappStatus('opening')
        break;
      case 'loggedin':
        setappStatus('loading')
        break;
      case 'loggedout':
        setappStatus('no-user')
        break;
      case 'verify':
        setappStatus('email-not-verified')
        break;
      // case 'error':
      //   setappStatus('opened')
      //   break;
      // case 'loading':
      //   setappStatus('opened')
      //   break;
      default:
        setappStatus('default')
        break;
    }

  }, [authStatus])



  return (<>
    <appContext.Provider value={{ setappStatus, appStatus, username }}>
      {['opening', 'loading'].includes(appStatus) ? <Loading /> : ''}
      {username !== '' ? <Home username={username} user={user} />
      :authStatus === 'verify' ? <VerifyEmail user={user} setUsername={setUsername} />
      :<Authenticate authStatus={authStatus} setAuthStatus={setAuthStatus} />}
    </appContext.Provider>
  </>
  );
}

export default App;
