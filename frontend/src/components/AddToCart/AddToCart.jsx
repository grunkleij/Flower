import axios from "axios";
import React, { useState } from "react";

const AddToCart = (props) => {
  const [stock, setStock] = useState("");

  const handleCart = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    axios
      .post("http://localhost:4000/api/addtocart", {
        fid: props.flowerData.fid,
        username: props.userName,
        qty: stock,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex gap-2">
      <label className="form-label">No:</label>
      <input
        onChange={(e) => {
          setStock(e.target.value);
        }}
        type="text"
        className="form-control"
      />
      <button type="button" onClick={handleCart} className="btn btn-primary">
        add to cart
      </button>
    </div>
  );
};

export default AddToCart;
