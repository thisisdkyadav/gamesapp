
class Pawn {
  code;
  color;
  position;
  newPosition;
  canMove;
  willMove;
  constructor(color, position, dice, code) {
    this.code = code;
    this.color = color;
    this.position = position;
    this.newPosition = position > -1 ? this.position + dice : 0;
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


const ludoAI = (boardState, dice, color, gameState) => {

  let path = {
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
  }[color]

  let pawns = {
    [color + 'a']: new Pawn(color, path.indexOf(gameState[color].a), dice, color + 'a'),
    [color + 'b']: new Pawn(color, path.indexOf(gameState[color].b), dice, color + 'b'),
    [color + 'c']: new Pawn(color, path.indexOf(gameState[color].c), dice, color + 'c'),
    [color + 'd']: new Pawn(color, path.indexOf(gameState[color].d), dice, color + 'd')
  }

  for (let i = 0; i < Object.keys(pawns).length; i++) {
    const pawn = Object.values(pawns)[i];

    if (!pawns[pawn].canMove) {
      continue;
    }

    newCube = boardState[pawn.newPosition]

    if (newCube.length && newCube[0][0] !== color && ![0, 8, 13, 21, 26, 34, 39, 47].includes(pawn.newPosition)) {
      pawns.willMove += 1000000 * newCube.length;
    }

    if (pawn.newPosition === 0) {
      pawns.willMove += 100000;
    } else if (pawn.newPosition === 56) {
      pawns.willMove += 10000;
    } else if (pawn.newPosition < 56 && pawn.newPosition > 50) {
      pawns.willMove += 1000;
    }

    if ([0, 8, 13, 21, 26, 34, 39, 47].includes(pawn.newPosition)) {
      pawns.willMove += 100;
    } else {
      let danger = 0
      for (let i = 1; i < 6; i++) {
        danger += boardState[path[newPosition - 1]].length;
      }
      pawns.willMove += 2 - danger;
    }

  }

  let max = 0;
  let maxPawn = null;
  for (let i = 0; i < Object.keys(pawns).length; i++) {
    const pawn = Object.values(pawns)[i];
    if (pawn.willMove > max && pawn.canMove) {
      max = pawn.willMove;
      maxPawn = pawn;
    }
  }

  return {pawn:maxPawn.canMove.code, newPosition:path[newPosition]}

}