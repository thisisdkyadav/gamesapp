

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
    "rh6",
    "rfa"
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
    "gh6",
    "gfa"
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
    "yh6",
    "yfa"
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
    "bh6",
    "bfa"
  ]
}

let pawnList = ['a', 'b', 'c', 'd']


class Pawn {
  code;
  color;
  position;
  newPosition;
  newPositionID;
  canMove;
  willMove;
  constructor(color, positionID, dice, code) {
    this.code = code;
    this.color = color;
    this.positionID = positionID;
    this.position =  paths[color].indexOf(this.positionID);
    this.newPosition = this.position > -1 ? this.position + dice : dice===6?0:this.position;
    this.newPositionID = this.newPosition>-1 && this.newPosition<57?paths[color][this.newPosition]:color+'i'+pawnList[code[1]];
    this.canMove = this.checkIfCanMove(dice);
  }

  checkIfCanMove = (dice) => {
    if (this.newPosition > 56 || (this.position < 0 && dice !== 6)) {
      this.willMove = -1000
      return false;
    }
    this.willMove = 0
    return true;
  }
}


const ludoAI = (boardState, dice, color, gameState, isBot=false, pawnRequired=null) => {

  let path = paths[color]

  let pawns = {}

  // let pawns = {
  //   [color + 'a']: new Pawn(color, path.indexOf(gameState[color].a), dice, color + 'a'),
  //   [color + 'b']: new Pawn(color, path.indexOf(gameState[color].b), dice, color + 'b'),
  //   [color + 'c']: new Pawn(color, path.indexOf(gameState[color].c), dice, color + 'c'),
  //   [color + 'd']: new Pawn(color, path.indexOf(gameState[color].d), dice, color + 'd')
  // }

  pawnList.forEach((code)=>{
    pawns[color + code]=new Pawn(color, gameState[color][code], dice, color + code)
  })

  for (let i = 0; i < Object.keys(pawns).length; i++) {
    const pawn = Object.values(pawns)[i];

    if (!pawn.canMove) {
      continue;
    }

    let newCube = boardState[pawn.newPositionID]

    if (newCube.length && newCube[0][0] !== color && ![0, 8, 13, 21, 26, 34, 39, 47].includes(pawn.newPosition)) {
      pawn.willMove += 1000000 * newCube.length;
    }

    if (pawn.newPosition === 0) {
      console.log('dfdfdfdfdfdfdfdfd');
      
      pawn.willMove += 100000;
    } else if (pawn.newPosition === 56) {
      pawn.willMove += 10000;
    } else if (pawn.newPosition < 56 && pawn.newPosition > 50) {
      pawn.willMove += 1000;
    }

    if ([0, 8, 13, 21, 26, 34, 39, 47].includes(pawn.newPosition)) {
      pawn.willMove += 100;
    } else {
      let danger = 0
      for (let i = 1; i < 7; i++) {
        let checkPoint = pawn.newPosition - i;
        if (checkPoint>-1) {
          danger += boardState[path[pawn.newPosition - i]].length;
        }
      }
      pawn.willMove += 2 - danger;
    }

  }

  let max = -500;
  let maxPawn = null;
  for (let i = 0; i < Object.keys(pawns).length; i++) {
    const pawn = Object.values(pawns)[i];
    if (pawn.canMove && pawn.willMove > max) {
      max = pawn.willMove;
      maxPawn = pawn;
    }
  }
  console.log(pawns);
  if (isBot) {
    return {movables:Object.values(pawns).filter((pawn)=>pawn.canMove).length,pawn:maxPawn?maxPawn:{canMove:false}}
    // return {pawn:maxPawn.code, newPosition:path[maxPawn.newPosition], canMove:maxPawn.canMove}
  } else {
    return {movables:Object.values(pawns).filter((pawn)=>pawn.canMove).length, pawn:pawns[pawnRequired]}
  }

}

// export ludoAI function
export default ludoAI;