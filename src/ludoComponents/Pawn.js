import React from 'react'
import { useContext } from 'react'
import { ludoContext, appContext } from '../context/context'

const Pawn = ({color, style, id }) => {

  const {colorsUser} = useContext(ludoContext)


    return (
        <>
        {id && id !== '' && colorsUser[color[0]] ?
        <div id={id} className="pawn" style={style}>
            <img className="locator" src={`${color}Locator.svg`}></img>
        </div>
        :''}
    </>)
}

export default Pawn