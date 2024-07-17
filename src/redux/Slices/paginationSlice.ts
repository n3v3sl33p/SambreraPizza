import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PaginationSliceState {
  page: number;
}

const initialState: PaginationSliceState = {
  page: 1,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<number>) => {
      state.page = Number(action.payload);
    },
  },
});

export const SelectPagination = (state: RootState) => state.pagination.page;

export const { changePage } = paginationSlice.actions;
export default paginationSlice.reducer;
