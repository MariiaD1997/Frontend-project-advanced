import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import { Product } from "../../types/products";

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const allProducts = await fetch("https://api.escuelajs.co/api/v1/products");
  return await allProducts.json();
});

const initialState: Product[] = [];
const productsSlicer = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortAsc: (state) => {
      state.sort((a, b) => a.price - b.price);
    },
    sortDesc: (state) => {
      state.sort((a, b) => b.price - a.price);
    },
    sortNames: (state) => {
      state.sort((a, b) => (a.title > b.title ? 1 : -1));
    },

    updateProduct: (state, action) => {
      console.log("I will update");
    },
  },
  extraReducers: (build) => {
    build.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
const productsReducer = productsSlicer.reducer;
export const { sortAsc, sortDesc, sortNames } = productsSlicer.actions;
export default productsReducer;
