import React from 'react'
import {  db } from "../config/firebase";
import { ref, onValue, update } from "firebase/database";
import { useEffect, useState, useRef, useContext  } from 'react';
import '../css/ludo.css';
import { ludoContext,appContext } from '../context/context'
import LudoBoard from '../ludoComponents/LudoBoard'
import Waiting from '../ludoComponents/Waiting';
import InitialDisplay from '../ludoComponents/InitialDisplay';
import Invites from '../ludoComponents/Invites';
import Results from '../ludoComponents/Results';
import Navbar from '../components/Navbar';

const Ludo = () => {

  const { setappStatus, username, user } = useContext(appContext)

  
  let colorCodeList = ['r', 'g', 'y', 'b']

  const [gameID, setGameID] = useState(null)
  const [showBoard, setShowBoard] = useState(false)
  const [users, setUsers] = useState({})
  const [status, setStatus] = useState('')
  const [invites, setInvites] = useState({})
  const [dice, setDice] = useState({value:0,from:0})
  const [turn, setTurn] = useState('')
  const [turnStatus, setTurnStatus] = useState('')
  const [gameColorCode, setGameColorCode] = useState('')
  const [initialPawns, setInitialPawns] = useState(4)
  const [finalPawns, setFinalPawns] = useState(0)
  const [results, setResults] = useState({})
  const [preResult, setPreResult] = useState([])
  const [usersDice, setUsersDice] = useState({})
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
  const [boardState, setBoardState] = useState({
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


  })


  const usersRef = useRef()


  const rollDice = () => {
    if (turn === username) {
      if (turnStatus === 'roll') {
        let n = Math.floor(Math.random() * 6) + 1;
        setDice({...dice,value:n,from:1})
      } else if (turnStatus === 'move') {
        alert('move')
      }
    } else {
      alert('not your turn')
    }
  }
  const handleCubeClick = (id) => {
    if (turn===username && turnStatus == 'move' && boardState[id].findIndex((pawn) => pawn[0] === gameColorCode) !== -1) {
      if (id[1] !== 'i') {
        move(id)
      } else if (id[1] === 'i') {
        takeOut(id)
      } else {
        alert('invalid move')
      }
    }
  }
  const nextUser = (toWhom) => { 
    let tempUser = Object.keys(users)[(Object.keys(users).indexOf(toWhom) + 1) % 4]
    if (Object.keys(results).includes(tempUser)) {
      return nextUser(tempUser)
    } else {
      return tempUser
    }

   }
  const takeOut = (id) => {
    if (dice.value === 6) {
      update(ref(db), {
        ['ludo/games/' + gameID + '/gameState/' + gameColorCode + '/' + boardState[id].find((pawn) => pawn[0] === gameColorCode)[1]]: gameColorCode + 'a2',
        ['ludo/games/' + gameID + '/turnStatus']: 'roll',
        ['ludo/games/' + gameID + '/initialPawns/' + username]: (initialPawns[username] - 1)
      })
    } else if (initialPawns[username] + finalPawns[username] === 4) {
      update(ref(db), {
        ['ludo/games/' + gameID + '/turn']: nextUser(username),
        ['ludo/games/' + gameID + '/turnStatus']: 'roll'
      })
    }

  }
  const move = (position) => {
    let pawnCode = boardState[position].find((pawn) => pawn[0] === gameColorCode)
    let paths = {
      r: [
        "ra2",
        "ra3",
        "ra4",
        "ra5",
        "ra6",
        "gb6",
        "gb5",
        "gb4",
        "gb3",
        "gb2",
        "gb1",
        "gh1",
        "ga1",
        "ga2",
        "ga3",
        "ga4",
        "ga5",
        "ga6",
        "yb6",
        "yb5",
        "yb4",
        "yb3",
        "yb2",
        "yb1",
        "yh1",
        "ya1",
        "ya2",
        "ya3",
        "ya4",
        "ya5",
        "ya6",
        "bb6",
        "bb5",
        "bb4",
        "bb3",
        "bb2",
        "bb1",
        "bh1",
        "ba1",
        "ba2",
        "ba3",
        "ba4",
        "ba5",
        "ba6",
        "rb6",
        "rb5",
        "rb4",
        "rb3",
        "rb2",
        "rb1",
        "rh1",
        "rh2",
        "rh3",
        "rh4",
        "rh5",
        "rh6"
      ],
      g: [
        "ga2",
        "ga3",
        "ga4",
        "ga5",
        "ga6",
        "yb6",
        "yb5",
        "yb4",
        "yb3",
        "yb2",
        "yb1",
        "yh1",
        "ya1",
        "ya2",
        "ya3",
        "ya4",
        "ya5",
        "ya6",
        "bb6",
        "bb5",
        "bb4",
        "bb3",
        "bb2",
        "bb1",
        "bh1",
        "ba1",
        "ba2",
        "ba3",
        "ba4",
        "ba5",
        "ba6",
        "rb6",
        "rb5",
        "rb4",
        "rb3",
        "rb2",
        "rb1",
        "rh1",
        "ra1",
        "ra2",
        "ra3",
        "ra4",
        "ra5",
        "ra6",
        "gb6",
        "gb5",
        "gb4",
        "gb3",
        "gb2",
        "gb1",
        "gh1",
        "gh2",
        "gh3",
        "gh4",
        "gh5",
        "gh6"
      ],
      y: [
        "ya2",
        "ya3",
        "ya4",
        "ya5",
        "ya6",
        "bb6",
        "bb5",
        "bb4",
        "bb3",
        "bb2",
        "bb1",
        "bh1",
        "ba1",
        "ba2",
        "ba3",
        "ba4",
        "ba5",
        "ba6",
        "rb6",
        "rb5",
        "rb4",
        "rb3",
        "rb2",
        "rb1",
        "rh1",
        "ra1",
        "ra2",
        "ra3",
        "ra4",
        "ra5",
        "ra6",
        "gb6",
        "gb5",
        "gb4",
        "gb3",
        "gb2",
        "gb1",
        "gh1",
        "ga1",
        "ga2",
        "ga3",
        "ga4",
        "ga5",
        "ga6",
        "yb6",
        "yb5",
        "yb4",
        "yb3",
        "yb2",
        "yb1",
        "yh1",
        "yh2",
        "yh3",
        "yh4",
        "yh5",
        "yh6"
      ],
      b: [
        "ba2",
        "ba3",
        "ba4",
        "ba5",
        "ba6",
        "rb6",
        "rb5",
        "rb4",
        "rb3",
        "rb2",
        "rb1",
        "rh1",
        "ra1",
        "ra2",
        "ra3",
        "ra4",
        "ra5",
        "ra6",
        "gb6",
        "gb5",
        "gb4",
        "gb3",
        "gb2",
        "gb1",
        "gh1",
        "ga1",
        "ga2",
        "ga3",
        "ga4",
        "ga5",
        "ga6",
        "yb6",
        "yb5",
        "yb4",
        "yb3",
        "yb2",
        "yb1",
        "yh1",
        "ya1",
        "ya2",
        "ya3",
        "ya4",
        "ya5",
        "ya6",
        "bb6",
        "bb5",
        "bb4",
        "bb3",
        "bb2",
        "bb1",
        "bh1",
        "bh2",
        "bh3",
        "bh4",
        "bh5",
        "bh6"
      ]
    }
    let path = paths[gameColorCode]

    let positionIndex = path.indexOf(position)

    let newPositionIndex = positionIndex + dice.value
    let newPosition = path[newPositionIndex]

    if (newPositionIndex < 56) {

      if (newPositionIndex > 50 || boardState[newPosition].length === 0 || [0,8,13,21,26,34,39,47].includes(newPositionIndex) || boardState[newPosition][0][0] === gameColorCode) {
        if (dice.value === 6) {
          update(ref(db), {
            ['ludo/games/' + gameID + '/gameState/' + gameColorCode + '/' + pawnCode[1]]: newPosition,
            ['ludo/games/' + gameID + '/turnStatus']: 'roll'
          })
        } else {
          update(ref(db), {
            ['ludo/games/' + gameID + '/gameState/' + gameColorCode + '/' + pawnCode[1]]: newPosition,
            ['ludo/games/' + gameID + '/turn']: nextUser(username),
            ['ludo/games/' + gameID + '/turnStatus']: 'roll'
          })
        }
      } else {
        let tempPawns = boardState[newPosition]
        let tempPawnUser = Object.keys(users)[colorCodeList.indexOf(tempPawns[0][0])]
        let updates = {
          ['ludo/games/' + gameID + '/gameState/' + gameColorCode + '/' + pawnCode[1]]: newPosition,
          ['ludo/games/' + gameID + '/initialPawns/'+tempPawnUser]: initialPawns[tempPawnUser] + tempPawns.length,
          ['ludo/games/' + gameID + '/turnStatus']: 'roll'
        }

        tempPawns.forEach((pawn)=>{
          updates['ludo/games/' + gameID + '/gameState/' + pawn[0] + '/' + pawn[1]]= pawn[0]+'i'+['a','b','c','d'].indexOf(pawn[1])
        })
        update(ref(db), updates)
      }
    } else if (newPositionIndex > 56 && finalPawns[username]===3) {
      let updates =  {['ludo/games/' + gameID + '/turnStatus']: 'roll'}

      if (dice.value !== 6) {
        updates['ludo/games/' + gameID + '/turn']= nextUser(username)
      }
      update(ref(db),updates)
      return 0
    } else if(newPositionIndex===56) {
      if (finalPawns[username] === 3) {
        update(ref(db), {
          ['ludo/games/' + gameID + '/gameState/' + gameColorCode + '/' + pawnCode[1]]: (gameColorCode + 'fa'),
          ['ludo/games/' + gameID + '/turn']: nextUser(username),
          ['ludo/games/' + gameID + '/turnStatus']: 'roll',
          ['ludo/games/' + gameID + '/finalPawns/' + username]: finalPawns[username] + 1,
          ['ludo/games/' + gameID + '/results/' + username]: Object.keys(results).length
        })
      } else {
        update(ref(db), {
          ['ludo/games/' + gameID + '/gameState/' + gameColorCode + '/' + pawnCode[1]]: (gameColorCode + 'fa'),
          ['ludo/games/' + gameID + '/turnStatus']: 'roll',
          ['ludo/games/' + gameID + '/finalPawns/' + username]: finalPawns[username] + 1
        })
      }
    }
  }

const exitGame = () => { 
  // let updates = {
  //   ['ludo/users/' + username + '/gameID']: null,
  //   ['ludo/games/' + gameID + '/users/' + username]: null,
  //   ['ludo/games/' + gameID + '/invites/' + username]: null
  // }
  // update(ref(db), updates)
 }

const resumeGame = () => { 
  if (gameID) {
    setShowBoard(true)
  } else {
    setStatus('ludo-no-game')
  }
 }


  useEffect(() => {
    if (users) {
      setGameColorCode(colorCodeList[Object.keys(users).indexOf(username)])
      usersRef.current = users
      
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
    let colorList = ['r', 'g', 'y', 'b']

    let tempState = {
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
    colorList.forEach(color => {
      tempState[gameState[color].a].push(color + 'a')
      tempState[gameState[color].b].push(color + 'b')
      tempState[gameState[color].c].push(color + 'c')
      tempState[gameState[color].d].push(color + 'd')

    });
    setBoardState(tempState)

  }, [gameState])

  useEffect(() => { 
    if (dice.value && turnStatus === 'roll' && dice.from ) {
      if (initialPawns[username] + finalPawns[username] === 4 && finalPawns[username] !== 4) {
        takeOut(Object.values(gameState[gameColorCode]).find(position=>position[1]==='i'))
        update(ref(db), {
          ['ludo/games/' + gameID + '/dice']: dice.value,
          ['ludo/games/' + gameID + '/usersDice/'+username]: dice.value,
        })
      } else if ((initialPawns[username] ===0  && finalPawns[username] === 3)||((initialPawns[username] + finalPawns[username] === 3) && (dice.value !== 6))) {
        move(Object.values(gameState[gameColorCode]).find(position=>position[1]!=='i'&&position[1]!=='f'))
        update(ref(db), {
          ['ludo/games/' + gameID + '/dice']: dice.value,
          ['ludo/games/' + gameID + '/usersDice/'+username]: dice.value
        })
      } else {
        update(ref(db), {
          ['ludo/games/' + gameID + '/dice']: dice.value,
          ['ludo/games/' + gameID + '/usersDice/'+username]: dice.value,
          ['ludo/games/' + gameID + '/turnStatus']: 'move',
        })
      }
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
          setDice({...dice,value:data.dice, from: 0})
          setUsersDice(data.usersDice)
          setInitialPawns(data.initialPawns)
          setFinalPawns(data.finalPawns)
          data.results ? setResults(data.results) : setResults({})

        } else {
          update(ref(db), {
            ['ludo/users/' + username + '/gameID']: null
            
          })
        }
      });
    } else {
      // setUsers({})
    }

  }, [gameID])

  useEffect(() => {
    if (Object.keys(results).length === 3) {
      let resultsCopy = {...results}
      let gameIDCopy = gameID
      let usersCopy = Object.keys({...users})
      usersCopy.forEach((user)=>{
        if (!Object.keys(resultsCopy).includes(user)) {
          resultsCopy[user]=3
        }
      })
      if (gameIDCopy) {
        update(ref(db), {
          ['ludo/games/' + gameIDCopy + '/status']: 'finished'
        })
      }
      let resultList = []
      for (let i = 0; i < 4; i++) {
        resultList.push(Object.keys(resultsCopy).find(user => resultsCopy[user] === i))
        
      }
      
      setPreResult(resultList)
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
        break;
      case 'finished':
        setappStatus('ludo-finished')
        break;
      case '':
        setappStatus('loading')
        break;
      default:
        setappStatus('ludo-defult')
        break;
    }

  }, [status])



  return (
    <>
    
    <Navbar user={user} exit={status==='active'?exitGame:null} />
    <div className="main">
    <ludoContext.Provider value={{ 
      boardState, 
      setBoardState, 
      handleCubeClick, 
      gameColorCode, 
      isMove :(turn===username&& turnStatus==='move'),
      usersDice,
      turn,
      turnStatus,
      rollDice,
      }}>
    {status!=='active' && Object.keys(invites).length > 0?<Invites invites={invites} username={username} />:''}

    {['', 'finished', 'ludo-no-game','active'].includes(status)?<InitialDisplay username={username} status={status } resumeGame={resumeGame} />:''}

    {preResult.length?<Results preResult={preResult} />:''}

    {status==='waiting'?<Waiting gameID={gameID} users={users} username={username} />:''}

    {showBoard?<LudoBoard users={users} turn={turn} username={username} rollDice={rollDice} turnStatus={turnStatus} usersDice={usersDice} />:''}
    
    </ludoContext.Provider>
    </div>
    </>
  )
}

export default Ludo