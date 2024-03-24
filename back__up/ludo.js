

    // let path = paths[gameColorCode]

    // let positionIndex = path.indexOf(position)

    // let newPositionIndex = positionIndex + dice.value
    // let newPosition = path[newPositionIndex]

    // if (newPositionIndex < 56) {

    //   // if (newPositionIndex > 50 || boardState[newPosition].length === 0 || [0, 8, 13, 21, 26, 34, 39, 47].includes(newPositionIndex) || boardState[newPosition][0][0] === gameColorCode) {
    //   //   if (dice.value === 6) {
    //   //     update(ref(db), {
    //         // ['ludo/games/' + gameID + '/gameState/' + gameColorCode + '/' + pawnCode[1]]: newPosition,
    //         // ['ludo/games/' + gameID + '/turnStatus']: 'roll'
    //       // })
    //     // } else {
    //       // update(ref(db), {
    //         // ['ludo/games/' + gameID + '/gameState/' + gameColorCode + '/' + pawnCode[1]]: newPosition,
    //         // ['ludo/games/' + gameID + '/turn']: nextUser(username),
    //         // ['ludo/games/' + gameID + '/turnStatus']: 'roll'
    //   //     })
    //   //   }
    //   // } else {
    //     // let tempPawns = boardState[newPosition]
    //     // let tempPawnUser = Object.keys(users)[colorCodeList.indexOf(tempPawns[0][0])]
    //     // let updates = {
    //       // ['ludo/games/' + gameID + '/gameState/' + gameColorCode + '/' + pawnCode[1]]: newPosition,
    //       // ['ludo/games/' + gameID + '/initialPawns/' + tempPawnUser]: initialPawns[tempPawnUser] + tempPawns.length,
    //       // ['ludo/games/' + gameID + '/turnStatus']: 'roll'
    //     // }

    //     // tempPawns.forEach((pawn) => {
    //     //   updates['ludo/games/' + gameID + '/gameState/' + pawn[0] + '/' + pawn[1]] = pawn[0] + 'i' + ['a', 'b', 'c', 'd'].indexOf(pawn[1])
    //     // })
    //     // update(ref(db), updates)
    //   }
// } 
// else if (newPositionIndex > 56 && finalPawns[username] === 3) {
//       let updates = { ['ludo/games/' + gameID + '/turnStatus']: 'roll' }

//       if (dice.value !== 6) {
//         updates['ludo/games/' + gameID + '/turn'] = nextUser(username)
//       }
//       update(ref(db), updates)
//       return 0
//     } 
    // else if (newPositionIndex === 56) {
    //   if (finalPawns[username] === 3) {
    //     update(ref(db), {
    //       // ['ludo/games/' + gameID + '/gameState/' + gameColorCode + '/' + pawnCode[1]]: (gameColorCode + 'fa'),
    //       // ['ludo/games/' + gameID + '/turn']: nextUser(username),
    //       // ['ludo/games/' + gameID + '/turnStatus']: 'roll',
    //       // ['ludo/games/' + gameID + '/finalPawns/' + username]: finalPawns[username] + 1,
    //       // ['ludo/games/' + gameID + '/results/' + username]: Object.keys(results).length
    //     })
    //   } else {
    //     update(ref(db), {
    //       // ['ludo/games/' + gameID + '/gameState/' + gameColorCode + '/' + pawnCode[1]]: (gameColorCode + 'fa'),
    //       // ['ludo/games/' + gameID + '/turnStatus']: 'roll',
    //       // ['ludo/games/' + gameID + '/finalPawns/' + username]: finalPawns[username] + 1
    //     })
    //   }
    // }


    // let paths = {
    //   r: [
    //     "ra2",
    //     "ra3",
    //     "ra4",
    //     "ra5",
    //     "ra6",
    //     "gb6",
    //     "gb5",
    //     "gb4",
    //     "gb3",
    //     "gb2",
    //     "gb1",
    //     "gh1",
    //     "ga1",
    //     "ga2",
    //     "ga3",
    //     "ga4",
    //     "ga5",
    //     "ga6",
    //     "yb6",
    //     "yb5",
    //     "yb4",
    //     "yb3",
    //     "yb2",
    //     "yb1",
    //     "yh1",
    //     "ya1",
    //     "ya2",
    //     "ya3",
    //     "ya4",
    //     "ya5",
    //     "ya6",
    //     "bb6",
    //     "bb5",
    //     "bb4",
    //     "bb3",
    //     "bb2",
    //     "bb1",
    //     "bh1",
    //     "ba1",
    //     "ba2",
    //     "ba3",
    //     "ba4",
    //     "ba5",
    //     "ba6",
    //     "rb6",
    //     "rb5",
    //     "rb4",
    //     "rb3",
    //     "rb2",
    //     "rb1",
    //     "rh1",
    //     "rh2",
    //     "rh3",
    //     "rh4",
    //     "rh5",
    //     "rh6"
    //   ],
    //   g: [
    //     "ga2",
    //     "ga3",
    //     "ga4",
    //     "ga5",
    //     "ga6",
    //     "yb6",
    //     "yb5",
    //     "yb4",
    //     "yb3",
    //     "yb2",
    //     "yb1",
    //     "yh1",
    //     "ya1",
    //     "ya2",
    //     "ya3",
    //     "ya4",
    //     "ya5",
    //     "ya6",
    //     "bb6",
    //     "bb5",
    //     "bb4",
    //     "bb3",
    //     "bb2",
    //     "bb1",
    //     "bh1",
    //     "ba1",
    //     "ba2",
    //     "ba3",
    //     "ba4",
    //     "ba5",
    //     "ba6",
    //     "rb6",
    //     "rb5",
    //     "rb4",
    //     "rb3",
    //     "rb2",
    //     "rb1",
    //     "rh1",
    //     "ra1",
    //     "ra2",
    //     "ra3",
    //     "ra4",
    //     "ra5",
    //     "ra6",
    //     "gb6",
    //     "gb5",
    //     "gb4",
    //     "gb3",
    //     "gb2",
    //     "gb1",
    //     "gh1",
    //     "gh2",
    //     "gh3",
    //     "gh4",
    //     "gh5",
    //     "gh6"
    //   ],
    //   y: [
    //     "ya2",
    //     "ya3",
    //     "ya4",
    //     "ya5",
    //     "ya6",
    //     "bb6",
    //     "bb5",
    //     "bb4",
    //     "bb3",
    //     "bb2",
    //     "bb1",
    //     "bh1",
    //     "ba1",
    //     "ba2",
    //     "ba3",
    //     "ba4",
    //     "ba5",
    //     "ba6",
    //     "rb6",
    //     "rb5",
    //     "rb4",
    //     "rb3",
    //     "rb2",
    //     "rb1",
    //     "rh1",
    //     "ra1",
    //     "ra2",
    //     "ra3",
    //     "ra4",
    //     "ra5",
    //     "ra6",
    //     "gb6",
    //     "gb5",
    //     "gb4",
    //     "gb3",
    //     "gb2",
    //     "gb1",
    //     "gh1",
    //     "ga1",
    //     "ga2",
    //     "ga3",
    //     "ga4",
    //     "ga5",
    //     "ga6",
    //     "yb6",
    //     "yb5",
    //     "yb4",
    //     "yb3",
    //     "yb2",
    //     "yb1",
    //     "yh1",
    //     "yh2",
    //     "yh3",
    //     "yh4",
    //     "yh5",
    //     "yh6"
    //   ],
    //   b: [
    //     "ba2",
    //     "ba3",
    //     "ba4",
    //     "ba5",
    //     "ba6",
    //     "rb6",
    //     "rb5",
    //     "rb4",
    //     "rb3",
    //     "rb2",
    //     "rb1",
    //     "rh1",
    //     "ra1",
    //     "ra2",
    //     "ra3",
    //     "ra4",
    //     "ra5",
    //     "ra6",
    //     "gb6",
    //     "gb5",
    //     "gb4",
    //     "gb3",
    //     "gb2",
    //     "gb1",
    //     "gh1",
    //     "ga1",
    //     "ga2",
    //     "ga3",
    //     "ga4",
    //     "ga5",
    //     "ga6",
    //     "yb6",
    //     "yb5",
    //     "yb4",
    //     "yb3",
    //     "yb2",
    //     "yb1",
    //     "yh1",
    //     "ya1",
    //     "ya2",
    //     "ya3",
    //     "ya4",
    //     "ya5",
    //     "ya6",
    //     "bb6",
    //     "bb5",
    //     "bb4",
    //     "bb3",
    //     "bb2",
    //     "bb1",
    //     "bh1",
    //     "bh2",
    //     "bh3",
    //     "bh4",
    //     "bh5",
    //     "bh6"
    //   ]
    // }

    
//   const takeOut = (id) => {
//     if (dice.value === 6) {
//       update(ref(db), {
//         ['ludo/games/' + gameID + '/gameState/' + gameColorCode + '/' + boardState[id].find((pawn) => pawn[0] === gameColorCode)[1]]: gameColorCode + 'a2',
//         ['ludo/games/' + gameID + '/turnStatus']: 'roll',
//         ['ludo/games/' + gameID + '/initialPawns/' + username]: (initialPawns[username] - 1)
//       })
//     } else if (initialPawns[username] + finalPawns[username] === 4) {
//       update(ref(db), {
//         ['ludo/games/' + gameID + '/turn']: nextUser(username),
//         ['ludo/games/' + gameID + '/turnStatus']: 'roll'
//       })
//     }

//   }