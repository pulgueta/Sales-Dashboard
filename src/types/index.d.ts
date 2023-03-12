import { ReactNode } from "react";

export type ContextProps = {
    children: ReactNode;
}

export type PrivateRouteProps = {
    children: ReactNode;
}

export type Query = {
    querySelector: '==', '<=', '>='
}