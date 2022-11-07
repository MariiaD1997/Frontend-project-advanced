import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
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
    sortByPrice: (state, action) => {
      state.sort((a, b) => (a.price > b.price ? 1 : -1));
    },
    updateProduct: (state, action) => {
      console.log("I will update");
    },
    searchProduct: (state, action) => {
      return state.filter((item) => {
        return (
          item.title.toLowerCase().indexOf(action.payload.toLowerCase()) > -1
        );
      });
    },
    deleteProduct: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (build) => {
    build.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
const productsReducer = productsSlicer.reducer;
const { sortByPrice, deleteProduct, searchProduct } = productsSlicer.actions;
export default productsReducer;
