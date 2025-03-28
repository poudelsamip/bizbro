import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Config/firebase";

export const addSalesToSales = createAsyncThunk(
  "sales/addSales",
  async (
    { items, customer, date },
    { rejectWithValue, getState, dispatch }
  ) => {
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
      //changing to object cause nested array can not be stored in firebase
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
      await dispatch(fetchSales(email));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSales = createAsyncThunk(
  "sales/fetchSales",
  async (email, { rejectWithValue }) => {
    try {
      const salesSnap = await getDoc(doc(db, "sales", email));
      return salesSnap.exists() ? salesSnap.data().allTransactions : [];
    } catch (err) {
      return rejectWithValue(err.message);
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
    builder.addCase(fetchSales.fulfilled, (state, action) => {
      state.salesData = action.payload;
      state.error = null;
      state.loading = false;
    });
  },
});

export const { setSales } = salesSlice.actions;
export default salesSlice.reducer;
