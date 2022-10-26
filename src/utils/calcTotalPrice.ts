import { TCartSliceItem } from '../Redux/slices/cart/types';

export const calcTotalPrice = (items: TCartSliceItem[]) => {
  return items.reduce((sum, item) => sum + item.price * item.count, 0);
};
