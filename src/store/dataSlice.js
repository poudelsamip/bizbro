import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Config/firebase";
import { useDispatch } from "react-redux";
import { setInventory } from "./inventorySlice";
import { data } from "react-router-dom";
import { setcustomers } from "./customersSlice";
import { setsales } from "./sales";
import { settransactions } from "./transactionsSlice";

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async ({ email }, { dispatch }) => {
    try {
      const collections = ["inventory", "customers", "sales", "transactions"];
      const data = {
        inventory: [],
        transactions: [],
        customers: [],
        sales: [],
      };
      const [
        inventorySnapshot,
        customersSnapshot,
        salesSnapshot,
        transactionsSnapshot,
      ] = await Promise.all(
        collections.map((item) => getDoc(doc(db, item, email)))
      );
      data.inventory = inventorySnapshot.exists()
        ? inventorySnapshot.data().allProducts || []
        : [];
      data.customers = customersSnapshot.exists()
        ? customersSnapshot.data().allCustomers || []
        : [];
      data.transactions = transactionsSnapshot.exists()
        ? transactionsSnapshot.data().allTransactionData || []
        : [];
      data.sales = salesSnapshot.exists()
        ? salesSnapshot.data().allTransactions || []
        : [];

      dispatch(setInventory(data.inventory));
      dispatch(setcustomers(data.customers));
      dispatch(settransactions(data.transactions));
      dispatch(setsales(data.sales));
    } catch (error) {
      console.log("Error : " + error);
    }
  }
);

const dataSlice = createSlice({
  initialState: {
    inventoryData: [],
    customersData: [],
    transactionsData: [],
    salesData: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.inventoryData = action.inventory.allProducts || [];
        state.transactionsData = action.transactions.allTransactionData || [];
        state.salesData = action.salesallTransactions || [];
        state.customersData = action.customers.allCustomers || [];
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default dataSlice.reducer;
