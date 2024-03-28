import React from 'react'
import '../css/ludo.css';
import Ludo from '../games/Ludo';


const Home = ({username}) => {



  return (
    <>
          <Ludo username={username} />
    </>
  )
}

export default Home