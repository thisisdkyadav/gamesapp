import React from 'react';
import { useState, useEffect } from 'react';

const Loading = () => {

const [loader, setLoader] = useState([0,1,2,3,4,5])

useEffect(() => {
  const interval = setInterval(() => {
    let temp = loader;
    temp.push(temp.shift());
    setLoader([...temp]);
  }, 100);
  return () => clearInterval(interval);
}, []);
  
  return (
    <div className="loading-container">
        <img src="logo.svg" alt="" />
        <div className='loading-animation'>
          <div className={`loading-dot ld-${loader[0]}`}></div>
          <div className={`loading-dot ld-${loader[1]}`}></div>
          <div className={`loading-dot ld-${loader[2]}`}></div>
        </div>
    </div>
  );
};

export default Loading;