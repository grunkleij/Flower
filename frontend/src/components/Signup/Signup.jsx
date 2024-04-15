import React, { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import "./Signup.css"

const Signup = () => {
    const [email,setEmail]=useState('');
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [cpassword,setCpassword]=useState('');
    const [conf,setConf]=useState(false);
    const navigate=useNavigate();
    

    const handleSingup=(e)=>{
        e.preventDefault();
        if(password==cpassword){
            axios.post('http://localhost:4000/api/create',{username,email,password})
            .then((res)=>{
                console.log(res);
                if(res.status===200){
                    navigate('/');
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        }else{
            setConf(true);
        }
    }

  return (
    <>
    <form onSubmit={handleSingup} className="container signuph">
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input onChange={(e)=>{setEmail(e.target.value)}} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Username</label>
    <input onChange={(e)=>{setUsername(e.target.value)}} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input onChange={(e)=>{setPassword(e.target.value)}} type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
    <input onChange={(e)=>{setCpassword(e.target.value)}} type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  {
    conf&&<div class="alert alert-danger" role="alert">
    Password should match
  </div>
  
  }
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
<div className="container my-2">

<Link to="/signup/emp" >employee?</Link>
</div>

    </>
  )
}

export default Signup
