import React from 'react'
import {jwtDecode} from "jwt-decode";
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  // console.log(decoded)
  
  const handlebtn1 = async (e)=>{
    e.preventDefault();
    const url = "http://localhost:8000/api/users/admin";
    const response = fetch(url , {
      method:"GET",
      headers:{Authorization:`Bearer ${token}`,"Content-Type": "application/json"},
    })
    const data = await response.json();
    console.log(data);
  }
  const handlebtn2 = async (e)=>{
    e.preventDefault();
    const url = "http://localhost:8000/api/users/manager";
    const response = fetch(url , {
      method:"GET",
      headers:{Authorization:`Bearer ${token}`,"Content-Type": "application/json"},
    })
    const data = await response.json();
    console.log(data);
  }
  const handlebtn3 = async (e)=>{
    e.preventDefault();
    const url = "http://localhost:8000/api/users/user";
    const response = fetch(url , {
      method:"GET",
      headers:{Authorization:`Bearer ${token}`,"Content-Type": "application/json"},
    })
    const data = await response.json();
    console.log(data);
  }
  return (
    <div>
      <Navbar/>
      {/* <button className='border' onClick={handleLogout}>logout</button> */}
      <button className='border'  onClick={handlebtn1}>for admin</button>
      <button className='border' onClick={handlebtn2}>for managers</button>
      <button className='border' onClick={handlebtn3}>for users</button>
      
    </div>
  )
}

export default Home
