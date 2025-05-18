import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Config/firebase";

// might need to change the fetch dispatch later for all slices

export const addSupplierToSuppliers = createAsyncThunk(
  "suppliers/addSuppliers",
  async (supplier, { dispatch, getState }) => {
    const { email } = getState().auth.user;
    try {
      await updateDoc(doc(db, "suppliers", email), {
        allSuppliers: arrayUnion(supplier),
      });
      await dispatch(fetchSuppliers(email));
    } catch (err) {
      console.error("Error adding customer: ", err);
      throw err;
    }
  }
);

export const doPayment = createAsyncThunk(
  "suppliers/doPayment",
  async ({ selectedSupplier, amount }, { getState, dispatch }) => {
    const state = getState();
    const { email } = state.auth.user;

    const currentSuppliers = state.suppliers.suppliersData;
    const updatedSuppliers = currentSuppliers.map((supplier) =>
      supplier.suppliersName === selectedSupplier.suppliersName
        ? {
            ...supplier,
            credit: amount,
          }
        : supplier
    );
    await updateDoc(doc(db, "suppliers", email), {
      allSuppliers: updatedSuppliers,
    });
    await dispatch(fetchSuppliers(email));
  }
);

//for credit buy
export const updateCredit = createAsyncThunk(
  "suppliers/updateCredit",
  async ({ suppliersName, amount }, { getState, dispatch }) => {
    const { email } = getState().auth.user;
    const currentSuppliersData = getState().suppliers.suppliersData;
    const updatedSuppliers = currentSuppliersData.map((supplier) =>
      supplier.suppliersName === suppliersName
        ? {
            ...supplier,
            credit: amount,
          }
        : supplier
    );
    await updateDoc(doc(db, "suppliers", email), {
      allSuppliers: updatedSuppliers,
    });
    await dispatch(fetchSuppliers(email));
  }
);

export const updateSupplierCredit = createAsyncThunk(
  "suppliers/updateSupplierCredit",
  async ({ supplierName, amount }, { getState, dispatch }) => {
    const { email } = getState().auth.user;
    const currentSuppliersData = getState().suppliers.suppliersData;
    
    const supplier = currentSuppliersData.find(s => s.suppliersName === supplierName);
    if (!supplier) {
      throw new Error("Supplier not found");
    }

    const updatedSuppliers = currentSuppliersData.map((s) =>
      s.suppliersName === supplierName
        ? {
            ...s,
            credit: (s.credit || 0) + amount // Add new credit to existing credit
          }
        : s
    );

    await updateDoc(doc(db, "suppliers", email), {
      allSuppliers: updatedSuppliers,
    });
    
    await dispatch(fetchSuppliers(email));
  }
);

export const fetchSuppliers = createAsyncThunk(
  "suppliers/fetch",
  async (email, { rejectWithValue }) => {
    try {
      const suppliersSnap = await getDoc(doc(db, "suppliers", email));
      return suppliersSnap.exists() ? suppliersSnap.data().allSuppliers : [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const suppliersSlice = createSlice({
  name: "suppliers",
  initialState: {
    suppliersData: [],
    error: null,
    loading: false,
  },
  reducers: {
    setSuppliers: (state, action) => {
      state.suppliersData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.suppliersData = action.payload;
        state.loading = false;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setSuppliers } = suppliersSlice.actions;
export default suppliersSlice.reducer;
