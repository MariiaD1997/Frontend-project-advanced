import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProps } from "../../types/cart";

const initialState: CartProps[] = [];

const cartSlicer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      return [...state, action.payload];
    },
    deleteFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      state.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity = item.quantity + 1;
          return item;
        }
      });
    },
    decreaseQuantity: (state, action) => {
      state.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity = item.quantity - 1;
          return item;
        }
      });
    },
    replaceCartItem: (state, action: PayloadAction<CartProps>) => {
      const newCart = state.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
      return newCart;
    },
  },
});
const cartReducer = cartSlicer.reducer;
export const {
  addItemToCart,
  deleteFromCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlicer.actions;

export default cartReducer;
