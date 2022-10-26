import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilterSliceState, TSortSliceProps } from './types';

const initialState: IFilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sortData: {
    name: 'популярности (убывание)',
    sortType: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSortData(state, action: PayloadAction<TSortSliceProps>) {
      state.sortData = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<IFilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = action.payload.currentPage;
        state.categoryId = action.payload.categoryId;
        state.sortData = action.payload.sortData;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sortData = {
          name: 'популярности',
          sortType: 'rating',
        };
      }
    },
  },
});

export const { setCategoryId, setSortData, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
