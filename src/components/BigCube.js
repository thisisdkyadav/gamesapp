import React from 'react'
import Pawn from './Pawn'
import { useEffect, useState, useContext } from 'react'
import { stateContext } from '../context/context'


const BigCube = ({ color }) => {

  const gbl = useContext(stateContext)
  let colorCode = color[0]

  const [pawnList, setPawnList] = useState(['', '', '', ''])

  useEffect(() => {
    if (gbl.boardState) {
      let pawnListCopy = [...pawnList];

      for (let i = 0; i < pawnListCopy.length; i++) {
        pawnListCopy[i] = gbl.boardState[colorCode + 'i' + i][0]
      }
      setPawnList(pawnListCopy);
    }
  }, [gbl.boardState]);


  return (
    <div className="big-cube" style={{ backgroundColor: `var(--${color})` }}>
      <div className="big-cube-content">
        {pawnList.map((pawn, index) => (
          <div onClick={() => gbl.handleCubeClick(colorCode + 'i' + index)} key={colorCode + 'i' + index + '-' + index} id={colorCode + 'i' + index} className={`big-cube-circle b-${color}`}>
            {(pawn != '') && (pawn) && (<Pawn id={pawn} color={color} />)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BigCube