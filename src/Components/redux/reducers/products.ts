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
    sortByPrice: (state) => {
      state.sort((a, b) => a.price - b.price);
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
const { sortByPrice } = productsSlicer.actions;
export default productsReducer;
