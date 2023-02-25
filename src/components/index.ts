import { FC, lazy, LazyExoticComponent } from "react";

export * from "./Sidebar";
export * from "./SignOutModal";

export const Navbar: LazyExoticComponent<FC> = lazy(() => import('./Navbar'))
export const ProductCard: LazyExoticComponent<FC> = lazy(() => import('./ProductCard'))
