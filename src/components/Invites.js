import React from 'react'
import { ref, update } from "firebase/database";
import { db } from "../config/firebase";

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
        ['ludo/users/' + username]: { invites: null, gameID: game }
      })
    }
    const rejectInvite = (game) => {
      update(ref(db), {
        ['ludo/games/' + game + '/users/' + username]: null,
        ['ludo/users/' + username + '/invites/' + game]: null
      })
    }
  return (
    <div>
          <h2>Invites</h2>
          {Object.keys(invites).map((game, index) => {
            if (invites[game]) {
              return <div key={index}>{game.replace('_', '.')} (Joined)</div>

            } else {
              return <div key={index}>{game.replace('_', '.')} <button onClick={() => acceptInvite(game)}>Accept</button> <button onClick={() => rejectInvite(game)}>Reject</button></div>
            }
          })}

          {Object.keys(invites).length === 0?'No invites':''}
    </div>
  )
}

export default Invites