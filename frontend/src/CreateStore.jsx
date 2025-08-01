import React from 'react'
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify'

const CreateStore = () => {
  const [StoreInfo, setStoreInfo] = useState({
    storeName: "",
    category: "",
    address: "",
    delivery: "",
    description: ""

  })
  const toSlug = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")     // remove special chars
      .replace(/\s+/g, "-");             // replace spaces with -
  };
  // const [Image, setImage] = useState(second)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreInfo({ ...StoreInfo, [name]: value });
  }
  // const handleImageChange = (e)=>{
  //   setImage(e.target.files[0])
  // }
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   for (let key in StoreInfo) {
  //     const value = StoreInfo[key]
  //     if ((value === "" || value === null)) {
  //       toast.error("fill all the details!")
  //       return;
  //     }
  //   }
  //   try {
  //     const url = "http://localhost:8000/manager/create-store";
  //     const val = jwtDecode(localStorage.getItem('token'));
  //     console.log(val);
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: { authorization: `Bearer ${localStorage.getItem('token')}`},
  //       body: JSON.stringify({ "userId": val.id, "slug":`${val.name}-${toSlug(StoreInfo.storeName)}`,...StoreInfo}),
  //       "Content-Type": "application/json"


  //     })
  //     const data = await response.json();
  //     if (data.success) {
  //       toast.success(data.message);
  //     }
  //     else {
  //       toast.error(data.message)
  //     }
  //   } catch (error) {
  //     toast.error(error)
  //   }
  // }
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate fields
  for (let key in StoreInfo) {
    const value = StoreInfo[key];
    if (value === "" || value === null || value.trim() === "") {
      toast.error(`Please fill ${key}`);
      return;
    }
  }

  try {
    const url = "http://localhost:8000/api/managers/create-store";
    const token = localStorage.getItem('token');
    const val = jwtDecode(token); // must be a valid JWT

    const payload = {
      userId: val.id,
      slug: `${val.name}-${toSlug(StoreInfo.storeName)}`,
      ...StoreInfo
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

  return (
    <div>
      <div className="container flex flex-col" >
        <h2>Fill Out the Details for Store</h2>
        <form action="" onSubmit={handleSubmit} className='flex flex-col'>

          <input type="text" name="storeName" onChange={handleChange} value={StoreInfo.storeName} id="" placeholder='enter store name' />
          <input type="text" name="category" onChange={handleChange} value={StoreInfo.category} id="" placeholder='enter category' />
          <input type="text" name="address" onChange={handleChange} value={StoreInfo.address} id="" placeholder='enter address' />
          <input type="text" name="delivery" onChange={handleChange} value={StoreInfo.delivery} id="" placeholder='Delivery possible?' />
          <input type="text" name="description" onChange={handleChange} value={StoreInfo.description} id="" placeholder='Enter Description' />
          {/* <input type="file" name="" id="" accept='image/*' onChange={handleImageChange} /> */}
          <button type="submit" className='border'>Create Store</button>
        </form>

      </div>
      <ToastContainer />
    </div>
  )
}

export default CreateStore
