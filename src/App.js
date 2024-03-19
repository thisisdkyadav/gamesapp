import './App.css';
import { auth, db } from "./config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Home from './pages/Home';
import Login from './pages/Login';
import { useEffect, useState } from 'react';

function App() {

  const [username, setUsername] = useState('')


  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {setUsername(user.email.replace(/\./g, '_'));}
    });
    return () => unsubscribe();
  }, [])


  return (
    <>
    {username?<Home username={username}/>:<Login setUsername={setUsername}/>}
    </>
  );
}

export default App;
