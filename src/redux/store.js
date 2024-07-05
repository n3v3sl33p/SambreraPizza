import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./Slices/filterSlice";
import sortSlice from "./Slices/sortSlice";
import cartSlice from "./Slices/cartSlice";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    sort: sortSlice,
    cart: cartSlice,
  },
});
