import axios from 'axios';
import React, { useState } from 'react'
import { useAuth } from '../../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {user,login,logout}=useAuth();
    const navigate= useNavigate();

    const handleSingup=(e)=>{
        const emailPattern = /@fl\.org$/;
        e.preventDefault();
        axios.get('http://localhost:4000/api/emplogin',{params:{email}})
        .then((res)=>{
            console.log(res);
            if(res.data[0].emppassword===password){
              if(emailPattern.test(res.data[0].empemail)){

                  console.log("login")
                  login(res.data[0].empemail);
                  navigate('/');
                }
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

  return (
    <>
    <form onSubmit={handleSingup}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input onChange={(e)=>{setEmail(e.target.value)}} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input onChange={(e)=>{setPassword(e.target.value)}} type="password" class="form-control" id="exampleInputPassword1"/>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

    </>
  )
}

export default Login
