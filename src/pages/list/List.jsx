
import React, { useState, useEffect } from 'react';
import './List.css';
import axios from 'axios';

const List = () => {
  const [data, setData] = useState([]);

  const getAllFood = () => {
    axios.get("http://localhost:1000/food")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleDelete = (id) => {
  //   axios.delete(`http://localhost:1000/api/delete/${id}`).then((response) => {
  //       alert(response.data); // Show response from server
  //       setData(data.filter(item => item._id !== id)); // Update state to reflect changes
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting food:", error); // Debugging log
  //       alert("Failed to delete the item");
  //     });
  // };
  
  const handleDelete = (id) => {
    // axios.delete(`http://localhost:1000/delete/${id}`)
    axios.delete(`http://localhost:1000/delete/${id}`)
      .then((response) => {
        alert(response.data); // Show response from server
        setData(data.filter(item => item._id !== id)); // Update state
      })
      .catch((error) => {
        console.error("Error deleting food:", error); // Debugging log
        alert("Failed to delete the item");
      });
  };
  
  
  useEffect(() => {
    getAllFood();
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className='list add flex-col'>
      <p>All food list</p>
      <div className="list-table">
        <div className="list-table-format-title">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          {/* <b>Category</b> */}
          <b>Price</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`http://localhost:1000/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.description}</p>
            {/* <p>{item.category}</p> */}
            <p>${item.price}</p>
            <p onClick={() => handleDelete(item._id)} className='cursor'>x</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;


// import React, { useState, useEffect } from 'react';
// import './List.css';
// import axios from 'axios';

// const List = () => {
//   const [data, setData] = useState([]);

//   // Fetch all food items
//   const getAllFood = () => {
//     axios.get("http://localhost:1000/food")
//       .then((response) => {
//         console.log("Fetched data:", response.data); // Debug fetched data
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching food data:", error);
//       });
//   };

//   // Delete food item
//   const handleDelete = (id) => {
//     console.log("Attempting to delete item with id:", id); // Debug ID before deletion
//     axios.delete(`http://localhost:1000/delete/${id}`)
//       .then((response) => {
//         console.log("Delete response:", response.data); // Debug the server response
//         alert(response.data.message || "Item deleted successfully");
//         // Update the frontend list by filtering out the deleted item
//         setData(prevData => {
//           console.log("Current data before update:", prevData); // Debug current state
//           return prevData.filter(item => item._id !== id);
//         });
//       })
//       .catch((error) => {
//         console.error("Error deleting food:", error); // Log the error for debugging
//         alert("Failed to delete the item");
//       });
//   };

//   // Fetch food list when component mounts
//   useEffect(() => {
//     getAllFood();
//   }, []); // Empty dependency array ensures it runs once on mount

//   return (
//     <div className='list add flex-col'>
//       <p>All food list</p>
//       <div className="list-table">
//         <div className="list-table-format-title">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Description</b>
//           <b>Price</b>
//           <b>Action</b>
//         </div>
//         {data.map((item) => (
//           <div key={item._id} className="list-table-format">
//             <img src={`http://localhost:1000/images/${item.image}`} alt={item.name} />
//             <p>{item.name}</p>
//             <p>{item.description}</p>
//             <p>${item.price}</p>
//             <p onClick={() => handleDelete(item._id)} className='cursor'>x</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default List;
