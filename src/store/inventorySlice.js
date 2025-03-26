import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Config/firebase";

// make the a new update function and call that instead of making for eah
// for slices also

export const addProductsToInventory = createAsyncThunk(
  "inventory/update",
  async ({ email, item }, { dispatch }) => {
    try {
      await updateDoc(doc(db, "inventory", email), {
        allProducts: arrayUnion(item),
      });

      // fetch the updated inventory to ensure state sync
      await dispatch(fetchInventory({ email }));
    } catch (err) {
      console.error("Error adding product to inventory: ", err);
      throw err;
    }
  }
);

export const addStock = createAsyncThunk(
  "inventory/addStock",
  async ({ productName, stock }, { getState, dispatch }) => {
    const state = getState();
    const { email } = state.auth;
    const inventoryData = state.inventory.inventoryData;
    const updatedAllProducts = inventoryData.map((product) => {
      return product.itemName === productName
        ? { ...product, quantity: stock }
        : product;
    });

    await updateDoc(doc(db, "inventory", email), {
      allProducts: updatedAllProducts,
    });
    dispatch(fetchInventory(email));
  }
);

export const updateStock = createAsyncThunk(
  "inventory/updateStock",
  async (dispatchedItems, { getState, dispatch }) => {
    const state = getState();
    const { email } = state.auth;
    const inventoryData = state.inventory.inventoryData;
    const updatedProducts = inventoryData.map((item) => {
      const currentItem = dispatchedItems.find(
        (itm) => item.itemName === itm.itemName
      );
      if (currentItem) {
        return { ...item, quantity: item.quantity - currentItem.quantity };
      } else {
        return item;
      }
    });

    await updateDoc(doc(db, "inventory", email), {
      allProducts: updatedProducts,
    });
    dispatch(fetchInventory(email));
  }
);

export const fetchInventory = createAsyncThunk(
  "inventory/fetch",
  async (email, { rejectWithValue }) => {
    try {
      const inventorySnap = await getDoc(doc(db, "inventory", email));
      return inventorySnap.exists() ? inventorySnap.data() : [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    inventoryData: [],
    error: null,
    loading: false,
  },
  reducers: {
    setInventory: (state, action) => {
      state.inventoryData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.inventoryData = action.payload;
        state.loading = false;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setInventory } = inventorySlice.actions;
export default inventorySlice.reducer;
