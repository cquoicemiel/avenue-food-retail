import { selector } from 'recoil';

import { cartState } from './Atoms';

export const cartStatus = selector({
  key: 'cartStatus',
  get: ({ get }) => {
    const cart = get(cartState);
    let totalItems = 0
    cart.forEach((item) => totalItems += item.qty)
    const totalPrice = cart.reduce((total, { qty, price }) => total + (qty * price), 0);

    return {
      totalItems,
      totalPrice,
    }
  }
})