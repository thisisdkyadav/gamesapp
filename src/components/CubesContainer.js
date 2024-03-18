import React from 'react'
import Cube from './Cube'

const CubesContainer = ({ color, orientation}) => {

  let colorCode = color[0]

  return (
    <div className={`cube-container cube-container-${orientation}`}>

      <Cube id={colorCode+'b'+'1'} color={'white'} />
      <Cube id={colorCode+'b'+'2'} color={'white'} />
      <Cube id={colorCode+'b'+'3'} color={'white'} isStar={true} />
      <Cube id={colorCode+'b'+'4'} color={'white'} />
      <Cube id={colorCode+'b'+'5'} color={'white'} />
      <Cube id={colorCode+'b'+'6'} color={'white'} />
      <Cube id={colorCode+'h'+'1'} color={'white'} />
      <Cube id={colorCode+'h'+'2'} color={color} />
      <Cube id={colorCode+'h'+'3'} color={color} />
      <Cube id={colorCode+'h'+'4'} color={color} />
      <Cube id={colorCode+'h'+'5'} color={color} />
      <Cube id={colorCode+'h'+'6'} color={color} />
      <Cube id={colorCode+'a'+'1'} color={'white'} />
      <Cube id={colorCode+'a'+'2'} color={color} isStar={true} />
      <Cube id={colorCode+'a'+'3'} color={'white'} />
      <Cube id={colorCode+'a'+'4'} color={'white'} />
      <Cube id={colorCode+'a'+'5'} color={'white'} />
      <Cube id={colorCode+'a'+'6'} color={'white'} />

    </div>

  )
}

export default CubesContainer