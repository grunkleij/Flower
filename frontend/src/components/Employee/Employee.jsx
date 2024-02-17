import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Employee = () => {
  const { user } = useAuth();
  const [delivery, setDelivery] = useState([]);
  const [duser, setDuser] = useState([]);
  const [isdel, setIsdel] = useState([]);

  const fetchDel =()=>{

    axios
      .get("http://localhost:4000/api/getdelivery", {
        params: { empEmail: user },
      })
      .then((res) => {
        console.log(res.data);
        setDelivery(res.data.orders);
        setIsdel(res.data.delivery);
        setDuser(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
    }

  useEffect(() => {
   fetchDel();
  }, []);

  const handleDel = (e, did) => {
    e.preventDefault();
    console.log(did);
    axios.post('http://localhost:4000/api/delivered',{
      dornot:1,
      did:did
    })
    .then((res)=>{
      fetchDel();
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    })
  };

  return (
    <div>
      <div className="container my-4">
        <div className="d-flex justify-content-between m-2">
          <span>Order placed</span>
          <span>Order delivered</span>
        </div>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: "50%" }}
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <div className="delivery d-flex justify-content-center my-4">
          <div className="container">
            <h3>Orders</h3>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">State</th>
                  <th scope="col">Street</th>
                  <th scope="col">Pincode</th>
                  <th scope="col">Instruction</th>
                </tr>
              </thead>
              <tbody>
                {delivery.map((e, index) => (
                  <tr key={index}>
                    <th scope="row">{e.order_id}</th>
                    <td>{e.user_id}</td>
                    <td>{e.address}</td>
                    <td>{e.state}</td>
                    <td>{e.pincode}</td>
                    <td>{e.instruction}</td>
                    <td>
                      {isdel[index]?.order_id === e.order_id &&
                      isdel[index]?.dornot !== 0 ? (
                        "Delivered"
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={(e) => {
                            handleDel(e, isdel[index].did);
                          }}
                        >
                          delivered
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
