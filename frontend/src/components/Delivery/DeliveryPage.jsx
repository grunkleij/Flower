import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const DeliveryPage = () => {

    const [detail,setDetails]=useState([]);
    const {user} = useAuth();

    useEffect(()=>{
        axios.get('http://localhost:4000/api/getudelivery',{params:{userName:user}})
          .then((res)=>{
            console.log(res);
            setDetails(res.data)
          })
          .catch((err)=>{
            console.log(err);
          })
    },[])

  return (
    <div className="container">
      <div className="container my-3">
        <div class="progress">
          <div
            class="progress-bar bg-warning"
            role="progressbar"
            style={{ width: "50%" }}
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <p>Order placed</p>
        <p>Out of delivery</p>
        <p>Delivered</p>
      </div>
    </div>
  );
};

export default DeliveryPage;
