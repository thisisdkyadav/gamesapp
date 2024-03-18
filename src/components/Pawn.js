import React from 'react'

const Pawn = ({color, style, id }) => {

    return (
        <div id={id} className="pawn" style={style}>
            <div className="locator" style={{backgroundImage: `url("/${color}Locator.svg")`}}></div>
        </div>
    )
}

export default Pawn