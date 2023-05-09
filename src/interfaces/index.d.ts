
import { StackProps } from "@chakra-ui/react";
import { User } from "firebase/auth";

export interface UserHeaderCardProps {
  imageURL: string;
  name: string;
  createdAt: string;
}

export interface PersonalDataProps {
  name: string;
  fatherSurname: string;
  motherSurname: string;
  birthday: string;
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

export interface UserInformation {
  gender: string;
  fatherSurname: string;
  age: number;
  securityQuestion: string;
  birthday: string;
  role: string;
  createdAt: string;
  securitySelect: string;
  name: string;
  address: string | null;
  email: string;
  profilePicture: string;
  uid: string;
  cards: { [key: string]: string };
  phoneNumber: string;
  motherSurname: string;
}

export interface CommentInfo {
  name:  string;
  fatherSurname: string;
  avatar: string;
  comment: string;
  rating?: number;
  createdAt: string;
  id: string;
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
  userInformation: DocumentData | undefined;
}

export interface Product {
  description?: string;
  image: string;
  category: string;
  title: string;
  price: number;
  sold?: number;
  stock?: number;
  id: string;
}

export interface CartProduct {
  image: string;
  category: string;
  title: string;
  price: number;
  id: string;
  quantity: number;
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