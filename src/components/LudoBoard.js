import React from 'react'
import BigCube from './BigCube';
import CubesContainer from './CubesContainer';

const LudoBoard = ({ users, turn, username, rollDice, turnStatus, usersDice }) => {

  let colorList = ['red', 'green', 'yellow', 'blue']
  let usersList = Object.keys(users)

  let userIndex = usersList.indexOf(username)
  console.log(colorList, userIndex);

  let finalColorList = []
  let finalUsersList = []

  if (userIndex !== -1) {
    for (let i = 0; i < 4; i++) {
      finalColorList.push(colorList[(userIndex + i) % 4])
      finalUsersList.push(usersList[(userIndex + i) % 4])
    }
  } else {
    finalColorList = colorList
    finalUsersList = usersList
  }
  console.log(finalColorList,finalUsersList,finalUsersList[1]&&turnStatus==='move',usersDice,turn,turnStatus);

  return (
    <>
    <div className='ludo'>
        {/* <div>
          {turnStatus}
          {Object.keys(results).length?Object.keys(results):''}
        </div> */}

    <div className="ludo-board-container">
      <div className='board-cover'>

        {finalUsersList[2] ? <div className={turn === finalUsersList[2] ? "players-details b-purple" : "players-details"}>
          <div className={turn === finalUsersList[2]&&turnStatus==='move'?'dice-move':'dice-roll'}>{usersDice[finalUsersList[2]]}</div> {finalUsersList[2]}
        </div> : ''}

        {finalUsersList[3] ? <div className={turn === finalUsersList[3] ? "players-details b-purple" : "players-details"} style={{ justifyContent: 'end' }}>
          {finalUsersList[3]}  <div className={turn === finalUsersList[3]&&turnStatus==='move'?'dice-move':'dice-roll'}>{usersDice[finalUsersList[3]]}</div>
        </div> : ''}

      </div>
      <div className="ludo-board">

        <BigCube color={finalColorList[2]} />
        <CubesContainer color={finalColorList[3]} orientation={"top"} />
        <BigCube color={finalColorList[3]} />
        <CubesContainer color={finalColorList[2]} orientation={"left"} />
        <div><div className="home-cube"></div></div>
        <CubesContainer color={finalColorList[0]} orientation={"right"} />
        <BigCube color={finalColorList[1]} />
        <CubesContainer color={finalColorList[1]} orientation={"down"} />
        <BigCube color={finalColorList[0]} />

      </div>
      <div className='board-cover'>
        {finalUsersList[1] ? <div className={turn === finalUsersList[1] ? "players-details b-purple" : "players-details"}>
          <div className={turn === finalUsersList[1]&&turnStatus==='move'?'dice-move':'dice-roll'}>{usersDice[finalUsersList[1]]}</div> {finalUsersList[1]}
        </div> : ''}

        {finalUsersList[0] ? <div className={turn === finalUsersList[0] ? "players-details b-purple" : "players-details"} style={{ justifyContent: 'end' }}>
          {finalUsersList[0]} <div onClick={rollDice} className={turn === finalUsersList[0]&&turnStatus==='move'?'dice-move':'dice-roll'}>{usersDice[finalUsersList[0]]}</div>
        </div> : ''}

      </div>

    </div>
        </div>
        </>
  )
}

export default LudoBoard