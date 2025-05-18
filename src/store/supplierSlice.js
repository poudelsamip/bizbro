import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../Config/firebase";

export const addSupplier = createAsyncThunk(
  "suppliers/addSupplier",
  async ({ supplierData }, { rejectWithValue, getState }) => {
    const { email } = getState().auth.user;
    try {
      const suppliersRef = doc(db, "suppliers", email);
      const suppliersSnap = await getDoc(suppliersRef);

      if (!suppliersSnap.exists()) {
        await setDoc(suppliersRef, {
          allSuppliers: [supplierData],
        });
      } else {
        await updateDoc(suppliersRef, {
          allSuppliers: arrayUnion(supplierData),
        });
      }

      return supplierData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
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

const supplierSlice = createSlice({
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
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.suppliersData = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSupplier.fulfilled, (state, action) => {
        state.suppliersData.push(action.payload);
        state.error = null;
        state.loading = false;
      });
  },
});

export const { setSuppliers } = supplierSlice.actions;
export default supplierSlice.reducer; 