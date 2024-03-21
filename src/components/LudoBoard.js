import React from 'react'
import BigCube from './BigCube';
import CubesContainer from './CubesContainer';
import LudoHome from './LudoHome';

const LudoBoard = ({ users, turn, username, rollDice, turnStatus, usersDice }) => {

  let colorList = ['red', 'green', 'yellow', 'blue']
  let usersList = Object.keys(users)

  let userIndex = usersList.indexOf(username)

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
  return (
    <>
    <div className='ludo'>

    <div className="ludo-board-container">
      <div className="ludo-board">

        <BigCube color={finalColorList[2]} position={0} user={finalUsersList[2]} />
        <CubesContainer color={finalColorList[3]} orientation={"top"} />
        <BigCube color={finalColorList[3]} position={2} user={finalUsersList[3]}/>
        <CubesContainer color={finalColorList[2]} orientation={"left"} />
        <LudoHome finalColorList={finalColorList} />
        <CubesContainer color={finalColorList[0]} orientation={"right"} />
        <BigCube color={finalColorList[1]} position={1} user={finalUsersList[1]}/>
        <CubesContainer color={finalColorList[1]} orientation={"down"} />
        <BigCube color={finalColorList[0]} position={3} user={finalUsersList[0]}/>

      </div>

    </div>
        </div>
        </>
  )
}

export default LudoBoard