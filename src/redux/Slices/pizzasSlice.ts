import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async (params: Record<string, number>) => {
    const { currentPage, sortIndex, direction, filterIndex } = params;
    const itemOnPage = "4";
    const url = new URL("https://6682f2364102471fa4c8bd7a.mockapi.io/items");
    url.searchParams.append("page", `${currentPage}`);
    url.searchParams.append("limit", itemOnPage);
    url.searchParams.append("sortBy", ["rating", "price", "title"][sortIndex]);
    url.searchParams.append("order", direction ? "desc" : "asc");

    if (filterIndex) {
      url.searchParams.append("category", `${filterIndex}`);
    }
    const { data } = await axios.get<PizzaType[]>(`${url}`);
    return data;
  }
);

export type PizzaType = {
  imageUrl: string;
  title: string;
  price: number;
  types: number[];
  sizes: number[];
  category: number;
  rating: number;
  count: number;
  id: number;
  index: number;
};
interface PizzasSliceState {
  items: PizzaType[];
  status: string;
}

const initialState: PizzasSliceState = {
  items: [],
  status: "",
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.items = [];
        state.status = "loading";
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "ok";
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.items = [];
        state.status = "error";
        console.log(action.payload);
      });
  },
});
export const SelectPizza = (state: RootState) => state.pizzas;
export default pizzasSlice.reducer;
