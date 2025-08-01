import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addToCart } from "./features/counter/cartslice";
import { ToastContainer, toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import Navbar from './Navbar'
// import { getProducts } from '../../backend/src/controllers/browseController';

const Products = () => {
  const [product, setproduct] = useState([]);
  const selectedStore = useSelector((state) => state.store.selectedStore);
  // const [first, setFirst] = useState("hello")
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const data = jwtDecode(token);

  const handleAddToCart = (product) => {
    const { name, price, _id, userId } = product;
    dispatch(addToCart({ "productId": _id, name, price, "shopId": userId , IdofUser:data.id }));
  }

  const GetProduct = async (url) => {
    // e.preventDefault();



    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },

      })
      const data1 = await response.json();
      if (data1.success) {
        // toast.success("done successfully");
        setproduct(data1.data);

        return;
      }
      else {
        toast.error(data1.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }
  useEffect(() => {
    // if(!selectedStore) return;
    const url = `http://localhost:8000/api/users/get-product?userId=${localStorage.getItem("storeOwnerId")}`
    GetProduct(url)
  }, [])
  // if(!selectedStore) return <p>No store selected</p>
  console.log(product);
  return (
    <div>
      <Navbar />
      {product.length > 0 ? (
        <h2>{product[0].store?.storeName}</h2>
      ) : (
        <h2>Loading store...</h2>
      )}
      {product.map((data) => {
        return (<div key={data._id}>
          <div key={data._id} className="store-card border">
            <div className="card m-auto w-[55vw]">

              {/* <img src={store.image} /> */}
              <p>{data.name}</p>
              <h2>{data.describe}</h2>
              <p>{data.price}$</p>
              <button className='border' onClick={() => { handleAddToCart(data) }}>Add To CART</button>

            </div>
          </div>
        </div>)
      })}
    </div>
  )
}

export default Products
