import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async (params) => {
    const { currentPage, sortIndex, direction, filterIndex } = params;

    const url = new URL("https://6682f2364102471fa4c8bd7a.mockapi.io/items");
    url.searchParams.append("page", currentPage);
    url.searchParams.append("limit", 4); // Пример ограничения количества элементов на странице
    url.searchParams.append("sortBy", ["rating", "price", "title"][sortIndex]);
    url.searchParams.append("order", direction ? "desc" : "asc");

    if (filterIndex) {
      url.searchParams.append("category", filterIndex);
    }
    console.log("aboba");
    console.log(url);
    const response = await axios.get(url);
    return response.data;
  }
);

const initialState = {
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

export default pizzasSlice.reducer;
