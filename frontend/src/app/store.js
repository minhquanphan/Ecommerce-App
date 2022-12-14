import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import orderSlice from "../features/order/orderSlice";

const rootReducer = {
  user: userReducer,
  order: orderSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
