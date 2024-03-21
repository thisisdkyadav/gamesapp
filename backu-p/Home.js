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


  const [status, setStatus] = useState(0)
  const [invites, setInvites] = useState({})
  const [logedUser, setLogedUser] = useState('')
  const [username, setUsername] = useState('')
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


  })
  const navigate = useNavigate();


  const setBoard = () => {
    setGameState({
      ...gameState, r: {
        a: 'gb4',
        b: 'yb4',
        c: 'ba3',
        d: 'gb4',

      }
    })
  }

  const logoutUser = () => {
    signOut(auth);

  }

  const handleCubeClick = (id) => {

    setGameState({
      ...gameState, b: {
        a: id,
        b: 'bi1',
        c: 'bi2',
        d: 'bi3',

      }
    })


  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogedUser(user.email);
      } else { navigate("/login"); }
    });


    return () => unsubscribe();
  }, [])

  useEffect(() => {
    if (logedUser) {
      setUsername(logedUser.replace('.','_'))
      onValue(ref(db, 'ludo/users/' + logedUser.replace('.', '_') + '/invites'), (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setInvites(data)
        }
      });
    }
  
  }, [logedUser])
  


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

  }, [boardState])


  const [gameID, setGameID] = useState(null)
  const [gameRef, setGameRef] = useState(null)
  const inputEmail = useRef()
  const [users, setUsers] = useState({})
  const [usersStatus, setUsersStatus] = useState({})


  const createNewGame = () => {
    set(ref(db, 'ludo/games/' + logedUser.replace('.', '_')), {
      users: {
        user1: logedUser,
        user2: null,
        user3: null,
        user4: null
      },
      usersStatus: {
        user1: 'joined',
        user2: null,
        user3: null,
        user4: null
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
      result: {
        first: null,
        second: null,
        third: null,
        fourth: null
      },
      status: 'waiting',
      turn: 'user1'

    })
      .then((a) => {
        setGameID(logedUser.replace('.', '_'))
        setStatus('waiting')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const startGame = () => { 
    // if (players.length===4  ) {
    //   update(ref(db),{
    //     ['ludo/games/'+gameID+'/status']:'active'
    //   })
    // } else {
    //   alert('need 4 players to start game')
    // }
   }

  const inviteUser = () => {
    let email = inputEmail.current.value
    let userList = ['user1', 'user2', 'user3', 'user4']
    if (!email){
      alert('enter email')
    } else if (Object.values(users).indexOf(email) !== -1){
      alert('user already added')
    } else if(Object.keys(users).length === 4 && Object.values(users).findIndex(user => user === null) === -1){
      alert('game is full')
    } else{
      let user = userList.find((user)=> !users[user])
      update(ref(db), {
        ['ludo/games/' + gameID + '/users/'+user]: email,
        ['ludo/games/' + gameID + '/usersStatus/'+user]: 'invited',
        ['ludo/users/' + email.replace('.','_') + '/invites/' + logedUser.replace('.','_')]: false
      })
    }
  }

  const acceptInvite = (game) => {


    



    update(ref(db), {
      ['ludo/games/' + game + '/users/' + logedUser.replace('.', '_')]: logedUser,
      ['ludo/games/' + game + '/usersStatus/' + logedUser.replace('.', '_')]: 'joined',
      ['ludo/users/' + logedUser.replace('.', '_') + '/invites/' + game]: null
    })
  }

  useEffect(() => {
    if (gameID) {
      onValue(ref(db, 'ludo/games/' + gameID), (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setGameState(data.gameState)
          setStatus(data.status)
          setUsers(data.users)
          setUsersStatus(data.usersStatus)
        }
      });
    }

  }, [gameID])


  // useEffect(() => {
  //   if (users) {
  //     if (users.user1 !== logedUser) {
  //       Object.keys(users)
  //     }
  //   }
  
  // }, [users])
  



  const GameDetailLayout = () => {
    if (status === 'active') {
      return <div>Game is active</div>
    } else if (status === 'waiting') {
      return (
      <div>
        <input placeholder="Email" ref={inputEmail} type="email"/>
        {Object.keys(users).map((user, index) => {
          return <div key={index}>{users[user]} ({usersStatus[user]})</div>
          })
        }
        <br />
          <button onClick={inviteUser}>Add Player</button>
          <br />
        <button onClick={startGame}>Start game</button>
      </div>
      )
    } else {
      return <button onClick={createNewGame}>Start new game</button>
    }
  }

  const InvitesLayout = () => {
    if (Object.keys(invites).length > 0) {
      return (
        <div>
          <h2>Invites</h2>
          {Object.keys(invites).map((game, index) => {
            return <div key={index}>{game.replace('_','.')} <button onClick={() => acceptInvite(game)}>Accept</button> <button onClick={() => rejectInvite(game)}>Reject</button></div>
          })}
        </div>
      )
    } else {
      return <div>No invites</div>
    }
  }



  return (
    <>
      <stateContext.Provider value={{ boardState, setBoardState, handleCubeClick }}>

        {logedUser}
        <button onClick={logoutUser}>Logout</button>
        <button onClick={setBoard}>set board</button>
        <div className="main">

          <div className="invite-details">
            <InvitesLayout />
          </div>

          <div className="game-details">
            <GameDetailLayout />
          </div>



          <LudoBoard />
        </div>
      </stateContext.Provider>

    </>
  )
}

export default Home