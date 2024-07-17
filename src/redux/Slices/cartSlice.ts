import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
export type PizzaCartType = {
  imageUrl: string;
  title: string;
  price: number;
  activeType: number;
  activeSize: number;
  count: number;
  id: number;
};
interface CartSliceState {
  pizzas: PizzaCartType[];
}

const initialState: CartSliceState = {
  pizzas: JSON.parse(localStorage.getItem("cart") || "[]"),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza: (state, action: PayloadAction<PizzaCartType>) => {
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
    deletePizza: (state, action: PayloadAction<number>) => {
      const index = state.pizzas.findIndex((obj) => obj.id === action.payload);
      state.pizzas.splice(index, 1);
    },
    deleteAll: (state) => {
      state.pizzas = [];
    },
    increment: (state, action: PayloadAction<number>) => {
      state.pizzas[action.payload].count += 1;
    },
    decrement: (state, action: PayloadAction<number>) => {
      if (state.pizzas[action.payload].count === 1) {
        state.pizzas.splice(action.payload, 1);
      } else {
        state.pizzas[action.payload].count -= 1;
      }
    },
  },
});

export const selectCart = (state: RootState) => state.cart.pizzas;

export const { addPizza, deletePizza, deleteAll, increment, decrement } =
  cartSlice.actions;

export default cartSlice.reducer;
