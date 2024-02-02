import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminOrder = () => {
  const [orders, setOrder] = useState([]);
  const [emp,setEmp]=useState([]);

  const handleEmp=(e,eid,uid,order_id)=>{
    e.preventDefault();
    console.log(eid);
    axios.post("http://localhost:4000/api/delivery",{params:{uid,eid,order_id}})  
      .then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/getorder")
      .then((res) => {
        console.log(res);
        setOrder(res.data);
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



  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">address</th>
            <th scope="col">state</th>
            <th scope="col">street</th>
            <th scope="col">order date</th>
            <th scope="col">pincode</th>
            <th scope="col">instruction</th>
            <th scope="col">Assign</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((e) => (
              <tr>
                <th scope="row">1</th>
                <td>{e.address}</td>
                <td>{e.state}</td>
                <td>{e.street}</td>
                <td>{e.order_date}</td>
                <td>{e.pincode}</td>
                <td>{e.instruction}</td>
                <td>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Open this select employee</option>
                    {emp&&emp.map((emp)=>(

                     <option onClick={(c)=>{handleEmp(c,emp.eid,e.uid,e.order_id)}} value="1">{emp.empname}</option> 
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

export default AdminOrder;
