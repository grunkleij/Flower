import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
const BuyPage = () => {
  const [flowers, setFlowers] = useState(null);
  const { user } = useAuth();
  const [stock, setStock] = useState("");
  const [state,setState]=useState("");
  const[city,setCity]=useState("");
  const [address, setAddress]=useState("");
  const [street,setStreet]=useState("");
  const [pincode,setPincode]=useState("");
  const [instruction,setInstruction]=useState("");

  const handleBuy = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:4000/api/buyflower", {
        params: {
          flowerData: flowers,
          username: user,
          total: totalSum,
          stock: stock,
          state,
          city,
          address,
          street,
          pincode,
          instruction
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(user);
    axios
      .get("http://localhost:4000/api/cartflower", {
        params: { username: user },
      })
      .then((res) => {
        console.log(res.data);
        setFlowers(res.data.flowers);
        setStock(res.data.cart[0].quantity);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Check if flowers is an array before using reduce
  const totalSum = Array.isArray(flowers)
    ? flowers.reduce((acc, flower) => acc + flower.fprice, 0)
    : 0;

  return (
    <div className="container">
      <h2 className="my-2">Checkout</h2>
      {Array.isArray(flowers) &&
        flowers.map((e) => (
          <div
            className="alert alert-secondary d-flex"
            role="alert"
            key={e.fid}
          >
            <div className="alert alert-light" role="alert">
              {e.flowerName}
            </div>
            <div className="alert alert-light" role="alert">
              price: {e.fprice}
            </div>
          </div>
        ))}
      <div className="container alert-secondary" >
        <div className="my-2">
          <label htmlFor="address">Address</label>
          <input onChange={(e)=>{setAddress(e.target.value)}} type="text" id="address" className="form-control" />
        </div>
        <div className="my-2">
          <label htmlFor="state" className="form-bable" >State</label>
          <input onChange={(e)=>{setState(e.target.value)}} type="text" className="form-control" id="state" />
        </div>
        <div className="my-2">
          <label htmlFor="city" className="form-bable" >city</label>
          <input onChange={(e)=>{setCity(e.target.value)}} type="text" className="form-control" id="city" />
        </div>
        <div className="my-2">
          <label htmlFor="street" className="form-bable" >street</label>
          <input onChange={(e)=>{setStreet(e.target.value)}} type="text" className="form-control" id="street" />
        </div>
        <div className="my-2">
          <label htmlFor="pincode" className="form-bable" >pincode</label>
          <input onChange={(e)=>{setPincode(e.target.value)}} type="text" className="form-control" id="pincode" />
        </div>
        <div className="my-2">
          <label htmlFor="instruction" className="form-bable" >instruction</label>
          <textarea cols="4" type="text" className="form-control" id="instruction" />
        </div>
      </div>
      <div className="alert alert-secondary d-flex" role="alert">
        <div className="form-control">{totalSum}</div>

        <button onClick={handleBuy} className="btn btn-success">
          Buy
        </button>
      </div>
    </div>
  );
};

export default BuyPage;
