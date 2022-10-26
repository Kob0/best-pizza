export type TCartSliceItem = {
  id: string;
  title: string;
  price: number;
  count: number;
  size: number;
  type: string;
  imageUrl: string;
};

export interface ICartSliceState {
  totalPrice: number;
  items: TCartSliceItem[];
}
