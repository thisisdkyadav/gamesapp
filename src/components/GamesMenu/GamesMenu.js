import React from "react"
import "./GamesMenu.css"
import GameCard from "../GameCard/GameCard"
import { useAuth } from "../../context/auth"

const GamesMenu = ({ setGame }) => {
  const { username } = useAuth()

  const loginRequireGames = ["ludo"]
  return (
    <>
      <div className="home-top-area">
        <img src="logo.svg" alt="" />
        <div>Select a game</div>
      </div>
      <div className="games-list">
        <GameCard gameInfo={{ name: "Ludo", logo: "ludo.png" }} />
        {/* <GameCard title={""} desc={""} logo={""} />
        <GameCard title={""} desc={""} logo={""} />
        <GameCard title={""} desc={""} logo={""} />
        <GameCard title={""} desc={""} logo={""} />
        <GameCard title={""} desc={""} logo={""} /> */}
      </div>
    </>
  )
}

export default GamesMenu
