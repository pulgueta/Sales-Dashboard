export interface NavbarItems {
  id: number;
  text: string;
  path: string;
}

export interface ProductInformation {
  title: string;
  price: number;
  description: string;
  image: string | null | undefined;
}