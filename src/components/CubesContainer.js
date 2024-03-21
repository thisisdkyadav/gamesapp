import React from 'react'
import Cube from './Cube'
import { useEffect, useState } from 'react'

const CubesContainer = ({ color, orientation}) => {

  let colorCode = color[0]

  const [sizeRatio, setSizeRatio] = useState(Math.min(window.innerHeight-70,window.innerWidth*.9,600)/600);

  useEffect(() => {
    const handleResize = () => {
      let width= window.innerWidth*.9;
      let height= window.innerHeight-70;
      
      setSizeRatio(Math.min(height,width,600)/600);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`cube-container cube-container-${orientation}`}>

      <Cube id={colorCode+'b'+'1'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'b'+'2'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'b'+'3'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} isStar={true} />
      <Cube id={colorCode+'b'+'4'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'b'+'5'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'b'+'6'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'h'+'1'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'h'+'2'} color={color} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'h'+'3'} color={color} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'h'+'4'} color={color} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'h'+'5'} color={color} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'h'+'6'} color={color} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'a'+'1'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'a'+'2'} color={color} isStar={true} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'a'+'3'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'a'+'4'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'a'+'5'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'a'+'6'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />

    </div>

  )
}

export default CubesContainer