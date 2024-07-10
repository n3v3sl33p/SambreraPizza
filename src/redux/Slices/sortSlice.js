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
      state.index = Number(action.payload);
    },
    changeDirection: (state) => {
      state.direction = !state.direction;
    },
    setDirection: (state, action) => {
      state.direction = Number(action.payload);
    },
  },
});
export const { changeSort, changeDirection, setDirection } = sortSlice.actions;

export default sortSlice.reducer;
