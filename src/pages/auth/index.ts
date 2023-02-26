import { FC, lazy, LazyExoticComponent } from "react";

export const Login: LazyExoticComponent<FC> = lazy(() => import("./Login"));
