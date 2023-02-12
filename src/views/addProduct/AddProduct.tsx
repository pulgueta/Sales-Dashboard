import { useState, FC, FormEvent, ChangeEvent } from 'react'

import { Button, FormControl, Heading, Input, InputGroup, InputLeftAddon, InputRightAddon, Textarea, useToast, VStack } from '@chakra-ui/react'

import { ProductDetails } from '../../interfaces'

const AddProduct: FC = () => {

    const [loadBtn, setLoadBtn] = useState<boolean>(false)
    const [productInfo, setProductInfo] = useState<ProductDetails>({
        title: '',
        price: undefined,
        description: '',
        image: null,
    })

    const toast = useToast()

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProductInfo({
            ...productInfo,
            [target.name]: target.value,
        })
    }

    const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault()
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

    return (
        <VStack h='calc(100vh - 64px)' bgColor='gray.200'>
            <Heading my={8}>
                Añadir un producto
            </Heading>
            <FormControl as='form' onSubmit={handleSubmit} w={[350]} bgColor='white' p={5} borderRadius={8} boxShadow='xs'>
                <Input
                    type='text'
                    borderColor='gray.200'
                    placeholder='Planta medicinal'
                    mb={4}
                    name='title'
                    value={productInfo.title}
                    onChange={handleChange}
                />
                <InputGroup>
                    <InputLeftAddon children='$' />
                    <Input
                        type='number'
                        borderColor='gray.200'
                        placeholder='123'
                        mb={4}
                        name='price'
                        value={productInfo.price}
                        onChange={handleChange}
                    />
                    <InputRightAddon children='MXN' />
                </InputGroup>
                <Textarea
                    borderColor='gray.200'
                    placeholder='Planta fea que no sirve'
                    mb={4}
                    name='description'
                    onChange={handleChange}
                />
                <Input
                    type='file'
                    mb={4}
                />

                <Button
                    isLoading={loadBtn}
                    loadingText='Agregando producto...'
                    colorScheme='blue'
                    width='100%'
                    type='submit'
                >
                    Agregar producto
                </Button>
            </FormControl>
        </VStack>
    )
}

export default AddProduct