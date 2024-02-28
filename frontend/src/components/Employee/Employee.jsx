  import axios from "axios";
  import React, { useEffect, useState } from "react";
  import { useAuth } from "../../context/AuthContext";

  const Employee = () => {
    const { user } = useAuth();
    const [delivery, setDelivery] = useState([]);
    const [pack,setPack] = useState([])
    const [duser, setDuser] = useState([]);
    const [isdel, setIsdel] = useState([]);
    const [selling,setSelling]=useState();

    const handlePackDel = (e,pid) =>{
      e.preventDefault();
      axios.post("http://localhost:4000/api/emppackdel",{
        dornot:1,
        pid:pid
      })
        .then((res)=>{
          console.log(res);
        })
        .catch((err)=>{
          console.log(err);
        })
    }

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
      console.log(user)
      axios.get("http://localhost:4000/api/getpackdelivery",{params:{empEmail:user}})
          .then((res)=>{
            console.log(res);
            setPack(res.data)
          })
          .catch((err)=>{
            console.log(err);
          })

      axios.get("http://localhost:4000/api/getsellingdel",{params:{user:user}})
          .then((res)=>{
            console.log(res.data);
            setSelling(res.data);
          })
          .catch((err)=>{
            console.log(err);
          })
    // fetchPack();
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
    const handlePickup = (e, sid) => {
      e.preventDefault();
      console.log(sid);
      axios.post('http://localhost:4000/api/pickedup',{
        dornot:1,
        sid:sid
      })
      .then((res)=>{
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
        <div className="container">
          <h1>Pack Order</h1>
          <table class="table">
  <thead>
    <tr>
    <th scope="col">#</th>
                    <th scope="col">id</th>
                    <th scope="col">State</th>
                    <th scope="col">Street</th>
                    <th scope="col">Pincode</th>
                    <th scope="col">Instruction</th>
    </tr>
  </thead>
  <tbody>
      {pack&&pack.map((p)=>(
    <tr>
      <td>{p.packs_order_id}</td>
      <td>{p.user_id}</td>
      <td>{p.state}</td>
      <td>{p.street}</td>
      <td>{p.pincode}</td>
      <td>{p.instruction}</td>
      <td>{p.dornot===0?<button className="btn btn-primary" onClick={(c)=>{handlePackDel(c,p.packs_order_id)}}>deliver</button>:"delivered"}</td>
      </tr>
      ))}
  </tbody>
</table>
        </div>
        <div className="container">
          <h1>Pack Order</h1>
          <table class="table">
  <thead>
    <tr>
    <th scope="col">#</th>
                    <th scope="col">id</th>
                    <th scope="col">Address</th>
                    <th scope="col">Flower Name</th>
                    <th scope="col">Quantity</th>
    </tr>
  </thead>
  <tbody>
      {selling&&selling.map((p)=>(
    <tr>
      <td>{p.sid}</td>
      <td>{p.uid}</td>
      <td>{p.address}</td>
      <td>{p.flowerName}</td>
      <td>{p.qty}</td>
      <td>{p.dornot===0?<button className="btn btn-primary" onClick={(c)=>{handlePickup(c,p.sid)}}>Pick up</button>:"Picked up"}</td>
      </tr>
      ))}
  </tbody>
</table>
        </div>
      </div>
    );
  };

  export default Employee;
