import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pizzas: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza: (state, action) => {
      const index = state.pizzas.findIndex(
        (obj) =>
          obj.title === action.payload.title &&
          obj.activeSize === action.payload.activeSize &&
          obj.activeType === action.payload.activeType
      );

      if (index >= 0) {
        state.pizzas[index].count += 1;
      } else {
        state.pizzas.push(action.payload);
      }
    },
    deletePizza: (state, action) => {
      const index = state.pizzas.findIndex((obj) => obj.id === action.payload);
      state.pizzas.splice(index, 1);
    },
    deleteAll: (state) => {
      state.pizzas = [];
    },
    increment: (state, action) => {
      state.pizzas[action.payload].count += 1;
    },
    decrement: (state, action) => {
      if (state.pizzas[action.payload].count === 1) {
        state.pizzas.splice(action.payload, 1);
      } else {
        state.pizzas[action.payload].count -= 1;
      }
    },
  },
});

export const { addPizza, deletePizza, deleteAll, increment, decrement } =
  cartSlice.actions;

export default cartSlice.reducer;
