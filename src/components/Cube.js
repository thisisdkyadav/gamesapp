import React from 'react'
import Pawn from './Pawn'
import { useContext, useEffect, useState } from 'react'
import { stateContext } from '../context/context'

const Cube = ({color, isStar=false,id,pawnsOnCube=0}) => {

  const gbl = useContext(stateContext)

  let colorObj = {
    r: 'red',
    g: 'green',
    y: 'yellow',
    b: 'blue'
  }

   const [noOfPawns, setNoOfPawns] = useState(pawnsOnCube)
   const [pawns, setPawns] = useState([])

  useEffect(() => {
    if (gbl.boardState) {
      setNoOfPawns(gbl.boardState[id].length);
      setPawns(gbl.boardState[id]);
    }
  }, [gbl.boardState]);

  return (
    <>
    <div id={id} onClick={()=>gbl.handleCubeClick(id)} className={`cube b-${color} ${ isStar ?'star':''}`} >
      
    {noOfPawns > 0 &&
        pawns.map((pawn, index) => (
            
            <Pawn
              key={id+'-'+index}
              color={colorObj[pawn[0]]}
              // position={position}
              id={pawn}
              style={{
                position: 'absolute',
                bottom:  index * 3, // Adjust vertical spacing
                left: index * 2, // Adjust horizontal spacing (optional)
                zIndex: 100 - index, // Higher z-index for top pawns
                width: 43 - noOfPawns*3,
                height: 42 - noOfPawns*2

              }}
            />
          ))}

    </div>

  </>) 
}

export default Cube