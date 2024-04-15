import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const DeliveryPage = () => {

    const [detail, setDetails] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        axios.get('http://localhost:4000/api/getudelivery', { params: { userName: user } })
            .then((res) => {
                console.log(res);
                setDetails(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <div className="container " style={{"minHeight":"100vh"}}>
            {
                detail && detail.map((e) => (
                    <div key={e.delivery_detail&&e.delivery_detail.dtimestamp} className="container my-3">
                        <p>Date : {e.delivery_detail&&e.delivery_detail.dtimestamp}</p>
                        <div className="progress">
                            <div
                                className="progress-bar bg-warning"
                                role="progressbar"
                                style={{ width: e.delivery_detail&&e.delivery_detail.dornot === 0 ? "50%" : "100%" }}
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                            <p>Order placed</p>
                            <p>Out of delivery</p>
                            <p>Delivered</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default DeliveryPage;
