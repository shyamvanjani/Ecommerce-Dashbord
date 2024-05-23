import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()


  useEffect(()=>{
    const auth = localStorage.getItem('user')
    if(auth){
      navigate("/")
    }
  })

  const getData = async () => {
    console.warn(name, email, password);
    let result = await fetch('http://localhost:5000/register',{
      method:'post',
      body:JSON.stringify({name,email,password}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    result = await result.json()
    console.log(result)
    localStorage.setItem('user',JSON.stringify(result.result))
    localStorage.setItem('token',JSON.stringify(result.auth))
    if(result){
        navigate('/')
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>

      <input
        className="inputbox"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      ></input>
      <input
        className="inputbox"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      ></input>
      <input
        className="inputbox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      ></input>
      <button onClick={getData} className="btn" type="button" >
        SignUp
      </button>
    </div>
  );
}

export default SignUp;
