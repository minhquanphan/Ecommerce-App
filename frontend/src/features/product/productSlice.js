import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { PRODUCT_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  productsById: {},
  currentPageProducts: [],
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
      const { count, products } = action.payload;
      products.forEach((product) => {
        state.productsById[product._id] = product;
        if (!state.currentPageProducts.includes(product._id)) {
          state.currentPageProducts.push(product._id);
        }
      });
      // state.currentPageProducts = products.map((product) => product._id);
      state.totalProducts = count;
    },
  },
});

export const getProductList =
  ({ filterName, page, limit = PRODUCT_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filterName) {
        params.name = filterName;
      }
      const response = await apiService.get("/products/product", {
        params,
      });
      dispatch(slice.actions.getProductsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export default slice.reducer;
