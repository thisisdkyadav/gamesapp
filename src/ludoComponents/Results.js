import React from 'react'
import '../css/results.css'

const Results = ({ preResult, setResults }) => {

  const handleDismiss = () => { 
    setResults({})
   }

  return (
    <div className='results'>
        <h2>Last game results</h2>
      <div className="results-grid">
        {preResult&&preResult.map((user, index) => (
          <>
          <div className="results-grid-c1">{index + 1}</div>
          <div className='results-grid-c2' key={index}>{user.replace(/\_/g,'.')}</div>

        </>))}
      </div>
        <button className='dismiss-button' onClick={handleDismiss}>Dismiss</button>
    </div>
  )
}

export default Results