// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: JSON.parse(localStorage.getItem("cart")) || []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const exists = state.items.find(item => item.productId === action.payload.productId);
            if (exists) {
                exists.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        incrementQuantity: (state, action) => {
            const item = state.items.find(i => i.productId === action.payload);
            if (item) {
                item.quantity += 1;
                localStorage.setItem("cart", JSON.stringify(state.items));
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.items.find(i => i.productId === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.items = state.items.filter(i => i.productId !== action.payload);
            }
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.productId !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state.items));
        },


        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem("cart");
        }
    }
});

export const { addToCart, removeFromCart, clearCart , incrementQuantity,decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
