import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../types/products";
import axios from "axios";

export const fetchSingleProduct = createAsyncThunk(
  "fetchSingleProduct",
  async (id: number) => {
    const result = await axios.get(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
    const data = result.data;
    return data;
  }
);

export const updateProduct = createAsyncThunk(
  "updateOne",
  async (id: number) => {
    const result = await axios.put(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
    const data = result.data;
    return data;
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
