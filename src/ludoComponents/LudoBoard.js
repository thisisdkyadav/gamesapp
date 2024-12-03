import React from "react"
import BigCube from "./BigCube"
import CubesContainer from "./CubesContainer"
import LudoHome from "./LudoHome"
import { useAuth } from "../context/auth"

const LudoBoard = ({ users }) => {
  const { username } = useAuth()

  let noOfUsers = Object.keys(users).length

  let colorList = ["red", "green", "yellow", "blue"]
  let usersList = Object.keys(users)
  // let usersList = Object.keys(users).filter((user)=>users[user]!=='leaved')

  let userIndex = usersList.indexOf(username)

  console.log(userIndex, usersList)

  let finalColorList = []
  let finalUsersList = []

  // usersList.forEach((user)=>{

  // })

  if (userIndex !== -1) {
    for (let i = 0; i < 4; i++) {
      let shift = noOfUsers === 2 && userIndex === 1 ? 1 : 0
      let color = colorList[(userIndex + i + shift) % 4]
      finalColorList.push(color)
      if (noOfUsers > 2) {
        let user = usersList[(userIndex + i) % 4]
        finalUsersList.push(user ? user : "")
      } else if (i === 0 || i === 1) {
        let user = usersList[(userIndex + i) % noOfUsers]
        finalUsersList.push(user)
        finalUsersList.push("")
      }
    }
  } else {
    finalColorList = colorList
    finalUsersList = usersList
  }

  console.log(finalColorList, finalUsersList)

  return (
    <>
      <div className="ludo">
        <div className="ludo-board-container">
          <div className="ludo-board">
            <BigCube
              color={finalColorList[2]}
              position={0}
              user={finalUsersList[2]}
            />
            <CubesContainer color={finalColorList[3]} orientation={"top"} />
            <BigCube
              color={finalColorList[3]}
              position={2}
              user={finalUsersList[3]}
            />
            <CubesContainer color={finalColorList[2]} orientation={"left"} />
            <LudoHome finalColorList={finalColorList} />
            <CubesContainer color={finalColorList[0]} orientation={"right"} />
            <BigCube
              color={finalColorList[1]}
              position={1}
              user={finalUsersList[1]}
            />
            <CubesContainer color={finalColorList[1]} orientation={"down"} />
            <BigCube
              color={finalColorList[0]}
              position={3}
              user={finalUsersList[0]}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default LudoBoard
