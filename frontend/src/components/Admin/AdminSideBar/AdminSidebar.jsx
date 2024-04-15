import React, { useState } from 'react'
import FlowerAdmin from '../FlowerAdmin/FlowerAdmin'
import { BrowserRouter, Link } from 'react-router-dom'
import AdminOrder from '../AdminOrder/AdminOrder';
import PackOrderAdmin from '../PackOrderAdmin/PackOrderAdmin';
import AdminSelling from '../AdminSelling/AdminSelling';

const AdminSidebar = () => {
    const [active,setActive]=useState('flowers');

    const handleClick = (content) =>{
        setActive(content);
    }

  return (
    <>
    <div className="container-fluid">
    <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline">Menu</span>
                </a>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li className="nav-item">
                        <Link to="#" className="nav-link align-middle px-0" onClick={()=>{handleClick('flowers')}}>
                            <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Flowers</span>
                        </Link>
                    </li>
                    
                    <li>
                        <Link to="#" onClick={()=>{handleClick("order")}} className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Orders</span></Link>
                    </li>
                    <li>
                        <Link to="#" onClick={()=>{handleClick("packorder")}} className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Pack Orders</span></Link>
                    </li>
                    <li>
                        <Link to="#" onClick={()=>{handleClick("adminselling")}} className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Flower Selling request</span></Link>
                    </li>
                    
                    
                    
                </ul>
                <hr/>
                <div className="dropdown pb-4">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle"/>
                        <span className="d-none d-sm-inline mx-1">loser</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><a className="dropdown-item" href="#">New project...</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="col py-3">
            {active==="flowers"&&<FlowerAdmin/>}
            {active==="order"&&<AdminOrder/>}
            {active==="packorder"&&<PackOrderAdmin/>}
            {active==="adminselling"&&<AdminSelling/>}
        </div>
    </div>
</div>

    </>
  )
}

export default AdminSidebar
