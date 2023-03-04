export const priceFormat = (price: number): string => {
    const formattedPrice = new Intl.NumberFormat('es-MX', {
        style: 'currency', currency: 'MXN'
    }).format(price);

    return formattedPrice.replace('.00', '');
}