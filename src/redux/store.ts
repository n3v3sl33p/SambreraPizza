import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./Slices/filterSlice";
import sortSlice from "./Slices/sortSlice";
import cartSlice from "./Slices/cartSlice";
import paginationSlice from "./Slices/paginationSlice";
import pizzasSlice from "./Slices/pizzasSlice";
import { useDispatch } from "react-redux";
export const store = configureStore({
  reducer: {
    filter: filterSlice,
    sort: sortSlice,
    cart: cartSlice,
    pagination: paginationSlice,
    pizzas: pizzasSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
