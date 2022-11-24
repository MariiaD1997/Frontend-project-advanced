import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Category } from "../../types/category";

const initialState: Category[] = [];

export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  const result = await axios.get(
    "https://api.escuelajs.co/api/v1/categories?offset=0&limit=5"
  );
  const data = result.data;
  return data;
});

const categorySlice = createSlice({
  name: "categorySlicer",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchCategories.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
