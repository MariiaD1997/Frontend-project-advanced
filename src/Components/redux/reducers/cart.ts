import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProps } from "../../types/cart";

const initialState: CartProps[] = [];

const cartSlicer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartProps>) => {
      const productInCart = state.find((item) => {
        return item.id === action.payload.id;
      });
      if (productInCart) {
        state.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity = item.quantity + 1;
            return item;
          }
        });
      } else {
        state.push(action.payload);
      }
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
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
        if (item.id === action.payload.id && item.quantity > 0) {
          item.quantity = item.quantity - 1;
          return item;
        }
      });
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
