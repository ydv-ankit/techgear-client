import { ProductData } from "@/types/product";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { items: ProductData[] } = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      state.items.push(action.payload);
    },
    remove: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const { add, remove, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
