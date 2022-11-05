import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types/user";

export const fetchUsers = createAsyncThunk("fetchProducts", async () => {
  const allUsers = await fetch("https://api.escuelajs.co/api/v1/users");
  return await allUsers.json();
});

export const fetchSingleUser = createAsyncThunk("fetchSingleUser", async () => {
  const singleUser = await fetch("https://api.escuelajs.co/api/v1/users/{id}");
  return await singleUser.json();
});

const initialState: User[] = [];
const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    createNewUser: (state, action) => {
      console.log("here I will create a user");
    },
  },
  extraReducers: (build) => {
    build.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
    build.addCase(fetchSingleUser.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

const usersReducer = userSlicer.reducer;
export default usersReducer;
