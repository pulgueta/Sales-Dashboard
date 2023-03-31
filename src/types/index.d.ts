import { ReactNode } from "react";

export type ContextProps = {
    children: ReactNode;
}

export type PrivateRouteProps = {
    children: ReactNode;
    allowedRoles: "user" | "admin" | "moderator";
}

export type Providers = {
    providers: 'Google' | 'Facebook' | 'Twitter';
}