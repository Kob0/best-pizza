import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IPizzaSliceState, ResponseStatus, TFetchPizzasParams, TPizzaSliceItem } from './types';

export const fetchPizzas = createAsyncThunk<TPizzaSliceItem[], TFetchPizzasParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { category, sortOrder, sortBy, search, currentPage } = params;
    const { data } = await axios.get<TPizzaSliceItem[]>(
      `https://633ad404e02b9b64c6187dd2.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${sortOrder}${search}`,
    );

    return data;
  },
);

const initialState: IPizzaSliceState = {
  items: [],
  status: ResponseStatus.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = ResponseStatus.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = ResponseStatus.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = ResponseStatus.ERROR;
      state.items = [];
    });
  },
});

export default pizzaSlice.reducer;
