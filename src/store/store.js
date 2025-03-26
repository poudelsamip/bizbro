import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import dataReducer from "./dataSlice";
import customerReducer from "./customersSlice";
import transactionReducer from "./transactionsSlice";
import inventoryReducer from "./inventorySlice";
import salesReducer from "./sales";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
    customers: customerReducer,
    transactions: transactionReducer,
    inventory: inventoryReducer,
    sales: salesReducer,
  },
});

export default store;
