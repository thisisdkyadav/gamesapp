import React from "react"
import { useContext } from "react"
import { ludoContext } from "../context/context"
import { useLudo } from "../context/ludo"

const Pawn = ({ color, style, id, hide = false }) => {
  const { colorsUser } = useLudo()
  // const { colorsUser } = useContext(ludoContext)

  return (
    <>
      {id && id !== "" && colorsUser[color[0]] && !hide ? (
        <div id={id} className="pawn" style={style}>
          <img className="locator" src={`${color}Locator.svg`}></img>
        </div>
      ) : (
        ""
      )}
    </>
  )
}

export default Pawn
