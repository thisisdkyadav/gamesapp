import React from 'react'
import Pawn from './Pawn'
import { useContext, useEffect, useState } from 'react'
import { ludoContext } from '../context/context'

const Cube = ({color, isStar=false,id,pawnsOnCube=0,home=false,sizeRatio,setSizeRatio}) => {

  const { boardState, handleCubeClick, gameColorCode, isMove, users, colorsUser } = useContext(ludoContext)

  let colorObj = {
    r: 'red',
    g: 'green',
    y: 'yellow',
    b: 'blue'
  }

   const [noOfPawns, setNoOfPawns] = useState(pawnsOnCube)
   const [pawns, setPawns] = useState([])

  useEffect(() => {
    if (boardState) {
      setNoOfPawns(boardState[id].length);
      setPawns(boardState[id]);
    }
  }, [boardState]);

  const handleClick = (id) => { 
    if (!home) {
      handleCubeClick(id)
    }
   }
  
  return (
    <>
    <div id={id} onClick={()=>handleClick(id)} className={`${home?'home-cube-div':'cube'} b-${color} ${ isStar ?`${color[0]}c-star`:''} ${color}-hover`} >
      
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
            if (pawn[0]===gameColorCode && isMove) {
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
              hide={users[colorsUser[pawn[0]]]==='leaved'}
            />
          )})}

    </div>

  </>) 
}

export default Cube