import React from 'react'
import { useState } from 'react'

const Signup = ({setUsername, signInWithGoogle, setType}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signup = () => { 
        
     }

  return (
    <>
        <div className="login-body">

            <div className="login-form-div">
                {/* <div className='inputs'> */}
                <input type="email" value="Email" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" value="Passward" onChange={(e)=>setPassword(e.target.value)}/>
                {/* </div> */}
                <div className='email-auth-buttons'>
                <button className='login-button' onClick={()=>setType('login')}>Login</button>
                <button className='signup-button' onClick={signup}>Signup</button>
                </div>
                <button className='google-button' onClick={signInWithGoogle}>Login with google</button>
            </div>
        </div>
    </>
  )
}

export default Signup