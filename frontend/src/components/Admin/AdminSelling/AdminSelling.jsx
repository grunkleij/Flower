import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminSelling = () => {
  const [orders, setOrders] = useState();
  const [emp,setEmp]=useState();
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/getselling")
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

  const handleEmpClick = (e,eid,sid)=>{
    e.preventDefault();
    console.log("haha",eid,sid);
    axios.post('http://localhost:4000/api/setsellingemp',{
        eid,
        sid
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
            <th scope="col">Flower Name</th>
            <th scope="col">Address</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((e) => (
              <tr>
                <th scope="row">{e.sid}</th>
                <td>{e.flowerName}</td>
                <td>{e.address}</td>
                <td>{e.qty}</td>
                <td>
                  <select class="form-control form-control-sm">
                    {emp&&emp.map((empDude)=>(
                        
                        <option onClick={(c)=>{handleEmpClick(c,empDude.eid,e.sid)}}>{empDude.empname}</option>
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

export default AdminSelling;
