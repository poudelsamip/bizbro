import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import dataReducer from "./dataSlice";
import customerReducer from "./customersSlice";
import transactionReducer from "./transactionsSlice";
import inventoryReducer from "./inventorySlice";
import salesReducer from "./salesSlice";
import suppliersReducer from "./suppliersSlice";
import purchaseReducer from "./purchaseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
    customers: customerReducer,
    transactions: transactionReducer,
    inventory: inventoryReducer,
    sales: salesReducer,
    suppliers: suppliersReducer,
    purchases: purchaseReducer,
  },
});

export default store;
