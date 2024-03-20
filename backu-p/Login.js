// import React from 'react'
// import { useState } from 'react'
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../config/firebase";
// import '../css/login.css'

// const Login = ({setUsername, signInWithGoogle, setType}) => {

//         // const [email, setEmail] = useState('')
//         // const [password, setPassword] = useState('')
//         // const [message, setMessage] = useState('')

//         // const login = async () => {
//         //         const res = await signInWithEmailAndPassword(auth, email, password)
//         //         .then((userCredential) => {
//         //             setUsername(userCredential.user)
//         //           }).catch((error) => {
//         //             setMessage(error.message);
//         //           });
//         // };

//         // const signup = () => { 
//         //     createUserWithEmailAndPassword(auth, email, password)
//         //     .then((userCredential) => {
//         //       const user = userCredential.user;
//         //     })
//         //     .catch((error) => {
//         //             setMessage(error.message);
//         //     });
//         //  }

//     return (
//         <>
//             <div className="login-body">

//                 {/* <div className="login-form-div">
//                     {/* <div className='inputs'> */}
//                     <div className='message'>{message}</div>
//                     <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
//                     <input type="password" placeholder="Passward" onChange={(e)=>setPassword(e.target.value)}/>
//                     {/* </div> */}
//                     <div className='email-auth-buttons'>
//                     <button className='signup-button' onClick={signup}>Signup</button>
//                     <button className='login-button' onClick={login}>Login</button>
//                     </div>
//                     <button className='google-button' onClick={signInWithGoogle}>Login with google</button>
//                 </div> */}
//             </div>
//         </>
//     )
// }

// export default Login