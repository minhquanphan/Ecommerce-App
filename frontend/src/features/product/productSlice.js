import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  productsById: {},
  currentPageProducts: [],
  updatedProduct: null,
};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { products } = action.payload;
      products.forEach((product) => {
        state.productsById[product._id] = product;
        if (!state.currentPageProducts.includes(product._id)) {
          state.currentPageProducts.push(product._id);
        }
      }); //fixing duplicated id when loading more pagination
    },
  },
});

export const getProducts =
  ({ page, limit = 15 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get("/products/all", {
        params,
      });
      dispatch(slice.actions.getProductsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export default slice.reducer;
