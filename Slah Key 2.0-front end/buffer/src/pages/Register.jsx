import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase';
import { Facebook, GitHub, Google } from '@mui/icons-material'
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';

function Register() {
  const navigate = useNavigate();
  const [registerName, setRegisterName] = useState("");
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [error, setError] = useState('');

  // const onSubmit = async (e) => {
  //   e.preventDefault()
  //   if (password !== registerConfirmPassword) {
  //     setError('Passwords do not match')
  //     return
  //   }
  //   await createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       // console.log(user);
  //       navigate("/")
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorCode, errorMessage);
  //       if (errorMessage.includes("already")) {
  //         setError("You already have an account")
  //       } else if (errorMessage.includes("Password")) {
  //         setError("Week password")
  //       }
  //       else {
  //         setError("let me check")
  //       }
  //     });
  //   }

  // const onSubmit = async (e) => {
  //   e.preventDefault()
  //   if (password !== registerConfirmPassword) {
  //     setError('Passwords do not match')
  //     return
  //   }
  //   await createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       const uid = user.uid;
  //       // console.log(uid);
  //       firebase.database().ref('users/' + uid).set({
  //         username: registerName
  //       })
  //       navigate("/")
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // console.log(errorCode, errorMessage);
  //       if (errorMessage.includes("already")) {
  //         setError("You already have an account")
  //       } else if (errorMessage.includes("Password")) {
  //         setError("Week password")
  //       }
  //     });
  //   }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (password !== registerConfirmPassword) {
      setError('Passwords do not match')
      return
    }
    let update = {
      Name: registerName,
      email: email,
      password: password,

    };

    var requestOptions = {
      method: 'POST',
      body: JSON.stringify(update),
      headers: {
        "content-type": "application/json"
      }
    };
    fetch("https://slashkey2-0.onrender.com/user", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result) {
          navigate("/");
        }
      })
      .catch(error => {
        // console.log('error', error)
        setError("Sign up failed. Please try again.")
      });
  }


  return (
    <div className="bg-gray-700 flex flex-col items-center justify-center min-h-screen md:py-2">
      <main className="flex items-center w-full px-2 md:px-20">
        <div className="hidden md:inline-flex flex-col flex-1 space-y-1">
          <p className='text-6xl text-blue-500 font-bold'>Gym Trainer</p>
          <p className='font-medium text-xl leading-1 text-primary'>Personalized Workout Training Expert.</p>
        </div>
        <div className="bg-primary text-black rounded-2xl shadow-2xl  flex flex-col w-full  md:w-1/3 items-center max-w-4xl transition duration-1000 ease-in">
          <h2 className='p-3 text-3xl font-bold text-white'>Gym Trainer</h2>
          <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
          <h3 className='text-xl font-semibold text-white pt-2'>Create Account!</h3>
          <div className='flex space-x-2 m-4 items-center justify-center'>
            <div className="socialIcon border-white">
              <Facebook className="text-white" />
            </div>
            <div className="socialIcon border-white">
              <GitHub className="text-white" />
            </div>
            <div className="socialIcon border-white">
              <Google className="text-white" />
            </div>
          </div>
          <form onSubmit={onSubmit}>
            <div className='flex flex-col items-center justify-center mt-2'>
              <input
                label="Username"
                value={registerName}
                type='text'
                className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px]  m-1 focus:shadow-md  focus:outline-none focus:ring-0'
                placeholder='Username'
                onChange={(e) => { setRegisterName(e.target.value), setError(null) }}
                required
              />
              <input
                type="email"
                label="Email address"
                value={email}
                onChange={(e) => { setEmail(e.target.value), setError(null) }}
                className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px]  m-1 focus:shadow-md  focus:outline-none focus:ring-0'
                placeholder='Email'
                required
              />
              <input
                label="Create password"
                value={password}
                onChange={(e) => { setPassword(e.target.value), setError(null) }}
                type='password'
                className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px]  m-1 focus:shadow-md  focus:outline-none focus:ring-0'
                placeholder='password'
                required
              />
              <input
                label="Confirm password"
                value={registerConfirmPassword}
                type="text"
                className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px]  m-1 focus:shadow-md  focus:outline-none focus:ring-0'
                placeholder='Confirm Password'
                onChange={(e) => { setRegisterConfirmPassword(e.target.value), setError(null) }}
                required
              />
              {error && <div className='text-red-600 text-sm font-bold'>{error}</div>}
              <button
                type="submit"
                className='rounded-2xl my-4 text-white bg-sky-500 w-full px-6 py-2 shadow-md hover:text-secondary hover:bg-sky-600 transition duration-200 ease-in'>
                Sign Up
              </button>
            </div>
          </form>
          <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
          <p className='text-white mt-4 text-sm'>Already have an account?</p>
          <Link
            className='text-white mb-4 text-sm font-medium cursor-pointer'
            to="/"
          >
            Sign In to your Account?
          </Link>
        </div>
      </main>
    </div>
  )
}
export default Register
