import { RootState } from '../../store';

export const selectFilters = (state: RootState) => state.filter;
export const selectSortData = (state: RootState) => state.filter.sortData;
