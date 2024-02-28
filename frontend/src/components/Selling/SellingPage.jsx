import axios from "axios";
import React, { useEffect, useState } from "react";

const SellingPage = () => {
  const [flowers, setFlowers] = useState();
  const [address,setAddress]= useState();
  const [qty,setQty]= useState();
  const [fid,setFid]=useState();

//   const handleSell = (e) =>{
//     e.preventDefault();
//   }

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/flowers")
      .then((res) => {
        console.log(res);
        setFlowers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });


  }, []);

  return (
    <div>
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
          <label htmlFor="address">Select Flower</label>

          <select class="form-select" aria-label="Default select example">
            <option selected>Open this select employee</option>
            {flowers &&
              flowers.map((f) => <option onClick={handleFid} value="1">{f.flowerName}</option>)}
          </select>
        </div>

        <div className="container">



<button className="btn btn-primary" >Sell</button>

      </div>
    </div>
    </div>
  );
};

export default SellingPage;
