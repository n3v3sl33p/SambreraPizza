import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.page = Number(action.payload);
    },
  },
});

export const { changePage } = paginationSlice.actions;
export default paginationSlice.reducer;
