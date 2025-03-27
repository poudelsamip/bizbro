import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../Config/firebase";
import { doc, setDoc } from "firebase/firestore";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, companyName, name }, { rejectWithValue }) => {
    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", userData.user.email), {
        companyName,
        name,
        email,
      });
      const collections = ["inventory", "customers", "sales", "transactions"];
      await Promise.all(
        collections.map((collection) =>
          setDoc(doc(db, collection, userData.user.email), {})
        )
      );
      return { uid: userData.user.uid, email: userData.user.email };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/logIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
      return { uid: userData.user.uid, email: userData.user.email };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logOut",
  async () => await signOut(auth)
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserNull: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(logIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => (state.user = null));
  },
});

export const { setUser, setUserNull } = authSlice.actions;
export default authSlice.reducer;
