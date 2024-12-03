import React from "react"
import "../css/ludo.css"
import Ludo from "../games/Ludo"
import GamesMenu from "../components/GamesMenu/GamesMenu"
import { useState } from "react"

const Home = () => {
  const [game, setGame] = useState(null)

  return (
    <>
      {!game && <GamesMenu setGame={setGame} />}

      {game === "ludo" && <Ludo />}
      {/* <Ludo /> */}
    </>
  )
}

export default Home
