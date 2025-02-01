// import { useContext, useState } from "react";
// import "./PlaceOrder.css";
// import { StoreContext } from "../../Context/StoreContext";
// import axios from 'axios';

// export default function PlaceOrder() {
 
//     const isCartEmpty = () => {
//       // Check if the cart is empty by verifying if there are no items
//       return !Object.values(cartItems).some(quantity => quantity == 0);
//   };
  
  
//   if(isCartEmpty){
//     alert("Please add items to your cart before placing an order")
//   } else{

//   }

//     const { getTotalCartAmount, food_list, cartItems } = useContext(StoreContext);
//     const [data, setData] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         street: "",
//         city: "",
//         state: "",
//         zipcode: "",
//         country: "",
//         phone: ""
//     });

//     const onChangeHandle = (event) => {
//         const { name, value } = event.target;
//         setData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const placeOrder = async (event) => {
//         event.preventDefault();

//         // Create orderItems array with product IDs
//         let orderItems = food_list
//             .filter(item => cartItems[item._id] > 0)
//             .map(item => ({
//                 _id: item._id, 
//                 quantity: cartItems[item._id],
//                 price: item.price  // Ensure price is included
//             }));

//         let orderData = {
//             email: data.email,  // Include email
//             price: getTotalCartAmount() + 2,  // Total price
//             quantity: orderItems.reduce((sum, item) => sum + item.quantity, 0),  // Total quantity
//             product: orderItems.map(item => item._id)  // Product IDs
//         };

//         try {
//             await axios.post("http://localhost:1000/order/create", orderData);
//             alert("Order placed successfully");
//         } catch (error) {
//             console.error("Error placing order:", error);
//             alert("Failed to place the order");
//         }

//     };

//     return (
//         <form onSubmit={placeOrder} className="place-order">
//             <div className="place-order-left">
//                 <p className="title">Delivery Information</p>
//                 <div className="multi-fields">
//                     <input required name="firstName" onChange={onChangeHandle} value={data.firstName} type="text" placeholder="First name" />
//                     <input name="lastName" onChange={onChangeHandle} value={data.lastName} type="text" placeholder="Last name" />
//                 </div>
//                 <input required name="email" onChange={onChangeHandle} value={data.email} type="email" placeholder="Email address" />
//                 <input required name="street" onChange={onChangeHandle} value={data.street} type="text" placeholder="Street" />
//                 <div className="multi-fields">
//                     <input required name="city" onChange={onChangeHandle} value={data.city} type="text" placeholder="City" />
//                     <input required name="state" onChange={onChangeHandle} value={data.state} type="text" placeholder="State" />
//                 </div>
//                 <div className="multi-fields">
//                     <input required name="zipcode" onChange={onChangeHandle} value={data.zipcode} type="text" placeholder="Zip code" />
//                     <input required name="country" onChange={onChangeHandle} value={data.country} type="text" placeholder="Country" />
//                 </div>
//                 <input required name="phone" onChange={onChangeHandle} value={data.phone} type="text" placeholder="Phone" />
//             </div>
//             <div className="place-order-right">
//                 <div className="cart-total">
//                     <h2>Cart Totals</h2>
//                     <div>
//                         <div className="cart-total-details">
//                             <p>Subtotal</p>
//                             <p>${getTotalCartAmount()}</p>
//                         </div>
//                         <hr />
//                         <div className="cart-total-details">
//                             <p>Delivery Fee</p>
//                             <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
//                         </div>
//                         <hr />
//                         <div className="cart-total-details">
//                             <b>Total</b>
//                             <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
//                         </div>
//                     </div>
//                     <button type="submit">PROCEED TO PAYMENT</button>
//                 </div>
//             </div>
//         </form>
//     );
// }


import { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from 'axios';

export default function PlaceOrder() {
    const { getTotalCartAmount, food_list, cartItems } = useContext(StoreContext);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });
    const [error, setError] = useState("");

    const onChangeHandle = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const isCartEmpty = () => {
        console.log("Cart Items:", cartItems); // Log cartItems for debugging
        const empty = !Object.values(cartItems).some(quantity => quantity > 0);
        console.log("Is Cart Empty:", empty); // Log result of isCartEmpty check
        return empty;
    };

    const placeOrder = async (event) => {
        event.preventDefault();

        if (isCartEmpty()) {
            setError("Please add items to your cart before placing an order");
            return;
        }

        // Clear any previous errors
        setError("");

        // Create orderItems array with product IDs
        let orderItems = food_list
            .filter(item => cartItems[item._id] > 0)
            .map(item => ({
                _id: item._id, 
                quantity: cartItems[item._id],
                price: item.price  // Ensure price is included
            }));

        let orderData = {
            email: data.email,  // Include email
            price: getTotalCartAmount() + 2,  // Total price
            quantity: orderItems.reduce((sum, item) => sum + item.quantity, 0),  // Total quantity
            product: orderItems.map(item => item._id)  // Product IDs
        };

        try {
            await axios.post("http://localhost:1000/order/create", orderData);
            alert("Order placed successfully");
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place the order");
        }
    };

    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                {error && <p className="error">{error}</p>}
                <div className="multi-fields">
                    <input required name="firstName" onChange={onChangeHandle} value={data.firstName} type="text" placeholder="First name" />
                    <input name="lastName" onChange={onChangeHandle} value={data.lastName} type="text" placeholder="Last name" />
                </div>
                <input required name="email" onChange={onChangeHandle} value={data.email} type="email" placeholder="Email address" />
                <input required name="street" onChange={onChangeHandle} value={data.street} type="text" placeholder="Street" />
                <div className="multi-fields">
                    <input required name="city" onChange={onChangeHandle} value={data.city} type="text" placeholder="City" />
                    <input required name="state" onChange={onChangeHandle} value={data.state} type="text" placeholder="State" />
                </div>
                <div className="multi-fields">
                    <input required name="zipcode" onChange={onChangeHandle} value={data.zipcode} type="text" placeholder="Zip code" />
                    <input required name="country" onChange={onChangeHandle} value={data.country} type="text" placeholder="Country" />
                </div>
                <input required name="phone" onChange={onChangeHandle} value={data.phone} type="text" placeholder="Phone" />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button type="submit">PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    );
}
