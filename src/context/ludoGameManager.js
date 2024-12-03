import { createContext, useContext, useEffect, useState } from "react"
import { useLudo } from "./ludo"
import { newBoardState } from "../constants/ludoConstants"

const ROLL = "roll"
const MOVE = "move"

const LudoGameManagerContext = createContext()

export const LudoGameManagerProvider = ({ children }) => {
  const { gameState, boardState, username, turn, turnStatus, setDice, dice, userColor, move } =
    useLudo()

  const isTurn = () => {
    return turn === username
  }
  const rollDice = () => {
    const diceValue = Math.floor(Math.random() * 6) + 1
    setDice({ ...dice, value: diceValue, from: 1 })
  }
  const handleDiceClick = () => {
    console.log(turnStatus)

    if (!isTurn()) {
      return
    }
    if (turnStatus === ROLL) {
      rollDice()
    } else if (turnStatus === MOVE) {
      alert(MOVE)
    }
  }
  // const handleCubeClick = (id) => {
  //   if (
  //     turn === username &&
  //     turnStatus == "move" &&
  //     boardState[id].findIndex((pawn) => pawn[0] === userColor) !== -1
  //   ) {
  //     if (id[1] !== "i") {
  //       move(id)
  //     } else if (id[1] === "i") {
  //       move(id)
  //     } else {
  //       alert("invalid move")
  //     }
  //   }
  // }

  return (
    <LudoGameManagerContext.Provider value={{ handleDiceClick }}>
      {children}
    </LudoGameManagerContext.Provider>
  )
}

export const useLudoGameManager = () => {
  return useContext(LudoGameManagerContext)
}
