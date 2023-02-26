import { StackProps } from "@chakra-ui/react";

export interface NavbarItems {
  id: number;
  text: string;
  path: string;
}

export interface Inputs {
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

export interface ProductInformation {
  title: string;
  price: number;
  description: string;
  image: string | undefined;
}

export interface RatingProps {
  defaultValue?: number
  max?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  rootProps?: StackProps
}