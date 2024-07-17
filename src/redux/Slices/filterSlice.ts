import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface FilterSliceState {
  index: number;
}

const initialState: FilterSliceState = {
  index: 0,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
  },
});
export const SelectFilter = (state: RootState) => state.filter.index;
export const { changeCategory } = filterSlice.actions;

export default filterSlice.reducer;
