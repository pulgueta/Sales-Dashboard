import { FC, lazy, LazyExoticComponent } from "react";

export const Navbar: LazyExoticComponent<FC> = lazy(() => import('./admin/Navbar'))