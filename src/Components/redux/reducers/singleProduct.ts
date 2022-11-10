import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../types/products";

export const fetchSingleProduct = createAsyncThunk(
  "fetchSingleProduct",
  async (id: number) => {
    const singleProduct = await fetch(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
    return await singleProduct.json();
  }
);

const initialState: Product[] = [];
const singleProductSlicer = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      return [action.payload];
    });
  },
});
const singleProductReducer = singleProductSlicer.reducer;
export default singleProductReducer;
