

import React, { useState, useEffect } from "react";
import axios from "axios";


const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
    fetchOrders(); // cleanly separate API logic
  }, []);
  const API_BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:3002"
      : "https://niveshak-backend.onrender.com";


  const fetchOrders = () => {
    axios
      .get(`${API_BASE_URL}/allOrders`)
      .then((res) => {
        setAllOrders(res.data);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  };

  const cancelOrder = (orderId) => {
  axios
    .delete(`${API_BASE_URL}/deleteOrder/${orderId}`)
    .then((res) => {
      console.log(res.data); 
      fetchOrders();
      // setAllOrders(res.data);// e.g. "Order deleted successfully!"
    })
    .catch((err) => {
      console.error("Error deleting order:", err);
    });
};



  // useEffect(() => {
  //   axios.get("http://localhost:3002/allOrders").then((res) => {
  //     // console.log(res.data);
  //     setAllOrders(res.data);
  //   });
  // }, []);




// const Positions = () => {
  return (
    <>
      <h3 className="title">Orders ({allOrders.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            {/* <th>Instrument</th> */}
            <th>Qty.</th>
            <th>Price</th>
            <th>Mode</th>
            {/* <th>P&L</th>
            <th>Chg.</th> */}
            
          </tr>

          {allOrders.map((stock, index) => {

            return (
              <tr key={index}>
                {/* <td>{stock.product}</td> */}
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                {/* <td>{stock.avg.toFixed(2)}</td> */}
                <td>{stock.price.toFixed(2)}</td>
                <td>{stock.mode}</td>
                <td><button onClick={()=>cancelOrder(stock.orderId)}>cancle</button></td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Orders;

