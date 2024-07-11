import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./Slices/filterSlice";
import sortSlice from "./Slices/sortSlice";
import cartSlice from "./Slices/cartSlice";
import paginationSlice from "./Slices/paginationSlice";
import pizzasSlice from "./Slices/pizzasSlice";
export const store = configureStore({
  reducer: {
    filter: filterSlice,
    sort: sortSlice,
    cart: cartSlice,
    pagination: paginationSlice,
    pizzas: pizzasSlice,
  },
});
