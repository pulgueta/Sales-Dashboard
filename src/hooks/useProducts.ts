import { useState, useEffect } from "react";

import { getProducts } from "@/utils";

export const useProducts = () => {
    const [more, setMore] = useState<number>(3)
    const [loading, setLoading] = useState<boolean>(true)
    const [products, setProducts] = useState<any>([{
        id: '',
        title: '',
        price: 0,
        description: '',
        image: '',
        category: '',
    }])

    const handleNextProd = () => {
        if (more === products.length || more <= products.length) setMore(more + 3)
        else return
    }

    const handlePrevProd = () => {
        if (more !== 3) setMore(more - 3)
        else return
    }

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            const data = await getProducts()
            setProducts(data)
            setLoading(false)
        }

        fetchProducts()
    }, [])

    return {
        handleNextProd,
        handlePrevProd,
        loading,
        more,
        products,
    }
}