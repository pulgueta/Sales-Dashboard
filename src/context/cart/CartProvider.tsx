import { FC, useState } from 'react';

import { CartContext } from ".";
import { ContextProps } from '@/types';
import { ProductInformation } from '@/interfaces';

export const CartProvider: FC<ContextProps> = ({ children }) => {
  const [cart, setCart] = useState<ProductInformation[]>([]);

  const addToCart = (product: ProductInformation) => {
    setCart((prevCart) => [...prevCart, product]);
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  const removeFromCart = (id: string) => setCart((prevCart) => prevCart.filter((item) => item.id !== id));

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart')
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}