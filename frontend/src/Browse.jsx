import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setSelectedStore } from './features/counter/storeId'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const Browse = ({stores}) => {
  const [Stores, setStores] = useState([]);
  // const [first, setFirst] = useState("hello")
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const GetStores = async (e) => {
    // e.preventDefault();
    const token = localStorage.getItem('token');
    const url = "http://localhost:8000/api/users/browse";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },

      })
      const data = await response.json();
      if (data.success) {
        // toast.success("done successfully");
        setStores(data.message);

        return;
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }

  const handleStoreClick = (store,link)=>{
    dispatch(setSelectedStore(store));
    localStorage.setItem('storeOwnerId',store.userId)
    navigate(`/store/${link}`)

  }

  useEffect(() => {
    GetStores();
  }, [])
  console.log(Stores);
  // console.log(first)


  return (

    <div>
      <Navbar />
      {Stores.map((data) => {
        return (<div key={data._id}>
          <div key={data._id} onClick={()=>{handleStoreClick(data,data.slug)
          }} className="store-card border">
            <div   className="card m-auto w-[55vw]">

              {/* <img src={store.image} /> */}
              <h2>{data.storeName}</h2>
              <p>{data.category} | {data.address}</p>
              <button>Visit Store</button>
            </div>
          </div>
        </div>)
      })}
      <ToastContainer />
    </div>
  )
}

export default Browse
