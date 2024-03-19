import React from 'react'
import { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

const Login = ({setUsername}) => {
    // const navigate = useNavigate();

        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')

        const login = async () => {
            // basic client side auth // firebase sign up functionality
                const res = await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    setUsername(userCredential.user)

                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                  });


        };

        const signInWithGoogle = async () => {
                const res = await signInWithPopup(auth, googleProvider)
                .then((userCredential) => {
                    // Signed in 
                    setUsername(userCredential.user)
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                  });
        }

        
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {navigate("/");
//       } 
//     });


//     return () => unsubscribe();
     
// }, [])

    return (
        <>
            <div className="login-body">

                <div className="login-form-div">

                    <input type="email" onChange={(e)=>setEmail(e.target.value)}/><br />
                    <input type="password" onChange={(e)=>setPassword(e.target.value)}/><br/>
                    <button onClick={login}>Login</button>
                    <button onClick={signInWithGoogle}>Login with google</button>
                </div>
            </div>
        </>
    )
}

export default Login