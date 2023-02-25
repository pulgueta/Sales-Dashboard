import { FC, lazy, LazyExoticComponent } from "react";

export const Home: LazyExoticComponent<FC> = lazy(() => import("./Home"));
