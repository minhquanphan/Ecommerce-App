import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "order",
  initialState,
  reducers: {},
});

export default slice.reducer;
