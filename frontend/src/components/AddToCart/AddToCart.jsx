import axios from "axios";
import { React, useState } from "react";

const AddToCart = (props) => {
  const [stock, setStock] = useState("");

  const handleCart = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/api/addtocart",{
        fid:props.flowerData.fid,
        username:props.userName,
        qty:stock
    })
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    })
  };

  return (
    <div className="d-flex gap-2">
      <lable className="form-label">No:</lable>
      <input
        onChange={(e) => {
          setStock(e.target.value);
        }}
        type="text"
        className="form-control"
      />
      <button onClick={handleCart} className="btn btn-primary">
        add to cart
      </button>
    </div>
  );
};

export default AddToCart;
