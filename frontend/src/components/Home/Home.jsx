import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/flowers").then((res) => {
      console.log(res);
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
              <a href="#" class="btn btn-primary">
                Buy
              </a>
            </div>
          </div>
        </>
      ))}
      </div>
    </div>
  );
};

export default Home;
