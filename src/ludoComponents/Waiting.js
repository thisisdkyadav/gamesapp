import React from 'react'
import { ref, update } from "firebase/database";
import { db } from "../config/firebase";
import { useRef, useState } from 'react';
import '../css/waiting.css';

const Waiting = ({
  gameID,
  users,
  username
}) => {

  const [message, setMessage] = useState('')
  const inputEmail = useRef()
  const startGame = () => {
    if (Object.keys(users).filter(user => users[user] === 'joined').length > 1) {
      update(ref(db), {
        ['ludo/games/' + gameID + '/status']: 'active'
      })
    }
  }
  const inviteUser = () => {
    let email = inputEmail.current.value.replace(/\./g, '_')
    if (!email) {
      setMessage('enter email')
    } else if (users[email]) {
      setMessage('user already added')
    } else if (Object.keys(users).length === 4) {
      setMessage('game is full')
    } else {
      update(ref(db), {
        ['ludo/games/' + gameID + '/users/' + email]: 'invited',
        ['ludo/users/' + email + '/invites/' + username]: false
      })
      inputEmail.current.value = ''
    }
  }

  const removeUser = (e) => {
    let email=e.target.dataset.user
    let updates={}
    if (e.target.dataset.status==='invited') {
      updates['ludo/games/' + gameID + '/users/' + email]= null
      updates['ludo/users/' + email + '/invites']= null
    }else {
      updates['ludo/games/' + gameID + '/users/' + email]= null
      updates['ludo/users/' + email + '/gameID']= null
    }
    update(ref(db), updates)
  }

  const exitGame = () => {
    update(ref(db), {
      ['ludo/games/' + gameID]: null,
      ['ludo/users/' + username + '/gameID']: null
    })
  }

  return (
    <div className='waiting'>
      <div className='message'></div>{message}
      <div className="grid">
        <div><input placeholder="Email" ref={inputEmail} type="email" /></div>
        <div className='grid-c2' onClick={inviteUser}>+</div>
        {users&&Object.keys(users).map((user, index) => {
          return (
            <>
              <div className={username===gameID?'grid-c1':'grid-c12'} key={index}>({users[user]}){user.replace(/\_/g, '.')}</div>
              {username===gameID||username===user?<div data-user={user} data-status={users[user]} className='grid-c2' onClick={removeUser}>-</div>:''}
            </>)
        })
        }
        {username===gameID?<>
        <button className='start-button' onClick={startGame}>Start game</button>
        <div><div className='grid-c2' onClick={exitGame}>x</div></div>
        </>:''}
      </div>
    </div>
  )
}

export default Waiting