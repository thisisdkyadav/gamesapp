import React from 'react'
import { auth, db } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, set, onValue, update } from "firebase/database";
import { useEffect, useState, useRef } from 'react';
import Loading from '../components/loding';
import { useNavigate } from 'react-router-dom';
import '../css/ludo.css';
import { stateContext } from '../context/context'
import LudoBoard from '../components/LudoBoard'

const Home = () => {

  let colorCodeList = ['r', 'g', 'y', 'b']

  const navigate = useNavigate();

  const [gameID, setGameID] = useState(null)
  const inputEmail = useRef()
  const [users, setUsers] = useState({})
  const [status, setStatus] = useState('')
  const [invites, setInvites] = useState({})
  const [username, setUsername] = useState('')
  const [dice, setDice] = useState({value:0,from:0})
  const [turn, setTurn] = useState('')
  const [turnStatus, setTurnStatus] = useState('')
  const [gameColorCode, setGameColorCode] = useState('')
  const [initialPawns, setInitialPawns] = useState(4)
  const [finalPawns, setFinalPawns] = useState(0)
  const [results, setResults] = useState({})
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
  const setBoard = () => {
    set(ref(db, 'ludo/games/' + username), {
      users: {
        'inrowmail@gmail_com': 'joined',
        'deveshgilyav@gmail_com': 'joined',
        'awacxo@gmail_com': 'joined',
        'itsdeveshyadav@gmail_com': 'joined'
      },
      gameState: {
        r: {
          a: 'rfa',
          b: 'rfb',
          c: 'rfc',
          d: 'rh3',
        },
        g: {
          a: 'gfa',
          b: 'gfb',
          c: 'gfc',
          d: 'gfd'
        },
        y: {
          a: 'yi0',
          b: 'yi1',
          c: 'yi2',
          d: 'yi3'
        },
        b: {
          a: 'bfa',
          b: 'bfb',
          c: 'bfc',
          d: 'bfd'
        }
      },
      status: 'active',
      turn: 'awacxo@gmail_com',
      turnStatus: 'move',
      finalPawns: { 
        'inrowmail@gmail_com': 0,
        'deveshgilyav@gmail_com': 4,
        'awacxo@gmail_com': 3,
        'itsdeveshyadav@gmail_com': 4
       },
      initialPawns: { 
        'inrowmail@gmail_com': 4,
        'deveshgilyav@gmail_com': 0,
        'awacxo@gmail_com': 0,
        'itsdeveshyadav@gmail_com': 0
       },
      dice: 4,
      results: {
        'deveshgilyav@gmail_com': 1,
        'itsdeveshyadav@gmail_com': 0
      }

    });
    
  }
  const logoutUser = () => {
    signOut(auth);
  }
  const handleCubeClick = (id) => {
    console.log('you clicked ', id, gameColorCode, turnStatus, boardState[id].findIndex((pawn) => pawn[0] === gameColorCode));
    if (turnStatus == 'move' && boardState[id].findIndex((pawn) => pawn[0] === gameColorCode) !== -1) {
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
    } else if (initialPawns[username] === 4) {
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
          ['ludo/games/' + gameID + '/gameState/' + gameColorCode + '/' + pawnCode[1]]: (gameColorCode + 'f' + pawnCode[1]),
          ['ludo/games/' + gameID + '/turn']: nextUser(username),
          ['ludo/games/' + gameID + '/turnStatus']: 'roll',
          ['ludo/games/' + gameID + '/finalPawns/' + username]: finalPawns[username] + 1,
          ['ludo/games/' + gameID + '/results/' + username]: Object.keys(results).length
        })
      } else {
        update(ref(db), {
          ['ludo/games/' + gameID + '/gameState/' + gameColorCode + '/' + pawnCode[1]]: (gameColorCode + 'f' + pawnCode[1]),
          ['ludo/games/' + gameID + '/turnStatus']: 'roll',
          ['ludo/games/' + gameID + '/finalPawns/' + username]: finalPawns[username] + 1
        })
      }
    }
  }
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
  const startGame = () => {
    if (Object.keys(users).filter(user=>users[user]==='joined').length == 4) {
      update(ref(db), {
        ['ludo/games/' + gameID + '/status']: 'active'
      })
    }
  }
  const inviteUser = () => {
    let email = inputEmail.current.value.replace('.', "_")
    let userList = ['user1', 'user2', 'user3', 'user4']
    console.log(!users[email], 'sfsdf');
    if (!email) {
      alert('enter email')
    } else if (users[email]) {
      alert('user already added')
    } else if (Object.keys(users).length === 4) {
      alert('game is full')
    } else {
      update(ref(db), {
        ['ludo/games/' + gameID + '/users/' + email]: 'invited',
        ['ludo/users/' + email + '/invites/' + username]: false
      })
    }
  }
  const acceptInvite = (game) => {
    update(ref(db), {
      ['ludo/games/' + game + '/users/' + username]: 'joined',
      ['ludo/games/' + game + '/initialPawns/' + username]: 4,
      ['ludo/games/' + game + '/finalPawns/' + username]: 0,
      ['ludo/users/' + username]: { invites: null, gameID: game }
    })
  }
  const rejectInvite = (game) => {
    update(ref(db), {
      ['ludo/games/' + game + '/users/' + username]: null,
      ['ludo/users/' + username + '/invites/' + game]: null
    })
  }
  const GameDetailLayout = () => {
    if (status === 'active') {
      return (
        <div>
          <div className='dice' onClick={rollDice}>{dice.value}</div>
          {gameColorCode}
          {turnStatus}
          {Object.keys(results).length?Object.keys(results):''}
        </div>

      )
    } else if (status === 'waiting') {
      return (
        <div>
          <input placeholder="Email" ref={inputEmail} type="email" />
          {Object.keys(users).map((user, index) => {
            return <div key={index}>{user} ({users[user]})</div>
          })
          }
          <br />
          <button onClick={inviteUser}>Add Player</button>
          <br />
          <button onClick={startGame}>Start game</button>
        </div>
      )
    } else {
      return (
        <div>
      <button onClick={createNewGame}>Start new game</button>
      <br />
      {Object.keys(results).length?Object.keys(results):''}
      </div>
      )
    }
  }
  const InvitesLayout = () => {
    if (Object.keys(invites).length > 0) {
      return (
        <div>
          <h2>Invites</h2>
          {Object.keys(invites).map((game, index) => {
            if (invites[game]) {
              return <div key={index}>{game.replace('_', '.')} (Joined)</div>

            } else {
              return <div key={index}>{game.replace('_', '.')} <button onClick={() => acceptInvite(game)}>Accept</button> <button onClick={() => rejectInvite(game)}>Reject</button></div>
            }
          })}
        </div>
      )
    } else {
      return <div>No invites</div>
    }
  }



  useEffect(() => {
    setGameColorCode(colorCodeList[Object.keys(users).indexOf(username)])
    usersRef.current = users

  }, [users])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.email.replace('.', '_'));
      } else { navigate("/login"); }
    });
    return () => unsubscribe();
  }, [])

  useEffect(() => {
    if (username) {
      onValue(ref(db, 'ludo/users/' + username), (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setGameID(data.gameID)
          if (data.invites) {
            setInvites(data.invites)
          } else { setInvites({}) }
        } else {
          setGameID(null)
          setInvites({})

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
      if (initialPawns[username] === 4) {
        takeOut(gameColorCode + 'i0')
        update(ref(db), {
          ['ludo/games/' + gameID + '/dice']: dice.value,
        })
      } else {
        update(ref(db), {
          ['ludo/games/' + gameID + '/dice']: dice.value,
          ['ludo/games/' + gameID + '/turnStatus']: 'move',
        })
      }
    }
  }, [dice])

  useEffect(() => {
    if (gameID) {
      onValue(ref(db, 'ludo/games/' + gameID), (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data) {
          if (data.status == 'finished') {
            console.log('djgfyudhgfyuid ', data.users, gameID, invites);
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
          setInitialPawns(data.initialPawns)
          setFinalPawns(data.finalPawns)
          data.results ? setResults(data.results) : setResults({})

        } else {
          // update(ref(db), {
          //   ['ludo/users/' + username + '/gameID']: null

          // })
        }
      });
    } else {
      // setUsers({})
      // setStatus('new')
    }

  }, [gameID])

  useEffect(() => {
    if (Object.keys(results).length === 3) {
      let resultsCopy = {...results}
      let gameIDCopy = gameID
      // let usersCopy = Object.keys({...users})
      console.log(resultsCopy,'---------++++',results,gameID,gameIDCopy);
      if (gameIDCopy) {
        update(ref(db), {
          ['ludo/games/' + gameIDCopy + '/status']: 'finished'
        })
      }
      let alertMessage = ''
      Object.keys(resultsCopy).forEach((user)=> {
        alertMessage+=user+': '+resultsCopy[user]+'\n'
      })
      alert(alertMessage)
    }
  
  }, [results])




  return (
    <>
      <stateContext.Provider value={{ boardState, setBoardState, handleCubeClick }}>

        {username}
        <button onClick={logoutUser}>Logout</button>
        <button onClick={setBoard}>set board</button>
        <div className="main">

          {/* <div className="invite-details">
            <InvitesLayout />
          </div> */}

          {/* <div className="game-details">
            <GameDetailLayout />
          </div> */}
          {gameState===''&&gameState==='finished'?<GameDetailLayout />:''}

          {gameState==='waiting'?<InvitesLayout />:''}


          {gameState==='active'?<LudoBoard users={users} turn={turn} />:''}
          

        </div>
      </stateContext.Provider>

    </>
  )
}

export default Home