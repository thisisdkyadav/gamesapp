import { createContext, useContext, useEffect, useState } from "react"
import { onValue, ref, update } from "firebase/database"
import { db } from "../lib/firebase/config"
import { useAuth } from "./auth"
import { ludoAI } from "../lib/ludo/ludoAI"
import { useRef } from "react"
import { useLudo } from "./ludo"

const LudoBoardManagerContext = createContext()

export const LudoBoardManagerProvider = ({ children }) => {
  const { setAppStatus, username, user } = useAuth()
  const {
    gameID,
    users,
    dice,
    turn,
    turnStatus,
    initialPawns,
    finalPawns,
    results,
    bots,
    usersDice,
    usersRef,
    gameState,
    noOfUsers,
    colorsUser,
    gameColorCode,
  } = useLudo()

  let tempState = {
    hidden: [],

    ri0: [],
    ri1: [],
    ri2: [],
    ri3: [],
    rb1: [],
    rb2: [],
    rb3: [],
    rb4: [],
    rb5: [],
    rb6: [],
    rh1: [],
    rh2: [],
    rh3: [],
    rh4: [],
    rh5: [],
    rh6: [],
    ra1: [],
    ra2: [],
    ra3: [],
    ra4: [],
    ra5: [],
    ra6: [],
    rfa: [],
    rfb: [],
    rfc: [],
    rfd: [],

    gi0: [],
    gi1: [],
    gi2: [],
    gi3: [],
    gb1: [],
    gb2: [],
    gb3: [],
    gb4: [],
    gb5: [],
    gb6: [],
    gh1: [],
    gh2: [],
    gh3: [],
    gh4: [],
    gh5: [],
    gh6: [],
    ga1: [],
    ga2: [],
    ga3: [],
    ga4: [],
    ga5: [],
    ga6: [],
    gfa: [],
    gfb: [],
    gfc: [],
    gfd: [],

    yi0: [],
    yi1: [],
    yi2: [],
    yi3: [],
    yb1: [],
    yb2: [],
    yb3: [],
    yb4: [],
    yb5: [],
    yb6: [],
    yh1: [],
    yh2: [],
    yh3: [],
    yh4: [],
    yh5: [],
    yh6: [],
    ya1: [],
    ya2: [],
    ya3: [],
    ya4: [],
    ya5: [],
    ya6: [],
    yfa: [],
    yfb: [],
    yfc: [],
    yfd: [],

    bi0: [],
    bi1: [],
    bi2: [],
    bi3: [],
    bb1: [],
    bb2: [],
    bb3: [],
    bb4: [],
    bb5: [],
    bb6: [],
    bh1: [],
    bh2: [],
    bh3: [],
    bh4: [],
    bh5: [],
    bh6: [],
    ba1: [],
    ba2: [],
    ba3: [],
    ba4: [],
    ba5: [],
    ba6: [],
    bfa: [],
    bfb: [],
    bfc: [],
    bfd: [],
  }

  let colorCodeList = ["r", "g", "y", "b"]

  const [boardState, setBoardState] = useState(tempState)

  const runBot = (bot) => {
    // wait for 3 sec
    setTimeout(function () {
      console.log("After delay")
      let color = Object.keys(colorsUser).find((c) => colorsUser[c] === bot)
      let n = Math.floor(Math.random() * 6) + 1
      // let pawn = ludoAI(boardState, n, color, gameState, true)
      move(null, bot, color, 4, true)
    }, 100)
  }
  const rollDice = () => {
    let n = Math.floor(Math.random() * 6) + 1
    setDice({ ...dice, value: n, from: 1 })
  }
  const handleDiceClick = () => {
    if (!turn === username) {
      return
    }
    if (turnStatus === "move") {
      alert("move")
      return
    }
    if (turnStatus === "roll") {
      rollDice
    }
  }
  const getNextUserId = (currentUserId, userIds) => {
    const currentIndex = userIds.indexOf(currentUserId)
    return userIds[(currentIndex + 1) % userIds.length]
  }
  const isUserAvailable = (userId) => {
    return !Object.keys(results).includes(userId) && users[userId] !== "leaved"
  }
  const nextUser = (currentUserId) => {
    const userIds = Object.keys(users)
    let userId = getNextUserId(currentUserId, userIds)
    while (!isUserAvailable(userId)) {
      userId = getNextUserId(userId, userIds)
    }
    return userId
  }
  const handleCubeClick = (id) => {
    if (
      turn === username &&
      turnStatus == "move" &&
      boardState[id].findIndex((pawn) => pawn[0] === gameColorCode) !== -1
    ) {
      if (id[1] !== "i") {
        move(id)
      } else if (id[1] === "i") {
        move(id)
      } else {
        alert("invalid move")
      }
    }
  }
  const move = (id, user = username, color = gameColorCode, vdice = dice.value, isBot = false) => {
    let pawnCode = isBot ? null : boardState[id].find((pawn) => pawn[0] === color)
    console.log(vdice, color, isBot, pawnCode)
    const { movables, pawn } = ludoAI(boardState, vdice, color, gameState, isBot, pawnCode)
    console.log(pawn, movables)

    let updates = {}

    if (isBot) {
      updates["ludo/games/" + gameID + "/dice"] = dice.value
      updates["ludo/games/" + gameID + "/usersDice/" + user] = vdice
    }

    if (pawn.canMove) {
      updates["ludo/games/" + gameID + "/gameState/" + color + "/" + pawn.code[1]] =
        pawn.newPositionID
      updates["ludo/games/" + gameID + "/turnStatus"] = "roll"

      let newPositionPawns = boardState[pawn.newPositionID]

      if (
        newPositionPawns.length &&
        ![0, 8, 13, 21, 26, 34, 39, 47].includes(pawn.newPosition) &&
        newPositionPawns[0][0] !== color
      ) {
        let tempPawnUser = colorsUser[newPositionPawns[0][0]]
        updates["ludo/games/" + gameID + "/initialPawns/" + tempPawnUser] =
          initialPawns[tempPawnUser] + newPositionPawns.length
        newPositionPawns.forEach((pawn) => {
          updates["ludo/games/" + gameID + "/gameState/" + pawn[0] + "/" + pawn[1]] =
            pawn[0] + "i" + ["a", "b", "c", "d"].indexOf(pawn[1])
        })
      } else if (pawn.newPosition === 56) {
        if (finalPawns[user] === 3) {
          updates["ludo/games/" + gameID + "/results/" + user] = Object.keys(results).length
          updates["ludo/games/" + gameID + "/turn"] = nextUser(user)
        }
        updates["ludo/games/" + gameID + "/finalPawns/" + user] = finalPawns[user] + 1
      } else if (vdice === 6 && pawn.newPosition === 0) {
        updates["ludo/games/" + gameID + "/initialPawns/" + user] = initialPawns[user] - 1
      } else if (vdice !== 6) {
        updates["ludo/games/" + gameID + "/turn"] = nextUser(user)
      }
    } else if (!movables && vdice !== 6) {
      updates["ludo/games/" + gameID + "/turn"] = nextUser(user)
    }

    update(ref(db), updates)
  }

  useEffect(() => {
    colorCodeList.forEach((color) => {
      tempState[gameState[color].a].push(color + "a")
      tempState[gameState[color].b].push(color + "b")
      tempState[gameState[color].c].push(color + "c")
      tempState[gameState[color].d].push(color + "d")
    })
    setBoardState(tempState)
  }, [gameState])

  useEffect(() => {
    if (dice.value && turnStatus === "roll" && dice.from) {
      let updates = {}

      updates["ludo/games/" + gameID + "/dice"] = dice.value
      updates["ludo/games/" + gameID + "/usersDice/" + username] = dice.value

      if (initialPawns[username] + finalPawns[username] === 4 && finalPawns[username] !== 4) {
        move(Object.values(gameState[gameColorCode]).find((position) => position[1] === "i"))
      } else if (
        (initialPawns[username] === 0 && finalPawns[username] === 3) ||
        (initialPawns[username] + finalPawns[username] === 3 && dice.value !== 6)
      ) {
        move(
          Object.values(gameState[gameColorCode]).find(
            (position) => position[1] !== "i" && position[1] !== "f"
          )
        )
      } else {
        updates["ludo/games/" + gameID + "/turnStatus"] = "move"
      }
      update(ref(db), updates)
    }
  }, [dice])

  useEffect(() => {
    let botsList = Object.keys(bots)
    setTimeout(() => {
      if (botsList.length && botsList.includes(turn) && bots[turn] === username) {
        runBot(turn)
      }
    }, 1500)
  }, [bots])

  return (
    <LudoBoardManagerContext.Provider
      value={{
        handleDiceClick,
        handleCubeClick,
      }}
    >
      {children}
    </LudoBoardManagerContext.Provider>
  )
}

export const useLudoBoardManager = () => {
  return useContext(LudoBoardManagerContext)
}
