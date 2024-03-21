import './App.css';
import { auth } from "./config/firebase";
import { onAuthStateChanged} from "firebase/auth";
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import Authenticate from './pages/Authenticate';
import VerifyEmail from './components/VerifyEmail';
import { sendEmailVerification } from 'firebase/auth';
import { set } from 'firebase/database';

function App() {
  
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [authStatus, setAuthStatus] = useState('initial')


  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user && user.emailVerified) {
        setUsername(user.email.replace(/\./g, '_'));
        setAuthStatus('verified')
    } else if(user && !user.emailVerified){

      setAuthStatus('verify')

    } else {
      setUsername('');
      setUser(null);
    }
    }); 
    return () => unsubscribe();
  }, [])


  return (
    <>
    {username!==''?<Home username={username} user={user}/>
    :authStatus==='verify'?<VerifyEmail user={user} setUsername={setUsername} />
    :<Authenticate authStatus={authStatus} setAuthStatus={setAuthStatus}/>}
    </>
  );
}

export default App;
