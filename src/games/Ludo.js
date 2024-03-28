import React from 'react'
import { db } from "../config/firebase";
import { ref, onValue, update } from "firebase/database";
import { useEffect, useState, useRef, useContext } from 'react';
import '../css/ludo.css';
import { ludoContext, appContext } from '../context/context'
import LudoBoard from '../ludoComponents/LudoBoard'
import Waiting from '../ludoComponents/Waiting';
import InitialDisplay from '../ludoComponents/InitialDisplay';
import Invites from '../ludoComponents/Invites';
import Results from '../ludoComponents/Results';
import Navbar from '../components/Navbar';
import ludoAI from '../ai/ludoAI';
import Alert from '../components/Alert';

const Ludo = () => {

  const { setappStatus, username, user } = useContext(appContext)


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


  let colorCodeList = ['r', 'g', 'y', 'b']

  const [popup, setPopup] = useState({show: false, message:'', handleCancel:null, handleConfirm:null, confirmText:'Continue', cancelText:'Cancel'})
  const [gameID, setGameID] = useState(null)
  const [bots, setBots] = useState({})
  const [noOfUsers, setNoOfUsers] = useState(4)
  const [showBoard, setShowBoard] = useState(false)
  const [users, setUsers] = useState({})
  const [status, setStatus] = useState('')
  const [invites, setInvites] = useState({})
  const [dice, setDice] = useState({ value: 0, from: 0 })
  const [turn, setTurn] = useState('')
  const [turnStatus, setTurnStatus] = useState('')
  const [gameColorCode, setGameColorCode] = useState('')
  const [initialPawns, setInitialPawns] = useState(4)
  const [finalPawns, setFinalPawns] = useState(0)
  const [results, setResults] = useState({})
  const [preResult, setPreResult] = useState([])
  const [usersDice, setUsersDice] = useState({})
  const [colorsUser, setColorsUser] = useState({
    r: null,
    g: null,
    y: null,
    b: null
  })
  const [gameState, setGameState] = useState({
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
  })
  const [boardState, setBoardState] = useState(tempState)


  const usersRef = useRef()


  const runBot = (bot) => {

    // wait for 3 sec
    setTimeout(function () {

      console.log('After delay');
      let color = Object.keys(colorsUser).find((c) => colorsUser[c] === bot)
      let n = Math.floor(Math.random() * 6) + 1;
      // let pawn = ludoAI(boardState, n, color, gameState, true)
      move(null, bot, color, 4, true);
    }, 100);
  }
  const rollDice = () => {
    if (turn === username) {
      if (turnStatus === 'roll') {
        let n = Math.floor(Math.random() * 6) + 1;
        setDice({ ...dice, value: n, from: 1 })
      } else if (turnStatus === 'move') {
        alert('move')
      }
    } else {
      alert('not your turn')
    }
  }
  const nextUser = (toWhom) => {
    let tempUser = Object.keys(users)[(Object.keys(users).indexOf(toWhom) + 1) % Object.keys(users).length]
    if (Object.keys(results).includes(tempUser)||users[tempUser]==='leaved') {
      return nextUser(tempUser)
    } else {
      return tempUser
    }

  }
  const handleCubeClick = (id) => {
    if (turn === username && turnStatus == 'move' && boardState[id].findIndex((pawn) => pawn[0] === gameColorCode) !== -1) {
      if (id[1] !== 'i') {
        move(id)
      } else if (id[1] === 'i') {
        move(id)
      } else {
        alert('invalid move')
      }
    }
  }
  const move = (id, user = username, color = gameColorCode, vdice = dice.value, isBot = false) => {
    let pawnCode = isBot ? null : boardState[id].find((pawn) => pawn[0] === color)
    console.log(vdice, color, isBot, pawnCode)
    const { movables, pawn } = ludoAI(boardState, vdice, color, gameState, isBot, pawnCode)
    console.log(pawn, movables);

    let updates = {}

    if (isBot) {
      updates['ludo/games/' + gameID + '/dice'] = dice.value
      updates['ludo/games/' + gameID + '/usersDice/' + user] = vdice
    }

    if (pawn.canMove) {
      updates['ludo/games/' + gameID + '/gameState/' + color + '/' + pawn.code[1]] = pawn.newPositionID
      updates['ludo/games/' + gameID + '/turnStatus'] = 'roll'

      let newPositionPawns = boardState[pawn.newPositionID]

      if (newPositionPawns.length && (![0, 8, 13, 21, 26, 34, 39, 47].includes(pawn.newPosition)) && newPositionPawns[0][0] !== color) {

        let tempPawnUser = colorsUser[newPositionPawns[0][0]]
        updates['ludo/games/' + gameID + '/initialPawns/' + tempPawnUser] = initialPawns[tempPawnUser] + newPositionPawns.length
        newPositionPawns.forEach((pawn) => {
          updates['ludo/games/' + gameID + '/gameState/' + pawn[0] + '/' + pawn[1]] = pawn[0] + 'i' + ['a', 'b', 'c', 'd'].indexOf(pawn[1])
        })
      } else if (pawn.newPosition === 56) {
        if (finalPawns[user] === 3) {
          updates['ludo/games/' + gameID + '/results/' + user] = Object.keys(results).length
          updates['ludo/games/' + gameID + '/turn'] = nextUser(user)
        }
        updates['ludo/games/' + gameID + '/finalPawns/' + user] = finalPawns[user] + 1

      } else if (vdice === 6 && pawn.newPosition === 0) {
        updates['ludo/games/' + gameID + '/initialPawns/' + user] = (initialPawns[user] - 1)
      } else if (vdice !== 6) {
        updates['ludo/games/' + gameID + '/turn'] = nextUser(user)
      }

    } else if ((!movables) && vdice !== 6) {
      updates['ludo/games/' + gameID + '/turn'] = nextUser(user)
    }
    
    update(ref(db), updates)

  }
  const exitGame = () => {
    setPopup({...popup, show:true, message:'Are you sure you want to exit game;', handleCancel:()=>setPopup({...popup,show:false}), handleConfirm:()=>{
      let updates = {}
      updates['ludo/users/' + username + '/gameID'] = null
      updates['ludo/games/' + gameID + '/users/'+ username] = 'leaved'
      update(ref(db), updates)
      setPopup({...popup, show:false})
    }})
  }
  const resumeGame = () => {
    if (gameID) {
      setShowBoard(true)
    } else {
      setStatus('ludo-no-game')
    }
  }
  const showHome = () => { 
      setPopup({...popup, show:true, message:'Are you sure you want to go Home?', handleCancel:()=>setPopup({...popup,show:false}), handleConfirm:()=>{
        setPopup({...popup, show:false})
        setShowBoard(false)
      }})
   }


  useEffect(() => {
    if (users) {
      let usersList = Object.keys(users)
      if (usersList.length === 2) {
        setGameColorCode(colorCodeList[Object.keys(users).indexOf(username) * 2])
        setColorsUser({ r: usersList[0], g: null, y: usersList[1], b: null })
      } else {
        setGameColorCode(colorCodeList[Object.keys(users).indexOf(username)])
        let tempColorsUser = { r: null, g: null, y: null, b: null }
        usersList.forEach((user, index) => {
          tempColorsUser[colorCodeList[index]] = user
        })
        setColorsUser(tempColorsUser)
      }

      usersRef.current = users
      setNoOfUsers(usersList.filter((user)=>users[user]!=='leaved').length)
    } else {
      setNoOfUsers(4)
    }

  }, [users])

  useEffect(() => {
    if (username) {
      onValue(ref(db, 'ludo/users/' + username), (snapshot) => {
        const data = snapshot.val();
        if (data) {
          if (data.gameID) {
            setGameID(data.gameID)
          } else {
            setGameID(null)
            setStatus('ludo-no-game')
          }
          if (data.invites) {
            setInvites(data.invites)
          } else { setInvites({}) }
        } else {
          setGameID(null)
          setInvites({})
          setStatus('ludo-no-game')
        }
      });

    }

  }, [username])

  useEffect(() => {

    colorCodeList.forEach(color => {
      tempState[gameState[color].a].push(color + 'a')
      tempState[gameState[color].b].push(color + 'b')
      tempState[gameState[color].c].push(color + 'c')
      tempState[gameState[color].d].push(color + 'd')

    });
    setBoardState(tempState)

  }, [gameState])

  useEffect(() => {
    if (dice.value && turnStatus === 'roll' && dice.from) {
      let updates = {}

      updates['ludo/games/' + gameID + '/dice'] = dice.value
      updates['ludo/games/' + gameID + '/usersDice/' + username] = dice.value

      if (initialPawns[username] + finalPawns[username] === 4 && finalPawns[username] !== 4) {
        move(Object.values(gameState[gameColorCode]).find(position => position[1] === 'i'))

      } else if ((initialPawns[username] === 0 && finalPawns[username] === 3) || ((initialPawns[username] + finalPawns[username] === 3) && (dice.value !== 6))) {
        move(Object.values(gameState[gameColorCode]).find(position => position[1] !== 'i' && position[1] !== 'f'))

      } else {
        updates['ludo/games/' + gameID + '/turnStatus'] = 'move'
      }
      update(ref(db), updates)
    }
  }, [dice])

  useEffect(() => {
    if (gameID) {
      onValue(ref(db, 'ludo/games/' + gameID), (snapshot) => {
        const data = snapshot.val();
        if (data) {
          if (data.status == 'finished') {
            let updates = {}
            updates['ludo/users/' + username + '/gameID'] = null
            Object.keys(data.users).filter((user) => data.users[user] === 'invited').forEach((user) => {
              updates['ludo/users/' + user + '/invites/' + gameID] = null
            })
            update(ref(db), updates)
          }
          setGameState(data.gameState)
          setStatus(data.status)
          setUsers(data.users)
          setTurn(data.turn)
          setTurnStatus(data.turnStatus)
          setDice({ ...dice, value: data.dice, from: 0 })
          setUsersDice(data.usersDice)
          setInitialPawns(data.initialPawns)
          setFinalPawns(data.finalPawns)
          data.results ? setResults(data.results) : setResults({})
          data.bots ? setBots(data.bots) : setBots({})

        } else {
          update(ref(db), {
            ['ludo/users/' + username + '/gameID']: null
          })
        }
      });
    } else {
      // setUsers({})
      setShowBoard(false)
    }

  }, [gameID])

  useEffect(() => {
    let botsList = Object.keys(bots)
    setTimeout(() => {
    if (botsList.length && botsList.includes(turn) && bots[turn]===username) {
      runBot(turn)
    }
    }, 1500);
  }, [bots])
  
  useEffect(() => {
    if (Object.keys(results).length === noOfUsers - 1 && Object.keys(results).length) {
      let resultsCopy = { ...results }
      let gameIDCopy = gameID
      let usersCopy = { ...users }
      let usersList = Object.keys(usersCopy)
      usersList.forEach((user) => {
        if (!Object.keys(resultsCopy).includes(user)&&usersCopy[user]!=='leaved') {
          resultsCopy[user] = noOfUsers - 1
        }
      })
      let resultList = []
      console.log(resultsCopy);
      for (let i = 0; i < Object.keys(resultsCopy).length; i++) {
        resultList.push(Object.keys(resultsCopy).find(user => resultsCopy[user] === i))


      }
      setPreResult(resultList)

      if (gameIDCopy) {
        update(ref(db), {
          ['ludo/games/' + gameIDCopy + '/status']: 'finished'
        })
      }
    }

  }, [results])
  
  useEffect(() => {
    switch (status) {
      case 'ludo-no-game':
        setappStatus('ludo-initial')
        break;
      case 'waiting':
        setappStatus('ludo-waiting')
        break;
      case 'active':
        setappStatus('ludo-active')
        setShowBoard(true)
        break;
      case 'finished':
        setShowBoard(false)
        setappStatus('ludo-finished')
        break;
      case 'loading':
        setappStatus('loading')
        break;
      case '':
        setappStatus('loading')
        break;
      default:
        setappStatus('ludo-defult')
        break;
    }

  }, [status])

  console.log(noOfUsers);
  console.log(colorsUser,gameColorCode);
  


  return (
    <>
      {popup.show?<Alert data={popup} />:''}
      <Navbar user={user} exitGame={status === 'active' ? exitGame : null} showHome={showHome} />
      <div className="main">
        <ludoContext.Provider value={{
          boardState,
          setBoardState,
          handleCubeClick,
          gameColorCode,
          isMove: (turn === username && turnStatus === 'move'),
          usersDice,
          turn,
          turnStatus,
          rollDice,
          colorsUser,
          users
        }}>
          {status !== 'active' && Object.keys(invites).length > 0 ? <Invites invites={invites} username={username} /> : ''}

          {['', 'finished', 'ludo-no-game', 'active'].includes(status) && !showBoard ? <InitialDisplay username={username} status={status} resumeGame={resumeGame} /> : ''}

          {preResult.length && Object.keys(results).length ? <Results preResult={preResult} setResults={setResults} /> : ''}

          {status === 'waiting' ? <Waiting gameID={gameID} users={users} username={username} /> : ''}

          {showBoard ? <LudoBoard users={users} noOfUsers={noOfUsers} /> : ''}

        </ludoContext.Provider>
      </div>
    </>
  )
}

export default Ludo