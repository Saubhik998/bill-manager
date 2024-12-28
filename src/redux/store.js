
import { configureStore } from '@reduxjs/toolkit';
import billsReducer from './billsSlice';
import filtersReducer from './filtersSlice';

const store = configureStore({
  reducer: {
    bills: billsReducer,
    filters: filtersReducer,
  },
});

export default store;
