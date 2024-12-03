const rollDice = () => {
  if (turn !== username) {
    return
  }
  if (turnStatus === ROLL) {
    rollAndSetDice()
  } else if (turnStatus === MOVE) {
    alert(MOVE)
  }
}
const rollAndSetDice = () => {
  const diceValue = Math.floor(Math.random() * 6) + 1
  setDice({ ...dice, value: diceValue, from: 1 })
}
