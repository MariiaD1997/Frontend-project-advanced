import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/products";

const store = configureStore({
  reducer: { productsReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
