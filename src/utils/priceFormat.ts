export const priceFormat = (price: number) => new Intl.NumberFormat('es-MX', {
    style: 'currency', currency: 'MXN'
}).format(price);