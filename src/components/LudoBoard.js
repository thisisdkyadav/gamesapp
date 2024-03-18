import React from 'react'
import BigCube from './BigCube';
import CubesContainer from './CubesContainer';

const LudoBoard = ({users,turn}) => {
  return (
    <div className="ludo-board-container">
      <div className='board-cover'>
        <div className={turn===Object.keys(users)[0]?"players-details b-purple":"players-details"}><div>{Object.keys(users)[0]}</div></div>
        <div className={turn===Object.keys(users)[1]?"players-details b-purple":"players-details"}>{Object.keys(users)[1]}</div>
      </div>
    <div className="ludo-board">

      <BigCube color={'red'} />
      <CubesContainer color={"green"} orientation={"top"} />
      <BigCube color={'green'} />
      <CubesContainer color={"red"} orientation={"left"} />
      <div><div className="home-cube"></div></div>
      <CubesContainer color={"yellow"} orientation={"right"} />
      <BigCube color={'blue'} />
      <CubesContainer color={"blue"} orientation={"down"} />
      <BigCube color={'yellow'} />
      
    </div>
    <div className='board-cover'>
      <div className={turn===Object.keys(users)[3]?"players-details b-purple":"players-details"}>{Object.keys(users)[3]}</div>
      <div className={turn===Object.keys(users)[2]?"players-details b-purple":"players-details"}>{Object.keys(users)[2]}</div>
    </div>

  </div>
  )
}

export default LudoBoard