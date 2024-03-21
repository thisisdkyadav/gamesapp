import React from 'react'
import '../css/results.css'

const Results = ({ preResult }) => {
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
    </div>
  )
}

export default Results