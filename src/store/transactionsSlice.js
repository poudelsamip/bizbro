import { createSlice } from "@reduxjs/toolkit";

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactionsData: [],
  },
  reducers: {
    settransactions: (state, action) => {
      state.transactionsData = action.payload;
    },
  },
});

export const { settransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
