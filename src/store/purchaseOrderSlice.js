import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../Config/firebase";

export const createPurchaseOrder = createAsyncThunk(
  "purchaseOrders/create",
  async ({ orderData }, { rejectWithValue, getState }) => {
    const { email } = getState().auth.user;
    try {
      const purchaseOrdersRef = doc(db, "purchaseOrders", email);
      const purchaseOrdersSnap = await getDoc(purchaseOrdersRef);

      const newPurchaseOrder = {
        ...orderData,
        poNumber: `PO-${Date.now()}`,
        status: "pending",
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };

      if (!purchaseOrdersSnap.exists()) {
        await setDoc(purchaseOrdersRef, {
          allPurchaseOrders: [newPurchaseOrder],
        });
      } else {
        await updateDoc(purchaseOrdersRef, {
          allPurchaseOrders: arrayUnion(newPurchaseOrder),
        });
      }

      return newPurchaseOrder;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePurchaseOrderStatus = createAsyncThunk(
  "purchaseOrders/updateStatus",
  async ({ poNumber, status }, { rejectWithValue, getState }) => {
    const { email } = getState().auth.user;
    try {
      const purchaseOrdersRef = doc(db, "purchaseOrders", email);
      const purchaseOrdersSnap = await getDoc(purchaseOrdersRef);
      
      if (purchaseOrdersSnap.exists()) {
        const orders = purchaseOrdersSnap.data().allPurchaseOrders;
        const updatedOrders = orders.map(order => 
          order.poNumber === poNumber 
            ? { ...order, status, lastUpdated: new Date().toISOString() }
            : order
        );
        
        await setDoc(purchaseOrdersRef, { allPurchaseOrders: updatedOrders });
        return { poNumber, status };
      }
      
      throw new Error("Purchase order not found");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPurchaseOrders = createAsyncThunk(
  "purchaseOrders/fetch",
  async (email, { rejectWithValue }) => {
    try {
      const purchaseOrdersSnap = await getDoc(doc(db, "purchaseOrders", email));
      return purchaseOrdersSnap.exists() ? purchaseOrdersSnap.data().allPurchaseOrders : [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const purchaseOrderSlice = createSlice({
  name: "purchaseOrders",
  initialState: {
    purchaseOrdersData: [],
    error: null,
    loading: false,
  },
  reducers: {
    setPurchaseOrders: (state, action) => {
      state.purchaseOrdersData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchaseOrders.fulfilled, (state, action) => {
        state.purchaseOrdersData = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchPurchaseOrders.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchPurchaseOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPurchaseOrder.fulfilled, (state, action) => {
        state.purchaseOrdersData.push(action.payload);
        state.error = null;
        state.loading = false;
      })
      .addCase(updatePurchaseOrderStatus.fulfilled, (state, action) => {
        const { poNumber, status } = action.payload;
        const order = state.purchaseOrdersData.find(o => o.poNumber === poNumber);
        if (order) {
          order.status = status;
          order.lastUpdated = new Date().toISOString();
        }
      });
  },
});

export const { setPurchaseOrders } = purchaseOrderSlice.actions;
export default purchaseOrderSlice.reducer; 