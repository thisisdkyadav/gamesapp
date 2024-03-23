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

      <Cube id={colorCode+'b1'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'b2'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'b3'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} isStar={true} />
      <Cube id={colorCode+'b4'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'b5'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'b6'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'h1'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'h2'} color={color} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'h3'} color={color} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'h4'} color={color} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'h5'} color={color} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'h6'} color={color} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'a1'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'a2'} color={color} isStar={true} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'a3'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'a4'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'a5'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />
      <Cube id={colorCode+'a6'} color={'white'} setSizeRatio={setSizeRatio} sizeRatio={sizeRatio} />

    </div>

  )
}

export default CubesContainer