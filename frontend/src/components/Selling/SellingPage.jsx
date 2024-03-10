import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const SellingPage = () => {

  const { user } = useAuth();

  const [flowers, setFlowers] = useState([]);
  const [address, setAddress] = useState("");
  const [qty, setQty] = useState("");
  const [fid, setFid] = useState("");

  const handleSell = (e) => {
    e.preventDefault();
    console.log(user);
    axios.post("http://localhost:4000/api/sellflower", {
      user,
      address,
      qty,
      fid
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  };

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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                required
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="flowerSelect">Select Flower</label>
              <select
                className="form-select"
                id="flowerSelect"
                onChange={(e) => {
                  setFid(e.target.value);
                }}
              >
                <option defaultValue>Choose...</option>
                {flowers.map((f) => (
                  <option key={f.fid} value={f.fid}>{f.flowerName}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="qty">Quantity</label>
              <input
                type="number"
                className="form-control"
                id="qty"
                name="qty"
                required
                onChange={(e) => {
                  setQty(e.target.value);
                }}
              />
            </div>
            <button onClick={handleSell} className="btn btn-primary">Sell</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellingPage;
