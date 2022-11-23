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

export const updateOne = createAsyncThunk(
  "updateOne",
  async ({ id, data }: { id: number; data: Product }) => {
    const result = await axios.put(
      `https://api.escuelajs.co/api/v1/products/${id}`,
      data
    );
    console.log(result.data);
    return result.data;
  }
);

export const deleteOne = createAsyncThunk("delete", async (id: number) => {
  const result = await axios.delete(
    `https://api.escuelajs.co/api/v1/products/${id}`
  );
  const data = result.data;
  return data;
});

const initialState: Product[] = [];
const singleProductSlicer = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      return [action.payload];
    });
    build.addCase(updateOne.fulfilled, (state, action) => {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          item = action.payload;
        }
        return item;
      });
    });
  },
});

const singleProductReducer = singleProductSlicer.reducer;
export default singleProductReducer;
