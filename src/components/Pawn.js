import React from 'react'

const Pawn = ({color, style, id }) => {

    return (
        <div id={id} className="pawn" style={style}>
            {/* <div className="locator" style={{backgroundImage: `url("/${color}Locator.svg")`}}></div> */}
            <img className="locator" src={`${color}Locator.svg`}></img>
        </div>
    )
}

export default Pawn