import React, { useState, useEffect } from 'react';
import './Order.css';
import axios from 'axios'
const Order = () => {
  const [data, setData] = useState([]);

  // Fetch all orders
  const getAllOrders = () => {
    axios.get("http://localhost:1000/orders")
      .then((response) => {
        console.log("Orders fetched successfully:", response.data); // Debugging
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error); // Debugging
      });
  };
  

  // Delete an order
  const handleDelete = (id) => {
    axios.delete(`http://localhost:1000/delete/${id}`)
      .then(() => {
        alert("Order has been deleted");
        // Refresh data after deletion
        setData(prevData => prevData.filter(item => item._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
        alert("Failed to delete the order");
      });
  };

  // Fetch orders on component mount
  useEffect(() => {
    getAllOrders();
  }, []); // Empty dependency array to ensure this runs only once

  return (
    <div className='list add flex-col'>
      <p>All Food Orders</p>
      <div className="list-table">
        <div className="list-table-format-title">
          <b>Image</b>
          <b>Name</b>
          <b>Quantity</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {data.length === 0 ? (
          <p>No orders available</p>
        ) : (
          data.map((item) => (
            <div key={item._id} className="list-table-format">
            <img src={`http://localhost:1000/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
              <p>{item.quantity}</p>
              <p>${item.price}</p>
              <p onClick={() => handleDelete(item._id)} className='cursor'>x</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Order;



