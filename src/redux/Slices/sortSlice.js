import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  index: 0,
  direction: 0,
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    changeSort: (state, action) => {
      state.index = action.payload;
    },
    changeDirection: (state) => {
      state.direction = !state.direction;
    },
  },
});
export const { changeSort, changeDirection } = sortSlice.actions;

export default sortSlice.reducer;
