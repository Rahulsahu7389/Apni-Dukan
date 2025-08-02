import React from 'react'
import { useState, useEffect } from 'react';
import { clearCart} from "./features/counter/cartslice";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [role, setrole] = useState("")
    useEffect(() => {
        if (token) {
            const dec = jwtDecode(token)
            setrole(dec.role)
            console.log(dec.role)
        }


    }, [])
    const dispatch = useDispatch();

    const handleLogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("storeOwnerId");
        dispatch(clearCart()); // also clears Redux + cart localStorage
        navigate("/");
    }

    const hidesidebar = () => {
        const sidebar = document.querySelector(".sidebar")
        sidebar.style.display = "None"
    }
    const showSidebar = () => {
        const sidebar = document.querySelector(".sidebar")
        sidebar.style.display = "flex"
    }
    return (
        <div>
            {/* <nav >
                <ul className="sidebar" >
                    <li onClick={hidesidebar}><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></a></li>
                    <li><a href="#">logo</a></li>
                    <li><a href="#">Service</a></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Forum</a></li>
                </ul>
            </nav>
            <nav>
                <ul>
                    <li className="onMobile"><a href="#">logo</a></li>
                    <li className="onMobile"><a href="#">Service</a></li>
                    <li className="onMobile"><a href="#">Products</a></li>
                    <li className="onMobile"><a href="#">About</a></li>
                    <li className="onMobile"><a href="#">Forum</a></li>
                    <li className="menu-btn" onClick={showSidebar}><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg></a></li>
                </ul>
            </nav > */}
            {role === "user" && (
                <>
                    <nav >
                        <ul className="sidebar" >
                            <li onClick={hidesidebar}><NavLink to="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></NavLink></li>
                            <li><NavLink href="#">logo</NavLink></li>
                            <li><NavLink to="/browse">Browse</NavLink></li>
                            <li><NavLink to="/my-orders">My Orders</NavLink></li>
                            <li><NavLink to="/cart">Cart</NavLink></li>
                            <li onClick={handleLogOut}><NavLink to="/">LogOut</NavLink></li>

                        </ul>
                    </nav>
                    <nav>
                        <ul>
                            {/* <li onClick={hidesidebar}><NavLink to="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></NavLink></li> */}
                            <li><NavLink className="onMobile" href="#">logo</NavLink></li>
                            <li><NavLink className="onMobile" to="/browse">Browse</NavLink></li>
                            <li><NavLink className="onMobile" to="/my-orders">My Orders</NavLink></li>
                            <li><NavLink className="onMobile" to="/cart">Cart</NavLink></li>
                            <li onClick={handleLogOut}><NavLink className="onMobile" to="/">LogOut</NavLink></li>
                            <li className="menu-btn" onClick={showSidebar}><NavLink to="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg></NavLink></li>
                        </ul>
                    </nav >

                </>)}
            {role === "admin" && (
                <>
                    <nav >
                        <ul className="sidebar" >
                            <li onClick={hidesidebar}><NavLink to="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></NavLink></li>
                            <li><NavLink href="#">logo</NavLink></li>
                            <li><NavLink href="#">Manage</NavLink></li>
                            <li><NavLink href="#">Analytics</NavLink></li>
                            <li><NavLink to="/browse">Browse</NavLink></li>
                            <li><NavLink to="/">LogOut</NavLink></li>

                        </ul>
                    </nav>
                    <nav>
                        <ul>
                            {/* <li onClick={hidesidebar}><NavLink to="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></NavLink></li> */}
                            <li><NavLink className="onMobile" href="#">logo</NavLink></li>
                            <li><NavLink className="onMobile" href="#">Manage</NavLink></li>
                            <li><NavLink className="onMobile" href="#">Analytics</NavLink></li>

                            <li><NavLink className="onMobile" to="/browse">Browse</NavLink></li>

                            <li><NavLink className="onMobile" onClick={handleLogOut}>LogOut</NavLink></li>
                            <li className="menu-btn" onClick={showSidebar}><NavLink to="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg></NavLink></li>
                        </ul>
                    </nav >

                </>)}
            {role === "manager" && (
                <>
                    <nav >
                        <ul className="sidebar" >
                            <li onClick={hidesidebar}><NavLink to="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></NavLink></li>
                            <li><NavLink to="#">logo</NavLink></li>
                            <li><NavLink to="/vendor/create-store">My Store</NavLink></li>
                            <li><NavLink to="/browse">Browse</NavLink></li>
                            <li><NavLink to="/add-products">Add Products</NavLink></li>
                            <li><NavLink to="/manager-orders">Orders</NavLink></li>
                            <li><NavLink to="/">LogOut</NavLink></li>

                        </ul>
                    </nav>
                    <nav>
                        <ul>
                            {/* <li onClick={hidesidebar}><NavLink to="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></NavLink></li> */}
                            <li><NavLink className="onMobile" href="#">logo</NavLink></li>
                            <li><NavLink className="onMobile" to="/vendor/create-store">My Store</NavLink></li>
                            <li><NavLink className="onMobile" to="/browse">Browse</NavLink></li>
                            <li><NavLink className="onMobile" to="/add-products">Add Products</NavLink></li>
                            <li><NavLink className="onMobile" to="/manager-orders">Orders</NavLink></li>
                            <li><NavLink className="onMobile" to="/">LogOut</NavLink></li>
                            <li className="menu-btn" onClick={showSidebar}><NavLink to="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg></NavLink></li>
                        </ul>
                    </nav >

                </>)}

        </div >
    )
}

export default Navbar
