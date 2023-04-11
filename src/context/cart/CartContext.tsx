import { createContext } from 'react';

import { CartContextType } from '@/types';

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => { },
  removeFromCart: () => { },
  clearCart: () => { },
})