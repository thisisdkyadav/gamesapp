import React from 'react'
import { ref, set } from "firebase/database";
import { db } from "../config/firebase";

const InitialDisplay = ({
    username,
    preResult
}) => {
    console.log('asdfsdfsdf',preResult);
    const createNewGame = () => {
        set(ref(db, 'ludo/games/' + username), {
            users: {
                [username]: 'joined'
            },
            gameState: {
                r: {
                    a: 'ri0',
                    b: 'ri1',
                    c: 'ri2',
                    d: 'ri3',
                },
                g: {
                    a: 'gi0',
                    b: 'gi1',
                    c: 'gi2',
                    d: 'gi3'
                },
                y: {
                    a: 'yi0',
                    b: 'yi1',
                    c: 'yi2',
                    d: 'yi3'
                },
                b: {
                    a: 'bi0',
                    b: 'bi1',
                    c: 'bi2',
                    d: 'bi3'
                }
            },
            status: 'waiting',
            turn: username,
            turnStatus: 'roll',
            finalPawns: { [username]: 0 },
            initialPawns: { [username]: 4 },
            dice: 0,

        })
            .then(() => {
                set(ref(db, 'ludo/users/' + username), {
                    invites: null,
                    gameID: username
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div>
        <div className='initial-display'>
            <button onClick={createNewGame}>Start new game</button>
        </div>
        <br />
        {preResult.map((user,index)=>(
            <div key={index}>
                {index+1}: {user}
                <br />
            </div>
        ))}
        </div>
    )
}

export default InitialDisplay