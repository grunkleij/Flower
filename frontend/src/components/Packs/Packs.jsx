import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Packs = () => {
  const [packs, setPacks] = useState();
  useEffect(() => {
    console.log("hello")
    axios
      .get("http://localhost:4000/api/getpack")
      .then((res) => {
        console.log(res.data);
        setPacks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="container row row-cols-1 row-cols-md-3 g-4">
      
        {
            packs&&packs.map((e)=>(

            <div class="card m-2" style={{"width": "18rem"}}>
          <img class="card-img-top" src={`https://source.unsplash.com/featured/1600x900?${e.pack_name}`} alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">{e.pack_name}</h5>
            <p class="card-text">
              {e.pack_details}
            </p>
            <p class="card-text font-weight-bold">
              {e.price}
            </p>
            <Link state={{packs:e}} to="packbuy" class="btn btn-primary">
              Go somewhere
            </Link>
          </div>
        </div>
            ))
}
      </div>
    </>
  );
};

export default Packs;
