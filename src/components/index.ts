import { FC, lazy, LazyExoticComponent } from "react";
import { ProductInformation } from "../interfaces";

export * from './ProviderButtons';
export const ProductCard: LazyExoticComponent<FC<ProductInformation>> = lazy(() => import('./ProductCard'))