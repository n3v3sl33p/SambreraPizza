import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./Slices/filterSlice";
import sortSlice from "./Slices/sortSlice";
export const store = configureStore({
  reducer: {
    filter: filterSlice,
    sort: sortSlice,
  },
});
