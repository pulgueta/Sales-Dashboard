import { FC, lazy, LazyExoticComponent } from "react";
import { ProductInformation } from "@/interfaces";

export * from './ProviderButtons';
export * from './Navbar';
export * from './DrawerCard'
export * from './ErrorBoundaryComponent'
export const ProductCard: LazyExoticComponent<FC<ProductInformation>> = lazy(() => import('./products/ProductCard'))