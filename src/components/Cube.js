import React from 'react'
import Pawn from './Pawn'
import { useContext, useEffect, useState } from 'react'
import { stateContext } from '../context/context'

const Cube = ({color, isStar=false,id,pawnsOnCube=0,home=false,sizeRatio,setSizeRatio}) => {

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
    <div id={id} onClick={()=>gbl.handleCubeClick(id)} className={`${home?'home-cube-div':'cube'} b-${color} ${ isStar ?`${color[0]}c-star`:''} ${color}-hover`} >
      
    {noOfPawns > 0 &&
        pawns.map((pawn, index) => {
          let styles = {
              position: 'absolute',
              bottom:  (index+1)*2*sizeRatio, // Adjust vertical spacing
              left: ((index+1) * 3.7 - 4)*sizeRatio, // Adjust horizontal spacing (optional)
              zIndex: 500 - index, // Higher z-index for top pawns
              width: (43 - noOfPawns*3 -4)*sizeRatio,
              height: (42 - noOfPawns*2 -5)*sizeRatio,
            }
            if (pawn[0]===gbl.gameColorCode && gbl.isMove) {
              styles.width = styles.width*(10000**(1/styles.width))*sizeRatio
              styles.height = styles.height*(10000**(1/styles.width))*sizeRatio
              styles.left = (styles.left- 5)*sizeRatio
            }

            return (
            <Pawn
              key={id+'-'+index}
              color={colorObj[pawn[0]]}
              // position={position}
              id={pawn}
              style={styles}
            />
          )})}

    </div>

  </>) 
}

export default Cube