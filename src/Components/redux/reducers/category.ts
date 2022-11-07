import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "../../types/category";

export const fetchCategories = createAsyncThunk(
  "fetchSingleProduct",
  async () => {
    const fetchedCategories = await fetch(
      "https://api.escuelajs.co/api/v1/categories"
    );
    return await fetchedCategories.json();
  }
);

const initialState: Category[] = [];
const categoriesSlicer = createSlice({
  name: "categories",
  initialState,
  reducers: {
    filterState: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers: (build) => {
    build.addCase(fetchCategories.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
const categoriesReducer = categoriesSlicer.reducer;
const { filterState } = categoriesSlicer.actions;
export default categoriesReducer;
