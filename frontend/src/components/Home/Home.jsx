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
      console.log("flowers  ")
      setFlowers(res.data);
    })
      .catch((err)=>{
        console.log(err);
      })
  }, []);

  return (
    <div className=" container py-4">
      <div className="d-flex justify-content-between align-items-center">
        <button className={`btn ${pack ? 'btn-primary bbtn' : 'btn-secondary bbtn'}`} onClick={() => setPack(false)}>Flowers</button>
        <button className={`btn ${pack ? 'btn-secondary bbtn' : 'btn-primary bbtn'}`} onClick={() => setPack(true)}>Packs</button>
      </div>

      {pack ? (
        <div>
          <h1 className="text-center mt-4">Packs</h1>
          <Packs />
        </div>
      ) : (
        <div>
          <h1 className="text-center mt-4">Flowers</h1>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {flowers.map((e) => (
              <div key={e.id} className="col">
                <div className="flowerc card h-100">
                  <img src={`https://source.unsplash.com/featured/1600x900?${e.flowerName}`} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{e.flowerName}</h5>
                    <p className="card-text">Price: {e.fprice}</p>
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
