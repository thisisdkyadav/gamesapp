import React, { useState, useEffect } from "react"
import "./Loading.css"

const Loading = ({ seeThrough = false }) => {
  const [loader, setLoader] = useState([0, 1, 2, 3, 4, 5])

  useEffect(() => {
    const interval = setInterval(() => {
      let temp = loader
      temp.push(temp.shift())
      setLoader([...temp])
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="loading-container">
      {!seeThrough && (
        <>
          <div className="loading-background"></div>
          <img src="logo.svg" alt="logo" />
        </>
      )}
      <div className="loading-dots">
        <div className={`loading-dot ld-${loader[0]}`}></div>
        <div className={`loading-dot ld-${loader[1]}`}></div>
        <div className={`loading-dot ld-${loader[2]}`}></div>
      </div>
    </div>
  )
}

export default Loading
