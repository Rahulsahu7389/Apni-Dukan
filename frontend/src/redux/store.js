import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/couterSlice'
import storeReducer from '../features/counter/storeId'
import cartReducer from '../features/counter/cartslice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    store:storeReducer,
    cart:cartReducer,
  },
})