import React from 'react'
import Pawn from './Pawn'
import { useEffect, useState, useContext } from 'react'
import { ludoContext, appContext } from '../context/context'


const BigCube = ({ color, position, user }) => {

  let orientation = ['top-left', 'bottom-left', 'top-right', 'bottom-right']

  const {
    boardState,
    rollDice,
    handleCubeClick,
    usersDice,
    turn,
    turnStatus
  } = useContext(ludoContext)

  const { username } = useContext(appContext)

  const [colorCode, setColorCode] = useState(color[0])
  const [pawnList, setPawnList] = useState(['', '', '', ''])

  useEffect(() => {
    if (boardState) {
      let pawnListCopy = [...pawnList];

      for (let i = 0; i < pawnListCopy.length; i++) {
        pawnListCopy[i] = boardState[colorCode + 'i' + i][0]
      }
      setPawnList(pawnListCopy);
    }
  }, [boardState]);


  return (
    <div className="big-cube" style={{ backgroundColor: `var(--${color})` }}>
      {user ? <><div className={`player-details ${orientation[(position + 2) % 4]} ${color}-hover`}>{user.replace(/\_/g,'.')}</div>
         <div onClick={user===username?rollDice:null} className={`dice ${orientation[position]} ${color}-hover`}><img src={`dice-${usersDice[user]}.svg`} alt="" /></div>
      </> : ''}
      <div className={turn === user&&turnStatus==='move'?'big-cube-content show-move':turn === user&&turnStatus==='roll' ? "big-cube-content show-roll" : "big-cube-content"}>
        {pawnList.map((pawn, index) => (
          <div onClick={() => handleCubeClick(colorCode + 'i' + index)} key={colorCode + 'i' + index + '-' + index} id={colorCode + 'i' + index} className={`big-cube-circle b-${color} ${color}-hover`}>
            {(pawn != '') && (pawn) && (<Pawn id={pawn} color={color} />)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BigCube