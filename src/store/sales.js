import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../Config/firebase";

export const addSales = createAsyncThunk(
  "sales/addSales",
  async ({ items, customer, date }, { rejectWithValue, getState }) => {
    const { email } = getState().auth.user;
    try {
      const transactionsRef = doc(db, "sales", email);

      const formattedDate = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const grandTotal = items.reduce((acc, item) => acc + item.totalPrice, 0);

      const productsObject = Object.fromEntries(
        items.map((item, index) => [index, item])
      );

      const newSale = {
        date: formattedDate,
        customer,
        grandTotal,
        products: productsObject,
      };

      await updateDoc(transactionsRef, {
        allTransactions: arrayUnion(newSale),
      });

      return newSale;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const salesSlice = createSlice({
  name: "sales",
  initialState: {
    salesData: [],
    error: null,
    loading: false,
  },
  reducers: {
    setSales: (state, action) => {
      state.salesData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSales.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSales.fulfilled, (state, action) => {
        state.salesData.push(action.payload);
        state.loading = false;
      })
      .addCase(addSales.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setSales } = salesSlice.actions;
export default salesSlice.reducer;
