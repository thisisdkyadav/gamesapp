import React from 'react'
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useState } from 'react';

const Navbar = ({ username, user }) => {

  const [showUserMenu, setShowUserMenu] = useState(false)

  // const setBoard = () => {
  //   set(ref(db, 'ludo/games/' + username), {
  //     users: {
  //       'inrowmail@gmail_com': 'joined',
  //       'deveshgilyav@gmail_com': 'joined',
  //       'awacxo@gmail_com': 'joined',
  //       'itsdeveshyadav@gmail_com': 'joined'
  //     },
  //     gameState: {
  //       r: {
  //         a: 'rfa',
  //         b: 'rfb',
  //         c: 'rfc',
  //         d: 'rh3',
  //       },
  //       g: {
  //         a: 'gfa',
  //         b: 'gfb',
  //         c: 'gfc',
  //         d: 'gfd'
  //       },
  //       y: {
  //         a: 'yi0',
  //         b: 'yi1',
  //         c: 'yi2',
  //         d: 'yi3'
  //       },
  //       b: {
  //         a: 'bfa',
  //         b: 'bfb',
  //         c: 'bfc',
  //         d: 'bfd'
  //       }
  //     },
  //     status: 'active',
  //     turn: 'awacxo@gmail_com',
  //     turnStatus: 'move',
  //     finalPawns: { 
  //       'inrowmail@gmail_com': 0,
  //       'deveshgilyav@gmail_com': 4,
  //       'awacxo@gmail_com': 3,
  //       'itsdeveshyadav@gmail_com': 4
  //      },
  //     initialPawns: { 
  //       'inrowmail@gmail_com': 4,
  //       'deveshgilyav@gmail_com': 0,
  //       'awacxo@gmail_com': 0,
  //       'itsdeveshyadav@gmail_com': 0
  //      },
  //     dice: 4,
  //     results: {
  //       'deveshgilyav@gmail_com': 1,
  //       'itsdeveshyadav@gmail_com': 0
  //     },
  //     usersDice:{
  //       "awacxo@gmail_com": 4,
  //       "deveshgilyav@gmail_com": 0,
  //       "inrowmail@gmail_com": 4,
  //       "itsdeveshyadav@gmail_com": 3
  //     }

  //   });

  // }
  const logoutUser = () => {
    signOut(auth);
  }
  console.log(user);

  return (
    <>
      <nav>
        <div className="nav-left">
          <img className='logo' src="logo.svg" alt="" />
        </div>



        <div className="nav-right">
          <div className="displayName">
            {user ? user.displayName : ''}
          </div>

          {user?<img onClick={()=>setShowUserMenu(!showUserMenu)} className="profile-image" src={user.photoURL?user.photoURL:'profile.svg'} />:''}
          {/* <button onClick={setBoard}>set board</button> */}

        </div>

        {showUserMenu&&user?<div className="userMenu">
          <img src={user.photoURL?user.photoURL:'profile.svg'} alt="" />
          <div className='displayName'>{user.displayName}</div>
          <div className='displayEmail'>{user.email}</div>
          <button className='btn-blue' onClick={logoutUser}>Logout</button>

        </div>:''}
      </nav>
    </>
  )
}

export default Navbar