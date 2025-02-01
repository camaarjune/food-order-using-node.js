// import { useState,useContext } from "react"
// import { assets } from "../../assets/assets"
// import "./Navbar.css"
// import { Link } from "react-router-dom"
// import { StoreContext } from "../../Context/StoreContext"


// export default function Navbar({setShowLogin}) {
//     const[menu, setMenu]=useState("home")

//     const {getTotalCartAmount,token,setToken} =useContext(StoreContext);
    
//     const logOut = () =>{
//       localStorage.removeItem("token");
//       setToken("");
//       navigate("/")



//     }

//   return (
//     <div className="navbar">
//       <Link to='/'><img src={assets.logo} alt=""  className="logo"/></Link>

//       <ul className="navbar-menu">
//         <Link to='/' onClick={()=> setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
//         <a href="#explore-menu" onClick={()=> setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
        
//         <a href="#app-download" onClick={()=> setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-app</a>
//         <a href="#footer" onClick={()=> setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</a>
//       </ul>

//        <div className="navbar-right">
//         <img src={assets.search_icon} alt="" />

//         <div className="navbar-search-icon">

//             <Link to='/cart'> <img src={assets.basket_icon} alt="" /> </Link>
//             <div className={getTotalCartAmount()===0?"":"dot"}></div>
//         </div>
        
//         {!token ?
//         <button onClick={()=>setShowLogin(true)}>Sign In</button>
//          : <div className="navbar-profile">
//           <img src={assets.profile_icon} alt="" />
//           <ul className="nav-profile-dropdown">
//             <li><img src={assets.bag_icon} alt="" />Orders</li>
//             <hr/>
//             <li onClick={logOut}><img src={assets.logout_icon} alt="" />Logout</li>

//           </ul>
         
//          </div>
//          }
//        </div>
//     </div>
//   )
// }

import { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

export default function Navbar({ setShowLogin }) {
    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount } = useContext(StoreContext);
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem("user");

    const logOut = () => {
        localStorage.removeItem("user"); // Clear user data
        navigate("/"); // Redirect to home
    };

    return (
        <div className="navbar">
            <Link to='/'>
                <img src={assets.logo} alt="Logo" className="logo" />
            </Link>

            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-app</a>
                <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
            </ul>

            <div className="navbar-right">
                <img src={assets.search_icon} alt="Search" />

                <div className="navbar-search-icon">
                    <Link to='/cart'>
                        <img src={assets.basket_icon} alt="Cart" />
                    </Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>

                {!isLoggedIn ? (
                    <button onClick={() => setShowLogin(true)}>Sign In</button>
                ) : (
                    <div className="navbar-profile">
                        <img src={assets.profile_icon} alt="Profile" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={logOut}><img src={assets.logout_icon} alt="Logout" />Sign Out</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
