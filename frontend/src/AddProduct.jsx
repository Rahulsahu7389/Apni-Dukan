import React from 'react'
import Navbar from './Navbar'
import { ToastContainer , toast} from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'

const AddProduct = () => {
  const [AddProInfo, setAddProInfo] = useState({
    name: "",
    price: "",
    describe: "",
    available: "",
  })
  const handlechange = (e) => {
    const { name, value } = e.target;
    setAddProInfo({ ...AddProInfo, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    for (let key in AddProInfo) {
      const value = AddProInfo[key];
      if (value === "" || value === null || value.trim() === "") {
        toast.error(`Please fill ${key}`);
        return;
      }
    }

    try {
      const url = "http://localhost:8000/api/managers/add-products";
      const token = localStorage.getItem('token');
      const val = jwtDecode(token); // must be a valid JWT

      const payload = {
        userId: val.id,
        ...AddProInfo
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json", // ✅ required for JSON
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to create store");
      }

    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Try again.");
    }
  };
  console.log(AddProInfo);
  return (
    <div>
      <Navbar/>
      <div className="container">
        <h2>ENTER THE DETAILS FOR YOUR PRODUCT!</h2>
        <form action="" onSubmit={handleSubmit}>
          <input className='border' onChange={handlechange} value={AddProInfo.name} type="text" name="name" id="" placeholder='enter product name' />
          <input className='border' onChange={handlechange} value={AddProInfo.price} type="text" name="price" id="" placeholder='enter price' />
          <input className='border' onChange={handlechange} value={AddProInfo.describe} type="text" name="describe" id="" placeholder='describe' />
          <input className='border' onChange={handlechange} value={AddProInfo.available} type="text" name="available" id="" placeholder='is Avalailable' />
          <button type='submit'>submit</button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default AddProduct
