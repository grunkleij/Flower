import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './EmpLogin.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSingup = (e) => {
    const emailPattern = /@fl\.org$/;
    e.preventDefault();
    axios
      .get('http://localhost:4000/api/emplogin', { params: { email } })
      .then((res) => {
        console.log(res);
        if (res.data[0].emppassword === password) {
          if (emailPattern.test(res.data[0].empemail)) {
            console.log('login');
            login(res.data[0].empemail);
            navigate('/');
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-5 emph">
      <form onSubmit={handleSingup}>
        <div className="mb-3 ">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
