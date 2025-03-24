import { createSlice } from "@reduxjs/toolkit";

const salesSlice = createSlice({
  name: "sales",
  initialState: {
    salesData: [],
  },
  reducers: {
    setsales: (state, action) => {
      state.salesData = action.payload;
    },
  },
});

export const { setsales } = salesSlice.actions;
export default salesSlice.reducer;
