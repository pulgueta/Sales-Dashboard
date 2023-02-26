import { FC, lazy, LazyExoticComponent } from "react";

export const Products: LazyExoticComponent<FC> = lazy(() => import("./Products"));
