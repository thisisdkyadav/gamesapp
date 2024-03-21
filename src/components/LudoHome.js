import React from 'react'
import Cube from './Cube'

const LudoHome = ({finalColorList}) => {
  return (<>
    <div className="home-cube">

    <div></div>
    <Cube id={`${finalColorList[3][0]}fa`} home={true} />
    <div></div>

    <Cube id={`${finalColorList[2][0]}fa`} home={true} />
    <div><img className='home-cube-image' src="home.svg" alt="" /></div>
    <Cube id={`${finalColorList[0][0]}fa`} home={true} />

    <div></div>
    <Cube id={`${finalColorList[1][0]}fa`} home={true} />
    <div></div>

    </div>

  </>)
}

export default LudoHome