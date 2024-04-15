import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import "./login.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.get('http://localhost:4000/api/users', { params: { email } })
      .then((res) => {
        console.log(res);
        if (res.data[0].password === password) {
          console.log("login")
          login(res.data[0].username);
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="container loginh">
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input onChange={(e) => { setEmail(e.target.value) }} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input onChange={(e) => { setPassword(e.target.value) }} type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <p className="mt-3">Don't have an account? <Link to="/signup" className="text-decoration-none">Sign up</Link></p>
      <p>Are you an employee? <Link to="/login/empsignup" className="text-decoration-none">Sign up here</Link></p>
    </div>
  )
}

export default Login;
