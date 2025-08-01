import { useState } from 'react'
import { Route , Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './login'
import Register from './Register'
import CreateStore from './CreateStore'
import Products from './Products'
import Browse from './Browse'
// import StorePage from './StorePage'
import AddProduct from './AddProduct'
import Cart from './CartPage'
import Home from './Home'
import MyOrdersPage from './MyOrdersPage'

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/add-products' element={<AddProduct/>} />
      <Route path='/store/:slug' element={<Products/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/my-orders' element={<MyOrdersPage/>} />
      <Route path='/vendor/create-store' element={<CreateStore/>} />
      {/* <Route path="/store/:slug" element={<StorePage />} /> */}
      <Route path='/register' element={<Register/>} />
      <Route path='/browse' element={<Browse/>} />
      <Route path='/home' element={<Home/>} />
    </Routes>
      
    </>
  )
}

export default App
