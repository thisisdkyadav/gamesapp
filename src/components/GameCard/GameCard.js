import React from "react"
import "./GameCard.css"
import { useAuth } from "../../context/auth"

const GameCard = ({ gameInfo, authenticationRequired = false }) => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="game-card">
      <div className="game-img-div">
        <img src="ludo.png" alt="" />
      </div>
      <div className="game-info">
        <div className="game-title">{gameInfo.name}</div>
        <div className="game-play-btn">
          {isAuthenticated() ? <button>Play</button> : <button>Sign in to play</button>}
        </div>
      </div>
    </div>
  )
}

export default GameCard
