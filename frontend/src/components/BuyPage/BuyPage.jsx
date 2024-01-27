import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const BuyPage = () => {
  const [flowers, setFlowers] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    console.log(user);
    axios
      .get("http://localhost:4000/api/cartflower", {
        params: { username: user },
      })
      .then((res) => {
        console.log(res.data);
        setFlowers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const totalSum = flowers.reduce((acc, flower) => acc + flower.fprice, 0);
  return (
    <div className="container">
      <h2 className="my-2">Checkout</h2>
      {flowers &&
        flowers.map((e) => (
          <div class="alert alert-secondary d-flex" role="alert">
            <div class="alert alert-light" role="alert">
                {e.flowerName}
            </div>
            <div class="alert alert-light" role="alert">
                price:{e.fprice}
            </div>
          </div>
        ))}
        <div class="alert alert-secondary " role="alert">
            {
                totalSum
            }
        </div>
    </div>
  );
};

export default BuyPage;
