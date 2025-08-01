import React from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const Register = () => {
  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
    username: "",
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/api/auth/register";
    const {email,username,password} = LoginData;
    if(username === "" || email === "" || password === ""){
      toast.error("fill all the fiels")
      return;
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(LoginData)
      })
      const data = await response.json();
      if(data.success){
        toast.success("registered successfully!")
        return 
      }
      else{
        toast.error(message)
      }
    } catch (error) {
      toast.error(error)
    }

  }
  const handlechange = (e) => {

    const {name , value} = e.target;
    setLoginData({ ...LoginData, [name]: value })
  }
  console.log(LoginData);
  return (
    <div>
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit} className='flex flex-col bg-white rounded shadow-lg p-12 mt-12'>
          <input className='flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2' onChange={handlechange} value={LoginData.username} type="name" name="username" placeholder='enter name' />
          <input className='flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2' onChange={handlechange} value={LoginData.email} type="email" name="email" placeholder='enter email' />
          <input className='flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2' onChange={handlechange} value={LoginData.password} type="password" name="password" placeholder='enter password' />
          <button type="submit">Register</button>
        </form>

      </div>
      <ToastContainer/>
    </div>
  )
}

export default Register
