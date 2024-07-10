import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  index: 0,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.index = Number(action.payload);
    },
  },
});

export const { changeCategory } = filterSlice.actions;

export default filterSlice.reducer;
