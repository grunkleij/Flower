import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import './NavBar.css'
import { FaCartShopping } from "react-icons/fa6";
import { ImSwitch } from "react-icons/im";

const NavBar = () => {
  const { user,logout } = useAuth();
  const [carnum,setCartnum]=useState('');
  const emailPattern = /@fl\.org$/;

  const fetchNum=()=>{
    if(!emailPattern.test(user)){
    axios.get('http://localhost:4000/api/cartnum',{params:{
      username:user
    }})
    .then((res)=>{
      console.log(res.data.length)
      setCartnum(res.data.length)
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  }

  useEffect(()=>{
    console.log(user)
    if(user!==null){
      fetchNum();
    }
  },[user])

  const handleLogout=(e)=>{
    e.preventDefault();
    logout();
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              {(user==="admin")&&<li className="nav-item">
                <Link to={"admin"} className="nav-link" href="#">
                  Admin
                </Link>
              </li>}
              {emailPattern.test(user)&&<li className="nav-item">
                <Link to={"emp"} className="nav-link" href="#">
                  Employee
                </Link>
              </li>}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Disabled
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            {user === null ? (
              <>
                <Link
                  to="signup"
                  className="btn btn-outline-success mx-1"
                  type="submit"
                >
                  Signup
                </Link>
                <Link
                  to="login"
                  className="btn btn-outline-success mx-1"
                  type="submit"
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <p className="mx-2 d-flex">{user}</p>
                <Link to="buypage" className="mx-2">
                <i class="fa" style={{"font-size":"24px"}}><FaCartShopping /></i>
<span class='badge badge-warning ' id='lblCartCount'> {carnum} </span>
                </Link>
                <button onClick={handleLogout} className="btn btn-danger"><ImSwitch/></button>

              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
