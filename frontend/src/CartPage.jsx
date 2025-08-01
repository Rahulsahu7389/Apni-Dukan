import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Navbar from "./Navbar";
import { ToastContainer,toast } from "react-toastify";
import { removeFromCart, clearCart,incrementQuantity,decrementQuantity } from "./features/counter/cartslice";

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const [CheckoutData, setCheckoutData] = useState({

    })

    const handleCheckOut = async ()=>{
      const url = "http://localhost:8000/api/users/checkout";
      const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      try {
        const response = await fetch(url , {
          method:"POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body:JSON.stringify({cartItems , totalPrice})
        })
        const data = await response.json();
        if(data.success){
          toast.success(data.message);
          dispatch(clearCart());
        }
      } catch (error) {
        toast.error(error)
      }
    }
    console.log(cartItems);

    return (
        <div>
            <Navbar/>
            <h2>Your Cart</h2>
      {cartItems.length === 0 && <p>No items in cart</p>}
      {cartItems.map((item) => (
        <div key={item.productId} className="border p-2 flex justify-between items-center">
          <div>
            <p className="font-bold">{item.name} - {item.price}₹</p>
            <div className="flex items-center">
              <button 
                onClick={() => dispatch(decrementQuantity(item.productId))}
                className="px-2 bg-gray-300"
              >-</button>
              <span className="px-3">{item.quantity}</span>
              <button 
                onClick={() => dispatch(incrementQuantity(item.productId))}
                className="px-2 bg-gray-300"
              >+</button>
            </div>
          </div>
          <button 
            onClick={() => dispatch(removeFromCart(item.productId))}
            className="bg-red-500 text-white px-2 rounded"
          >
            Remove
          </button>
        </div>
      ))}

            {cartItems.length > 0 && (
              <div>

                <button
                    onClick={() => dispatch(clearCart())}
                    className="bg-gray-500 text-white p-2 mt-2 rounded"
                    >
                    Clear Cart
                </button>
                <button onClick={handleCheckOut} className="bg-blue-500 text-white p-2 mt-2 rounded">
                    Checkout
                </button>
                </div>
            )}
            <ToastContainer/>
        </div>
    );
};

export default Cart;
