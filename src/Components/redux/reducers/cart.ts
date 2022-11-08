import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProps } from "../../types/cart";

const initialState: CartProps[] = [];

const cartSlicer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartProps>) => {
      return [...state, action.payload];
    },
    deleteFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});
const cartReducer = cartSlicer.reducer;
export const { addItemToCart, deleteFromCart } = cartSlicer.actions;

export default cartReducer;
