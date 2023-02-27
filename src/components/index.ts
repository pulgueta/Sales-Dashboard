import { FC, lazy, LazyExoticComponent } from "react";
import { ProductInformation } from "../interfaces";

export const Navbar: LazyExoticComponent<FC> = lazy(() => import('./admin/Navbar'))
export const ProductCard: LazyExoticComponent<FC<ProductInformation>> = lazy(() => import('./ProductCard'))