import React from 'react'
import '../css/alert.css'

const Alert = ({ data }) => {
  return (
    <div className="alert-container">
    <div className='alert'>
      <div className='message'>{data.message}</div>
      <div className='alert-buttons'>
          <button onClick={data.handleCancel}>{data.cancelText}</button>
          <button onClick={data.handleConfirm}>{data.confirmText}</button>
      </div>

    </div>
    </div>
  )
}

export default Alert