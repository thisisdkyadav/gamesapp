import React from 'react'
import { ref, update } from "firebase/database";
import { db } from "../config/firebase";
import '../css/invites.css'

const Invites = ({
    username,
    invites
}) => {
    const acceptInvite = (game) => {
      update(ref(db), {
        ['ludo/games/' + game + '/users/' + username]: 'joined',
        ['ludo/games/' + game + '/usersDice/' + username]: 0,
        ['ludo/games/' + game + '/initialPawns/' + username]: 4,
        ['ludo/games/' + game + '/finalPawns/' + username]: 0,
        ['ludo/users/' + username+'/gameID']: game
      })
    }
    const rejectInvite = (game) => {
      update(ref(db), {
        ['ludo/games/' + game + '/users/' + username]: null,
        ['ludo/users/' + username + '/invites/' + game]: null
      })
    }
  return (
    <div className='invites'>
          <h2>{invites&&Object.keys(invites).length === 0?'No Invites':'Invites'}</h2>
          <hr />
          <div className="grid">
          {invites&&Object.keys(invites).map((game, index) => {
            if (invites[game]) {
              return <div key={index}>{game.replace(/\_/g, '.')} (Joined)</div>

            } else {
              return (<>
              <div className='grid-c1' key={index}>{game.replace(/\_/g, '.')} </div>
              <div><div className='grid-c2' onClick={() => acceptInvite(game)}>+</div> </div>
              <div><div className='grid-c2' onClick={() => rejectInvite(game)}>-</div></div>
              </>)
            }
          })}
          </div>

          
    </div>
  )
}

export default Invites