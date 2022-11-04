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
    findProduct: (state, action) => {
      console.log("I should find certain products");
    },
    sortByPrice: (state, action) => {
      console.log("I will sort by price");
    },
    sortByCategories: (state, action) => {
      console.log("I will sort by categories");
    },
    updateProduct: (state, action) => {
      console.log("I will update");
    },
    deleteProduct: (state, action: PayloadAction<Product>) => {
     console.log('delete')
    },
  },
  extraReducers: (build) => {
    build.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
const productsReducer = productsSlicer.reducer;
export default productsReducer;
