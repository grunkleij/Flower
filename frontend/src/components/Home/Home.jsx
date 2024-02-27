import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddToCart from "../AddToCart/AddToCart";
import './Home.css'
import { useAuth } from "../../context/AuthContext";
import Packs from "../Packs/Packs";

const Home = () => {
  const [flowers, setFlowers] = useState([]);
  const navigate = useNavigate();
  const user = useAuth();
  const [pack, setPack] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:4000/api/flowers").then((res) => {
      console.log(res);
      console.log(user.user);
      setFlowers(res.data);
    });
  }, []);

  return (
    <div>
      <button onClick={() => setPack(false)}>flowers</button>
      <button onClick={() => setPack(true)}>packs</button>

      {pack ? (
        <>
          <h1 className="text-center">Packs</h1>
          <Packs />
        </>
      ) : (
        <>
          <h1 className="text-center">Flowers</h1>
          <div className="container d-flex gap-2">
            {flowers.map((e) => (
              <div key={e.id} className="card" style={{"width": "18rem"}}>
                <img src={`https://source.unsplash.com/featured/1600x900?${e.flowerName}`} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{e.flowerName}</h5>
                  <p className="card-text">
                    price: {e.fprice}
                  </p>
                  <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Buy
                    </button>
                    <ul className="dropdown-menu dropdown-style">
                      <li><a className="dropdown-item" href="#"><AddToCart flowerData={e} userName={user.user}/></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
