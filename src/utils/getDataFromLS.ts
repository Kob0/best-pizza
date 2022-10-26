import { TCartSliceItem } from '../Redux/slices/cart/types';
import { calcTotalPrice } from './calcTotalPrice';

export const getDataFromLS = () => {
  const json = localStorage.getItem('cart');
  const items = json ? JSON.parse(json) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items: items as TCartSliceItem[],
    totalPrice,
  };
};
