import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/products";
import usersReducer from "./reducers/users";

const store = configureStore({
  reducer: { productsReducer, usersReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
