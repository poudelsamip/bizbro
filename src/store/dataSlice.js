import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Config/firebase";
import { setInventory } from "./inventorySlice";
import { setCustomers } from "./customersSlice";
import { setSales } from "./sales";
import { setTransactions } from "./transactionsSlice";

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (_, { dispatch, getState }) => {
    const { email } = getState().auth.user;
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

      const nameSnap = await getDoc(doc(db, "users", email));
      const companyName = nameSnap.exists() ? nameSnap.data().companyName : "";

      dispatch(setInventory(data.inventory));
      dispatch(setCustomers(data.customers));
      dispatch(setTransactions(data.transactions));
      dispatch(setSales(data.sales));

      return companyName;
    } catch (error) {
      console.log("Error : " + error);
    }
  }
);

const dataSlice = createSlice({
  name: "dataSlice",
  initialState: {
    companyName: "",
  },
  reducers: {
    setCompanyNameNull: (state) => {
      state.companyName = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.companyName = action.payload;
    });
  },
});

export const { setCompanyNameNull } = dataSlice.actions;
export default dataSlice.reducer;
