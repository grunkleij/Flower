import axios from "axios";
import React, { useEffect, useState } from "react";

const FlowerAdmin = () => {
  const [flowers, setFlowers] = useState([]);
  const [newStock, setNewStock] = useState("");
  const [id, setId] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const [fname,setFname]=useState('');
  const [price,setPrice]=useState('');
  const [stock,setStock]=useState('');

  const handleUpdate = (e, id) => {
    e.preventDefault();
    setId(id);
    console.log(id);
    console.log(newStock);
    axios
      .post("http://localhost:4000/api/updatestock", null, {
        params: { fid: id, newStock: newStock },
      })
      .then((res) => {
        console.log(res);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAdd = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:4000/api/floweradd',{fname,price,stock})
        .then((res)=>{
            console.log(res);
            setFname('');
            setPrice('');
            setStock('');
            fetchData();
        })
        .catch((err)=>{
            console.log(err);
        })
  }

  const fetchData = () => {
    axios
      .get("http://localhost:4000/api/flowers")
      .then((res) => {
        console.log(res);
        setFlowers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Flower Name</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
            </tr>
          </thead>
          <tbody>
            {flowers.map((e) => (
              <tr key={e.fid}>
                <th scope="row">{e.fid}</th>
                <td>{e.flowerName}</td>
                <td>{e.fprice}</td>
                <td>
                  {e.stock}
                  <form
                    onSubmit={(c) => {
                      handleUpdate(c, e.fid);
                    }}
                  >
                    <input
                      type="text"
                      onChange={(e) => {
                        setNewStock(e.target.value);
                      }}
                    />
                    <button className="btn mx-2 btn-primary">update</button>
                  </form>
                </td>
              </tr>
            ))}
            {isAdd&& (
              <tr>
                <th scope="row">{flowers.length+1}</th>
                <td><input type="text"onChange={(e)=>{setFname(e.target.value)}} className="form-control"/></td>
                <td><input type="text"onChange={(e)=>{setPrice(e.target.value)}} className="form-control"/></td>
                <td><input type="text"onChange={(e)=>{setStock(e.target.value)}} className="form-control"/></td>
              </tr>
            )}
            <tr>
             { isAdd?(<button className="btn btn-primary" onClick={handleAdd}>add</button>):(<button className="btn btn-primary" onClick={()=>{setIsAdd(true)}}>
                +
              </button>)}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FlowerAdmin;
