import React from 'react'
import { jwtDecode } from 'jwt-decode'
import { useState , useEffect } from 'react'
import { ToastContainer , toast } from 'react-toastify'
import Navbar from './Navbar'


const ManagerOrderPage = () => {
    const token = localStorage.getItem("token")
    const {id} = jwtDecode(token);
    const [myOrderInfo, setmyOrderInfo] = useState([]);
    const handleGetOrders = async ()=>{
        const url = `http://localhost:8000/api/users/get-orders?userId=${id}`;
        try {
            const response = await fetch(url , {
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json();
            if(data.success){
                toast.success("loaded successfully");
                setmyOrderInfo(data.data)
            }
        } catch (error) {
            toast.error(error);
        }
    }
    useEffect(() => {
      handleGetOrders();
    
    
    }, [])
    console.log("my order info is: ",myOrderInfo)
  return (
    <div>
        <Navbar/>
      
      {myOrderInfo.length > 0 ? (
        <h2>Your Ordered Items will be displayed here</h2>
      ) : (
        <h2>Loading store...</h2>
      )}
      {myOrderInfo.map((data) => {
        return (<div key={data._id}>
          <div key={data._id} className="store-card border flex justify-between my-2">
            <div className="card m-auto w-[55vw] flex items-center justify-between p-5">

              {/* <img src={store.image} /> */}
              <p>{data.name}</p>
              <h2>{data.describe}</h2>
              <p>{data.price}$</p>

            </div>
            <button onClick={handleRemoveOrder} className='bg-red-500 text-white rounded p-2'>Remove</button>
          </div>
        </div>)
      })}
        <ToastContainer/>
    </div>
  )
}

export default ManagerOrderPage
