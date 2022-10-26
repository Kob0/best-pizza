export type TFetchPizzasParams = {
  category: string;
  sortOrder: string;
  sortBy: string;
  search: string;
  currentPage: number;
};

export type TPizzaSliceItem = {
  id: string;
  title: string;
  imageUrl: string;
  category: number;
  price: number;
  sizes: number[];
  types: number[];
};

export enum ResponseStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IPizzaSliceState {
  items: TPizzaSliceItem[];
  status: ResponseStatus;
}
