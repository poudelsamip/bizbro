import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../Config/firebase";

export const addPurchaseToPurchases = createAsyncThunk(
  "purchase/addPurchase",
  async (
    { items, supplier, date },
    { rejectWithValue, getState, dispatch }
  ) => {
    const { email } = getState().auth.user;
    try {
      const formattedDate = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const grandTotal = items.reduce((acc, item) => acc + item.price, 0);
      //changing to object cause nested array can not be stored in firebase
      const productsObject = Object.fromEntries(
        items.map((item, index) => [index, item])
      );
      const newPurchase = {
        date: formattedDate,
        supplier,
        grandTotal,
        products: productsObject,
      };
      await updateDoc(doc(db, "purchases", email), {
        allPurchases: arrayUnion(newPurchase),
      });
      await dispatch(fetchPurchases(email));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchPurchases = createAsyncThunk(
  "purchases/fetch",
  async (email, { rejectWithValue }) => {
    try {
      const purchaseSnap = await getDoc(doc(db, "purchases", email));
      return purchaseSnap.exists() ? purchaseSnap.data().allPurchases : [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const purchaseSlice = createSlice({
  name: "purchase",
  initialState: {
    purchaseData: [],
    error: null,
    loading: false,
  },
  reducers: {
    setPurchase: (state, action) => {
      state.purchaseData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchases.fulfilled, (state, action) => {
        state.purchaseData = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchPurchases.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setPurchase } = purchaseSlice.actions;
export default purchaseSlice.reducer;
