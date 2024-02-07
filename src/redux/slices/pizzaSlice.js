import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async params => {
    const { currentPage, category, search, sortType } = params;
    const { data } = await axios.get(
      `https://655330845449cfda0f2e4952.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=desc${search}`,
    );

    return data;
  },
);

const initialState = {
  items: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPizzas.pending, state => {
        state.status = 'loading';
        state.items = [];
        // alert(state, ' ок');
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        console.log(state, 'Все ок');
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
