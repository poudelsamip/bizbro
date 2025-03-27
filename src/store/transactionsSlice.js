import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Config/firebase";

export const addTransactionsToTransactions = createAsyncThunk(
  "transactions/update",
  async (item, { getState, dispatch }) => {
    const { email } = getState().auth.user;
    try {
      updateDoc(doc(db, "transactions", email), {
        allTransactionData: arrayUnion(item),
      });
      await dispatch(fetchTransactions(email));
    } catch (err) {
      console.log("Error : " + err);
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  "transactions/fetch",
  async (email, { rejectWithValue }) => {
    try {
      const transactionsSnap = await getDoc(doc(db, "transactions", email));
      return transactionsSnap.exists()
        ? transactionsSnap.data().allTransactionData
        : [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactionsData: [],
    error: null,
  },
  reducers: {
    setTransactions: (state, action) => {
      state.transactionsData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactionsData = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
