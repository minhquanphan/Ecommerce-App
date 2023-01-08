import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import userReducer from "../features/user/userSlice";

const rootReducer = {
  product: productReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
