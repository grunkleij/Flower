import React from "react";

const Employee = () => {
  return (
    <div>
      <div className="container my-4">
        <div className="d-flex justify-content-between m-2">
          <span>Order placed</span>
          <span>Order deliverd</span>
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
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
