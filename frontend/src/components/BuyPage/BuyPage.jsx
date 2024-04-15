import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import DebitCardPayment from "../Payment/DebitCardPayment ";
import "./BuyPage.css"

const BuyPage = () => {
  const [flowers, setFlowers] = useState([]);
  const { user } = useAuth();
  const [stock, setStock] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [pincode, setPincode] = useState("");
  const [cart,setCart]=useState([]);
  const [instruction, setInstruction] = useState("");

  const handleBuy = (e) => {
    e.preventDefault();
    if (!state || !city || !address || !street || !pincode) {
      alert("Please fill out all shipping address fields.");
      return;
    }
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
          instruction,
        },
      })
      .then((res) => {
        console.log(res.data);
        alert("");
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
        setCart(res.data.cart);
        setStock(res.data.cart[0].quantity);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Check if flowers is an array before using reduce
  const totalSum = cart.reduce((acc, cartItem) => {
    const flower = flowers.find((flower) => flower.fid === cartItem.fid);
    if (flower) {
      return acc + (flower.fprice * cartItem.quantity);
    }
    return acc;
  }, 0);

  return (
    <div className="container buyc">
      <h2 className="my-4">Checkout</h2>
      {Array.isArray(flowers) &&
        flowers.map((e) => (
          <div className="card mb-3" key={e.fid}>
            <div className="card-body">
              <h5 className="card-title">{e.flowerName}</h5>
              <p className="card-text">Price: {e.fprice}</p>
            </div>
          </div>
        ))}
      <div className="container bg-light p-4 mb-4">
        <h4>Shipping Address</h4>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              type="text"
              className="form-control"
              id="address"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              onChange={(e) => {
                setState(e.target.value);
              }}
              type="text"
              className="form-control"
              id="state"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              onChange={(e) => {
                setCity(e.target.value);
              }}
              type="text"
              className="form-control"
              id="city"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="street" className="form-label">
              Street
            </label>
            <input
              onChange={(e) => {
                setStreet(e.target.value);
              }}
              type="text"
              className="form-control"
              id="street"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="pincode" className="form-label">
              Pincode
            </label>
            <input
              onChange={(e) => {
                setPincode(e.target.value);
              }}
              type="text"
              className="form-control"
              id="pincode"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="instruction" className="form-label">
              Special Instructions
            </label>
            <textarea
              onChange={(e) => {
                setInstruction(e.target.value);
              }}
              className="form-control"
              id="instruction"
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>
      <div className="container mb-3">
          <DebitCardPayment/>
      </div>
      <div className="card mb-3">
        <div className="card-body d-flex justify-content-between">
          <div>
            <h5 className="card-title">Total:</h5>
            <p className="card-text">{totalSum}</p>
          </div>
          <button onClick={handleBuy} className="btn btn-success">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyPage;
