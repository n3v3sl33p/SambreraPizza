import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
interface SortSliceState {
  sortIndex: number;
  direction: number;
}
const initialState: SortSliceState = {
  sortIndex: 0,
  direction: 0,
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    changeSort: (state, action: PayloadAction<number>) => {
      state.sortIndex = Number(action.payload);
    },
    changeDirection: (state) => {
      state.direction = Number(!state.direction);
    },
    setDirection: (state, action: PayloadAction<number>) => {
      state.direction = Number(action.payload);
    },
  },
});
export const SelectSort = (state: RootState) => state.sort;
export const { changeSort, changeDirection, setDirection } = sortSlice.actions;

export default sortSlice.reducer;
