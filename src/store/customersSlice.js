import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Config/firebase";

export const addCustomerToCustomers = createAsyncThunk(
  "customers/update",
  async (item, { dispatch }) => {
    const { email } = getState().auth.user;
    try {
      await updateDoc(doc(db, "customers", email), {
        allCustomers: arrayUnion(item),
      });
      //fetching here so that state and database are in sync
      await dispatch(fetchCustomers(email));
    } catch (err) {
      console.error("Error adding customer: ", err);
      throw err;
    }
  }
);

export const receivePayment = createAsyncThunk(
  "customers/receivePayment",
  async ({ selectedCustomer, amount }, { getState, dispatch }) => {
    const state = getState();
    const email = state.auth.user;
    const currentCustomersData = state.customers.customersData;
    const updatedCustomers = currentCustomersData.map((customer) =>
      customer.businessName === selectedCustomer.businessName
        ? {
            ...customer,
            outstandingBalance: amount,
          }
        : customer
    );
    await updateDoc(doc(db, "customers", email), {
      allCustomers: updatedCustomers,
    });
    await dispatch(fetchCustomers(email));
  }
);

//for credit purchase
export const updateOutStandingBalance = createAsyncThunk(
  "customers/updateOutStandingBalance",
  async ({ customersName, amount }, { getState, dispatch }) => {
    const { email } = getState().auth.user;
    const currentCustomersData = state.customers.customersData;
    const updatedCustomers = currentCustomersData.map((customer) => {
      return customer.businessName === customersName
        ? {
            ...customer,
            outstandingBalance: customer.outstandingBalance + amount,
          }
        : customer;
    });

    await updateDoc(doc(db, "customers", email), {
      allCustomers: updatedCustomers,
    });
    dispatch(fetchCustomers(email));
  }
);

export const fetchCustomers = createAsyncThunk(
  "customers/fetch",
  async (email, { rejectWithValue }) => {
    try {
      const customersSnap = await getDoc(doc(db, "customers", email));
      return customersSnap.exists() ? customersSnap.data() : [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState: {
    customersData: [],
    error: null,
    loading: false,
  },
  reducers: {
    setCustomers: (state, action) => {
      state.customersData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.customersData = action.payload;
        state.loading = false;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setCustomers } = customersSlice.actions;
export default customersSlice.reducer;
