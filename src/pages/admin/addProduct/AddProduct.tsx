import { FC } from 'react'

import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputLeftAddon, InputRightAddon, Textarea, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Inputs } from '../../../interfaces';

const AddProduct: FC = () => {

    const { handleSubmit, register, formState: { errors, isSubmitting }, } = useForm<Inputs>()

    const navigate = useNavigate();

    const handleGoProducts = () => navigate('/admin/products')

    const onSubmit: SubmitHandler<Inputs> = (values: any) => new Promise((resolve: any) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            resolve()
        }, 3000)
    })

    return (
        <VStack h='calc(100vh - 64px)' bgColor='gray.200'>
            <Heading my={8}>
                Añadir un producto
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box w={[350, 450, 550, 650]} bgColor='white' p={5} borderRadius='xl' boxShadow='xs'>
                    <FormControl isInvalid={!!errors.title} mb={4}>
                        <FormLabel htmlFor='title'>Nombre de producto</FormLabel>
                        <Input
                            type='text'
                            id='title'
                            borderColor='gray.200'
                            placeholder='Planta medicinal'
                            {...register('title', {
                                required: true,
                                minLength: 4
                            })}
                        />
                        {errors.title && <FormErrorMessage>El título es requerido</FormErrorMessage>}

                    </FormControl>
                    <FormControl isInvalid={!!errors.description} mb={4}>
                        <FormLabel htmlFor='description'>Descripción del producto</FormLabel>
                        <Textarea
                            id='description'
                            borderColor='gray.200'
                            placeholder='Planta con aroma agradable para curar enfermedades'
                            {...register('description', {
                                required: true,
                                minLength: { value: 4, message: 'Descripción es requerida' },
                            })}
                        />
                        {errors.description && <FormErrorMessage>La descripción es requerida</FormErrorMessage>}

                    </FormControl>
                    <FormControl isInvalid={!!errors.price} mb={4}>
                        <FormLabel htmlFor='price'>Precio</FormLabel>
                        <InputGroup>
                            <InputLeftAddon children='$' />
                            <Input
                                id='price'
                                type='number'
                                borderColor='gray.200'
                                placeholder='12345'
                                {...register('price', {
                                    required: true,
                                    min: 20,
                                })}
                            />
                            <InputRightAddon children='MXN' />
                        </InputGroup>
                        {errors.price && <FormErrorMessage>El precio es requerido</FormErrorMessage>}
                    </FormControl>

                    <FormControl isInvalid={!!errors.image} mb={4}>
                        <FormLabel htmlFor='image'>Imagen</FormLabel>
                        <Input 
                            id='image'
                            type='file'
                        />
                    </FormControl>

                    <Button
                        isLoading={isSubmitting}
                        loadingText='Agregando producto...'
                        colorScheme='blue'
                        width='100%'
                        type='submit'
                        mb={2}
                    >
                        Agregar producto
                    </Button>
                    <Button colorScheme='linkedin' width='100%' onClick={handleGoProducts}>
                        Ver productos
                    </Button>

                </Box>
            </form>
        </VStack >
    )
}

export default AddProduct
