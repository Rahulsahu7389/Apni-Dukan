// storeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const storeSlice = createSlice({
  name: "store",
  initialState: {
    selectedStore: null,  // will store the clicked store ID or object
  },
  reducers: {
    setSelectedStore: (state, action) => {
      state.selectedStore = action.payload;
    },
    clearSelectedStore: (state) => {
      state.selectedStore = null;
    }
  }
});

export const { setSelectedStore, clearSelectedStore } = storeSlice.actions;
export default storeSlice.reducer;
