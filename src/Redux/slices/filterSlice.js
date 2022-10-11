import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sortData: {
    name: 'популярности (убывание)',
    sortType: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },

    setSortData(state, action) {
      state.sortData = action.payload;
    },
  },
});

export const { setCategoryId, setSortData } = filterSlice.actions;

export default filterSlice.reducer;
