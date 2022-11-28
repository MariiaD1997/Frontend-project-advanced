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

export const deleteOne = createAsyncThunk("delete", async (id: number) => {
  const result = await axios.delete(
    `https://api.escuelajs.co/api/v1/products/${id}`
  );
  const data = result.data;
  return data;
});

//Hardcoded it here bcs it didn't work other ways
const initialState: Product = {
  id: 2,
  title: "title",
  price: 10000,
  description: "descripcion",
  category: { id: 2, name: "Electronics", image: "image" },
  images: ["links"],
};
const singleProductSlicer = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

const singleProductReducer = singleProductSlicer.reducer;
export default singleProductReducer;
