import { StackProps } from "@chakra-ui/react";

export interface NavbarItems {
  id: number;
  text: string;
  path: string;
}

export interface AdminLoginInputs {
  email: string;
  password: string;
}

export interface Inputs {
  title: string;
  description: string;
  category: string;
  price: number;
  image: any;
}

export interface ProductInformation {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string,
}

export interface RatingProps {
  defaultValue?: number
  max?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  rootProps?: StackProps
}

export interface DeleteItems {
  title: string
  id: string
}