import axios from "axios";
import React, { useEffect, useState } from "react";

const PackOrderAdmin = () => {
  const [orders, setOrders] = useState();
  const [emp,setEmp]=useState();
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/getpackorder")
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      axios
        .get("http://localhost:4000/api/getemp")
        .then((res)=>{
          console.log(res);
          setEmp(res.data)
        })
        .catch((err)=>{
          console.log(err);
        })
  }, []);

  const handleEmpClick = (e,eid,pid)=>{
    e.preventDefault();
    console.log(eid,pid);
    axios.post('http://localhost:4000/api/setpackemp',{
        eid,
        pid
    })  
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
  }

  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Address</th>
            <th scope="col">state</th>
            <th scope="col">street</th>
            <th scope="col">pincode</th>
            <th scope="col">instruction</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((e) => (
              <tr>
                <th scope="row">{e.packs_order_id}</th>
                <td>{e.address}</td>
                <td>{e.state}</td>
                <td>{e.street}</td>
                <td>{e.pincode}</td>
                <td>{e.instruction}</td>
                <td>
                  <select class="form-control form-control-sm">
                    {emp&&emp.map((empDude)=>(
                        
                        <option onClick={(c)=>{handleEmpClick(c,empDude.eid,e.packs_order_id)}}>{empDude.empname}</option>
                        ))}
                  </select>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PackOrderAdmin;
