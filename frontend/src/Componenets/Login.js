import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

useEffect(()=>{
    const auth = localStorage.getItem('user')
    if(auth){
        navigate('/')
    }
})

  const login = async () => {
    console.log(email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({email, password}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if (result.auth) {
        localStorage.setItem('user',JSON.stringify(result.user))
        localStorage.setItem('token',JSON.stringify(result.token))
        navigate('/')
    } else {
      alert("Enter correct validation details");
    }
  };

  return (
    <div className="register">
      <input
        type="email"
        placeholder="Enter Email"
        className="inputbox"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      ></input>
      <input
        type="password"
        placeholder="Enter Password"
        className="inputbox"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      ></input>
      <button onClick={login} className="btn" type="button">
        Login
      </button>
    </div>
  );
}

export default Login;
