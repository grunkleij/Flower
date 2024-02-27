import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PacksBuyPage = () => {
    
  const location = useLocation();
  const {user} = useAuth();
  const { packs } = location.state;
  console.log(packs);
  const [address,setAddress]=useState()
  const [state,setState]=useState()
  const [street,setStreet]=useState()
  const [pincode,setPincode]=useState()
  const [instruction,setInstruction]=useState()

  const handleBuy = (e) =>{
    console.log(user);
    e.preventDefault();
    axios.post("http://localhost:4000/api/buypack",{
        pack_id:packs.packs_id,
        user,
        address,
        state,
        street,
        pincode,
        instruction
    })
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
  }

  return (
    <div className="container">
      <h1 className="m-2">{packs.pack_name}</h1>
      <h3 className="m-3">Pack Details</h3>
      <p className="m-4">{packs.pack_details}</p>
      <p className="m-4">{packs.price}</p>
      <div className="container">
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            required
            onChange={(e)=>{setAddress(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            className="form-control"
            id="state"
            name="state"
            required
            onChange={(e)=>{setState(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            className="form-control"
            id="street"
            name="street"
            required
            onChange={(e)=>{setStreet(e.target.value)}}

          />
        </div>
        <div className="form-group">
          <label htmlFor="pincode">Pincode</label>
          <input
            type="text"
            className="form-control"
            id="pincode"
            name="pincode"
            required
            onChange={(e)=>{setPincode(e.target.value)}}

          />
        <div className="form-group">
          <label htmlFor="instruction">Instruction</label>
          <input
            type="text"
            className="form-control"
            id="instruction"
            name="instruction"
            required
            onChange={(e)=>{setInstruction(e.target.value)}}

          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleBuy}>
          Submit
        </button>
      </div>
    </div>
    </div>
  );
};

export default PacksBuyPage;
