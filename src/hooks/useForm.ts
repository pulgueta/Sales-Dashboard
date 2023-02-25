import { useState, ChangeEvent, FormEvent } from "react";

import { useToast } from "@chakra-ui/react";

import { ProductInformation } from "../interfaces";

export const useForm = () => {
    
    const [loadBtn, setLoadBtn] = useState<boolean>(false);
    const [productInfo, setProductInfo] = useState<ProductInformation>({
        title: '',
        price: 0,
        description: '',
        image: null,
    })
    const [errorMessage, setErrorMessage] = useState<string>("")
    
    const toast = useToast();

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = target
        setProductInfo({
            ...productInfo,
            [name]: value,
        })
    }

    const validation = () => {
        if (productInfo.title === '' || productInfo.title === null) {
            setErrorMessage("El título es requerido")
            return errorMessage
        }
    }

    const onSubmit = (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (validation())
        setLoadBtn(true)
        setTimeout(() => {
            setLoadBtn(false)
            console.log(productInfo)
            toast({
                title: '¡Producto agregado correctamente!',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top-right'
            })
        }, 2000)
    }    

    return {
        handleChange,
        productInfo,
        errorMessage,
        loadBtn,
        onSubmit,
    }
};
