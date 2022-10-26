export type TSortSliceProps = {
  name: string;
  sortType: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title';
};

export interface IFilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sortData: TSortSliceProps;
}
