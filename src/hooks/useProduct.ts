import { useState, useEffect } from "react";

import { getProduct } from "@/utils";

export const useProduct = (id: any) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [product, setProduct] = useState<any>([{
        id: '',
        title: '',
        price: 0,
        description: '',
        image: '',
        category: '',
    }])

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            const data = await getProduct('red', id)
            console.log(data);
            setProduct(data)
            setLoading(false)
        }

        fetchProduct()
    }, [id])

    return {
        loading,
        product,
    }
}