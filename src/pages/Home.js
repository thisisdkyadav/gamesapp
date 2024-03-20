import React from 'react'
import '../css/ludo.css';

import Ludo from '../games/Ludo';
import Navbar from '../components/Navbar';


const Home = ({username, user}) => {



  return (
    <>

        <Navbar username={username} user={user} />
        
        <div className="main">

          <Ludo username={username} />

        </div>
    </>
  )
}

export default Home