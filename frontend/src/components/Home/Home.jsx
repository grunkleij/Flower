import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import AddToCart from "../AddToCart/AddToCart";
import './Home.css'
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const [flowers, setFlowers] = useState([]);
  const navigate=useNavigate();
  const user=useAuth();


  useEffect(() => {
    axios.get("http://localhost:4000/api/flowers").then((res) => {
      console.log(res);
      console.log(user.user);
      setFlowers(res.data);
    });
  }, []);

  return (
    <div>

      <h1 className="text-center">Flowers</h1>
      <div className="container d-flex gap-2">
      {flowers.map((e) => (
        <>
          <div class="card" style={{"width": "18rem"}}>
            <img src={`https://source.unsplash.com/featured/1600x900?${e.flowerName}`} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{e.flowerName}</h5>
              <p class="card-text">
                price: {e.fprice}
              </p>
              <div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Buy
  </button>
  <ul class="dropdown-menu dropdown-style">
    <li><a class="dropdown-item" href="#"><AddToCart flowerData={e} userName={user.user}/></a></li>
  </ul>
</div>
            </div>
          </div>
        </>
      ))}
      </div>
    </div>
  );
};

export default Home;
