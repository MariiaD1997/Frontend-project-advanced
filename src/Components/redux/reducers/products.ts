import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../types/products";
import axios from "axios";

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const result = await axios.get("https://api.escuelajs.co/api/v1/products");
  const data = result.data;
  return data;
});

export const updateOne = createAsyncThunk(
  "updateOne",
  async ({ id, data }: { id: number; data: Product }) => {
    const result = await axios.put(
      `https://api.escuelajs.co/api/v1/products/${id}`,
      data
    );
    return result.data;
  }
);

const initialState: Product[] = [];
const productsSlicer = createSlice({
  name: "products",
  initialState,
  reducers: {
    /*
    sortAsc: (state) => {
      state.slice().sort((a, b) => a.price - b.price);
    },
    sortDesc: (state) => {
      state.slice().sort((a, b) => b.price - a.price);
    },
    sortNames: (state) => {
      state.slice().sort((a, b) => (a.title > b.title ? 1 : -1));
    },
    */
  },
  extraReducers: (build) => {
    build
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.sort();
        return action.payload;
      })
      .addCase(updateOne.fulfilled, (state, action) => {
        return state.map((item) => {
          if (item.id === action.payload.id) {
            item = action.payload;
          }
          return item;
        });
      });
  },
});
const productsReducer = productsSlicer.reducer;
export default productsReducer;
