import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: { category: '' },
  reducers: {
    setCategoryFilter: (state, action) => {
      state.category = action.payload; 
    },
  },
});

export const { setCategoryFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
