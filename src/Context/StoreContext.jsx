

// import { createContext, useEffect, useState } from "react";
// import axios from 'axios';

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState({});
//   const [food_list, setFoodList] = useState([]);
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

//   // Fetch food list data from the API
//   useEffect(() => {
//     const fetchFoodList = async () => {
//       try {
//         const response = await axios.get("http://localhost:1000/food");
//         setFoodList(response.data);
//       } catch (error) {
//         console.error("Error fetching food list:", error);
//       }
//     };
//     fetchFoodList();
//   }, []);

//   useEffect(() => {
//     // Initialize cart from localStorage or default to an empty object
//     const savedCart = JSON.parse(localStorage.getItem('cart')) || {};
//     setCartItems(savedCart);
//   }, []);

//   useEffect(() => {
//     // Save cart to localStorage whenever it changes
//     localStorage.setItem('cart', JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (itemId) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
//     }));
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => {
//       if (prev[itemId] > 1) {
//         return { ...prev, [itemId]: prev[itemId] - 1 };
//       } else {
//         const { [itemId]: _, ...rest } = prev;
//         return rest;
//       }
//     });
//   };

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         let itemInfo = food_list.find((product) => product._id === item);
//         if (itemInfo) {
//           totalAmount += itemInfo.price * cartItems[item];
//         }
//       }
//     }
//     return totalAmount;
//   };

//   const signIn = (userData) => {
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   const signOut = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   const contextValue = {
//     food_list,
//     cartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     user,
//     signIn,
//     signOut
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;
import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [category, setCategory] = useState("All"); // State for managing the selected category

  // Fetch food list data from the API
  useEffect(() => {
    const fetchFoodList = async () => {
      try {
        const response = await axios.get("http://localhost:1000/food");
        setFoodList(response.data); // Ensure each item includes a category field
      } catch (error) {
        console.error("Error fetching food list:", error);
      }
    };
    fetchFoodList();
  }, []);

  useEffect(() => {
    // Initialize cart from localStorage or default to an empty object
    const savedCart = JSON.parse(localStorage.getItem('cart')) || {};
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] > 1) {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      } else {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const signIn = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Filter food list based on the selected category
  const filteredFoodList = category === "All" ? food_list : food_list.filter(item => item.category === category);

  const contextValue = {
    food_list: filteredFoodList, // Provide filtered food list
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    user,
    signIn,
    signOut,
    category,
    setCategory // Provide setCategory to change category
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
