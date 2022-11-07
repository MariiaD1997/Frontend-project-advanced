import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/products";
import usersReducer from "./reducers/users";
import singleProductReducer from "./reducers/singleProduct";

const store = configureStore({
  reducer: {
    productsReducer,
    usersReducer,
    singleProductReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
