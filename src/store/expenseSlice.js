import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../Config/firebase";

export const addExpense = createAsyncThunk(
  "expenses/add",
  async ({ expenseData }, { rejectWithValue, getState }) => {
    const { email } = getState().auth.user;
    try {
      const expensesRef = doc(db, "expenses", email);
      const expensesSnap = await getDoc(expensesRef);

      const newExpense = {
        ...expenseData,
        expenseId: `EXP-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: "recorded",
      };

      if (!expensesSnap.exists()) {
        await setDoc(expensesRef, {
          allExpenses: [newExpense],
        });
      } else {
        await updateDoc(expensesRef, {
          allExpenses: arrayUnion(newExpense),
        });
      }

      return newExpense;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchExpenses = createAsyncThunk(
  "expenses/fetch",
  async (email, { rejectWithValue }) => {
    try {
      const expensesSnap = await getDoc(doc(db, "expenses", email));
      return expensesSnap.exists() ? expensesSnap.data().allExpenses : [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateExpenseStatus = createAsyncThunk(
  "expenses/updateStatus",
  async ({ expenseId, status }, { rejectWithValue, getState }) => {
    const { email } = getState().auth.user;
    try {
      const expensesRef = doc(db, "expenses", email);
      const expensesSnap = await getDoc(expensesRef);
      
      if (expensesSnap.exists()) {
        const expenses = expensesSnap.data().allExpenses;
        const updatedExpenses = expenses.map(expense => 
          expense.expenseId === expenseId 
            ? { ...expense, status, lastUpdated: new Date().toISOString() }
            : expense
        );
        
        await setDoc(expensesRef, { allExpenses: updatedExpenses });
        return { expenseId, status };
      }
      
      throw new Error("Expense not found");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expensesData: [],
    error: null,
    loading: false,
    categories: [
      "Utilities",
      "Rent",
      "Salaries",
      "Office Supplies",
      "Marketing",
      "Travel",
      "Maintenance",
      "Insurance",
      "Miscellaneous"
    ]
  },
  reducers: {
    setExpenses: (state, action) => {
      state.expensesData = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.expensesData = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.expensesData.push(action.payload);
        state.error = null;
        state.loading = false;
      })
      .addCase(updateExpenseStatus.fulfilled, (state, action) => {
        const { expenseId, status } = action.payload;
        const expense = state.expensesData.find(e => e.expenseId === expenseId);
        if (expense) {
          expense.status = status;
          expense.lastUpdated = new Date().toISOString();
        }
      });
  },
});

export const { setExpenses, addCategory } = expenseSlice.actions;
export default expenseSlice.reducer; 