export interface NavbarItems {
    id: number,
    text: string,
    path: string,
}

export interface ProductDetails {
    title: string,
    price: number | undefined,
    description: string,
    image: string | null,
}