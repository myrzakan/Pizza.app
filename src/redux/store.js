import { configureStore } from '@reduxjs/toolkit';
import card from './slices/cardSlice';
import filterSlice from './slices/filterSlice';
import pizza from './slices/pizzaSlice';

export const store = configureStore({
  reducer: {
    filterSlice,
    card,
    pizza,
  },
});

// console.log(store);
