import React from 'react'
import LudoBoard from './LudoBoard'

const Ludo = ({
    users,
    turn,
    gameColorCode,
    turnStatus,
    rollDice,
    dice,
    results,
    username,
    usersDice
}) => {
  return (
    <div className='ludo'>
        <div>
          {turnStatus}
          {Object.keys(results).length?Object.keys(results):''}
        </div>
        <LudoBoard users={users} turn={turn} username={username} rollDice={rollDice} turnStatus={turnStatus} usersDice={usersDice} />
        {/* <div className='dice' onClick={rollDice}>{dice.value}</div> */}
    </div>
  )
}

export default Ludo