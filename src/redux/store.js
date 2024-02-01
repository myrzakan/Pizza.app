import { configureStore } from '@reduxjs/toolkit';
import card from './slices/cardSlice';
import filterSlice from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    filterSlice,
    card,
  },
});

// console.log(store);
