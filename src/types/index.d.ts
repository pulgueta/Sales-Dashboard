import { ReactNode } from 'react';

import { ProductInformation } from '@/interfaces';

export type ContextProps = {
    children: ReactNode;
}

export type CartContextType = {
    cart: ProductInformation[];
    addToCart: (item: ProductInformation) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}

export type PrivateRouteProps = {
    children: ReactNode;
    allowedRoles: "user" | "admin" | "moderator";
}

export type Providers = {
    providers: 'Google' | 'Facebook' | 'Twitter';
}