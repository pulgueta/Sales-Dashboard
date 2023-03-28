
import { StackProps } from "@chakra-ui/react";
import { User } from "firebase/auth";

export interface UserHeaderCardProps {
  imageURL: string;
  name: string;
  createdAt: string;
}


export interface NavbarItems {
  id: number;
  text: string;
  path: string;
}

export interface PasswordResetQuestion {
  email: string;
  securitySelect: string;
  securityQuestion: string;
  newPassword: string;
}

export interface PasswordResetEmail {
  email: string;
}

export interface LoginInputs {
  email: string;
  password: string;
}

export interface RegisterInputs {
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  birthday: Date;
  fatherSurname: string;
  motherSurname: string;
  name: string;
  phoneNumber: number;
  securityQuestion: string;
  securitySelect: string;
}

export interface RegisterUserInfo {
  gender: string;
  name: string;
  birthday: Date;
  fatherSurname: string;
  motherSurname: string;
  phoneNumber: number;
  securityQuestion: string;
  securitySelect: string;
}

export interface ContactInputs {
  name: string;
  email: string;
  message: string;
}

export interface Inputs {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: any;
}

export interface UserContextProps {
  user: User | null;
  userRole: string | null;
}

export interface ProductInformation {
  id: string;
  title?: string;
  price: number;
  description?: string;
  image: string;
  category?: string;
  sold?: number;
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

export interface ActiveUser {
  isUser: User
}