import React from 'react'

const Pawn = ({color, style, id }) => {

    return (
        <div id={id} className="pawn" style={style}>
            <img className="locator" src={`${color}Locator.svg`}></img>
        </div>
    )
}

export default Pawn