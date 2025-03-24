import { createSlice } from "@reduxjs/toolkit";

const customersSlice = createSlice({
  name: "customers",
  initialState: {
    customersData: [],
  },
  reducers: {
    setcustomers: (state, action) => {
      state.customersData = action.payload;
    },
  },
});

export const { setcustomers } = customersSlice.actions;
export default customersSlice.reducer;
