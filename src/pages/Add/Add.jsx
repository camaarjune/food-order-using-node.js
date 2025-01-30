// import React, { useState } from 'react';
// import './Add.css';
// import { assets } from '../../assets/assets';
// import axios from 'axios'; // Corrected import
// import { toast } from 'react-toastify';

// const Add = () => {
//   const [image, setImage] = useState(false);
//   const [data, setData] = useState({
//     name: "", // Properly initialize the state
//     description: "",
//     price: "",
//     category: "Salad",
//   });

//   const onChangeHandle = (event) => {
//     const { name, value } = event.target;
//     setData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const onFileChange = (event) => {
//     if (event.target.files.length > 0) {
//       setImage(event.target.files[0]);
//     }
//   };

//   const url = "http://localhost:4000";

//   const onSubmitHandle = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("description", data.description);
//     formData.append("price", Number(data.price));
//     formData.append("category", data.category);
//     formData.append("image", image);

//     try {
//       const response = await axios.post(`${url}/api/food/add`, formData);
//       if (response.data.success) {
//         setData({
//           name: "",
//           description: "",
//           price: "",
//           category: "Salad",
//         });
//         setImage(false);
//         toast.success(response.data.message)
//       } else {
//         toast.success(response.data.me)
//       }
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   return (
//     <div>
//       <div className="add">
//         <form className="flex-col" onSubmit={onSubmitHandle}>
//           <div className="add-img-upload flex-col">
//             <p>Upload Image</p>
//             <label htmlFor="image">
//               <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
//             </label>
//             <input
//               onChange={onFileChange}
//               type="file"
//               id="image"
//               required
//             />
//           </div>
//           <div className="add-product-name flex-col">
//             <p>Product name</p>
//             <input
//               onChange={onChangeHandle}
//               value={data.name}
//               type="text"
//               name="name"
//               placeholder="Type here"
//             />
//           </div>
//           <div className="add-product-description flex-col">
//             <p>Product description</p>
//             <textarea
//               onChange={onChangeHandle}
//               value={data.description}
//               name="description"
//               rows="6"
//               placeholder="Write content here"
//             ></textarea>
//           </div>
//           <div className="add-category-price flex-col">
//             <p>Product category</p>
//             <select
//               onChange={onChangeHandle}
//               value={data.category}
//               name="category"
//             >
//               <option value="Salad">Salad</option>
//               <option value="Rols">Rols</option>
//               <option value="Deserts">Deserts</option>
//               <option value="Sandwich">Sandwich</option>
//               <option value="Cake">CakePasta</option>
//               <option value="Pure veg">Pure veg</option>
//               <option value="Pasta">Pasta</option>
//               <option value="Noodles">Noodles</option>
//             </select>
//             <div className="add-price flex-col">
//               <p>Product Price</p>
//               <input
//                 onChange={onChangeHandle}
//                 value={data.price}
//                 type="number"
//                 name="price" // Ensure the correct name matching the state
//                 placeholder="$20"
//               />
//             </div>
//           </div>

//           <button type="submit" className="add-btn">Add</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Add;



// import React from 'react';
// import './Add.css';
// import axios from 'axios'; // Corrected import
// // import { toast } from 'react-toastify';
// import { useState } from 'react';


// const Add = () => {
//   const [name, setName] = useState([])
//   const [description, setDescription] = useState([])
//   const [price, setPrice] = useState([])
//   const [image, setImage] = useState([])


//   const handeAddFood = (event) => {
//     event.preventDefault()
//     axios.post("http://localhost:1000/food/create", {
//       "image": image,
//       "name": name,
//       "description": description,
//       "price": price,

//     },
//       {
//         headers: {
//           "Content-Type": "multipart/form-data"

//         }
//       }


//     ).then(() => {
//       alert("Food added successfully")
//     }).catch((error) => {
//       console.log(error)
//     })


//   }






//   return (
//     <div>
//       <div className="add">
//         <form className="flex-col">
//           <div className="add-img-upload flex-col">
//             <p>Upload Image</p>
          
//             <input onChange={(event) => setImage(event.target.files[0])} className="w-[500px] h-[50px] border-2 border-[#f4acb7] m-2 rounded " type="file" placeholder=" Enter image" />
        
//           </div>
//           <div className="add-product-name flex-col">
//             <p>Product name</p>
//             <input 
//             value={name}
//             onChange={(event) => setName(event.target.value)}

//               placeholder="Type here"
//             />
//           </div>
//           <div className="add-product-description flex-col">
//             <p>Product description</p>
//             <textarea
//             value={description}
//             onChange={(event) =>setDescription(event.target.value)}

//               rows="6"
//               placeholder="Write content here"
//             ></textarea>
//           </div>
//           <div className="add-category-price flex-col">
//             <p>Product category</p>
//             <select

//             >
//               <option value="Salad">Salad</option>
//               <option value="Rols">Rols</option>
//               <option value="Deserts">Deserts</option>
//               <option value="Sandwich">Sandwich</option>
//               <option value="Cake">CakePasta</option>
//               <option value="Pure veg">Pure veg</option>
//               <option value="Pasta">Pasta</option>
//               <option value="Noodles">Noodles</option>
//             </select>
//             <div className="add-price flex-col">
//               <p>Product Price</p>
//               <input
//               value={price}
//               onChange={(event) => setPrice(event.target.value)}
//                 placeholder="$20"
//               />
//             </div>
//           </div>

//           <button onClick={handeAddFood} className="add-btn">Add</button>
//         </form>
//       </div>
//     </div>
//   );
// }








import React, { useState } from 'react';
import './Add.css';
import axios from 'axios';

const Add = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleAddFood = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('image', image);
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);

    try {
      await axios.post('http://localhost:1000/food/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Food added successfully');
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
      });
      setImage(null);
    } catch (error) {
      console.error('Error adding food:', error);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleAddFood}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <input
            type="file"
            className="w-[500px] h-[50px] border-2 border-[#f4acb7] m-2 rounded"
            onChange={handleFileChange}
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Type here"
            onChange={handleInputChange}
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            name="description"
            value={formData.description}
            rows="6"
            placeholder="Write content here"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="add-category-price flex-col">
          <p>Product Category</p>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select category</option>
            <option value="Salad">Salad</option>
            <option value="Rols">Rols</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure veg">Pure veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              type="text"
              name="price"
              value={formData.price}
              placeholder="$20"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button type="submit" className="add-btn">Add</button>
      </form>
    </div>
  );
};

export default Add;
