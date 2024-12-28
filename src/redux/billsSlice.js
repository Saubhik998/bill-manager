import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    addBill: (state, action) => {
      state.push(action.payload);
    },
    editBill: (state, action) => {
      const index = state.findIndex((bill) => bill.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload; // Update the bill in state
      }
    },
    removeBill: (state, action) => {
      return state.filter((bill) => bill.id !== action.payload);
    },
  },
});

export const { addBill, editBill, removeBill } = billsSlice.actions;
export default billsSlice.reducer;
