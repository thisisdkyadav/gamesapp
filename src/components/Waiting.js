import React from 'react'
import { ref, update } from "firebase/database";
import { db } from "../config/firebase";
import { useRef } from 'react';

const Waiting = ({
    gameID,
    users,
    username
}) => {
    const inputEmail = useRef()
    const startGame = () => {
      if (Object.keys(users).filter(user=>users[user]==='joined').length == 4) {
        update(ref(db), {
          ['ludo/games/' + gameID + '/status']: 'active'
        })
      }
    }
    const inviteUser = () => {
      let email = inputEmail.current.value.replace('.', "_")
      let userList = ['user1', 'user2', 'user3', 'user4']
      console.log(!users[email], 'sfsdf');
      if (!email) {
        alert('enter email')
      } else if (users[email]) {
        alert('user already added')
      } else if (Object.keys(users).length === 4) {
        alert('game is full')
      } else {
        update(ref(db), {
          ['ludo/games/' + gameID + '/users/' + email]: 'invited',
          ['ludo/users/' + email + '/invites/' + username]: false
        })
      }
    }
    return (
        <div>
            <input placeholder="Email" ref={inputEmail} type="email" />
            {Object.keys(users).map((user, index) => {
                return <div key={index}>{user} ({users[user]})</div>
            })
            }
            <br />
            <button onClick={inviteUser}>Add Player</button>
            <br />
            <button onClick={startGame}>Start game</button>
        </div>
    )
}

export default Waiting