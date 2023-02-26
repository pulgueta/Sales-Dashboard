import { FC } from 'react'

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputLeftAddon, InputRightAddon, Textarea, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Inputs } from '../../../interfaces';
import { addProduct, uploadImage } from '../../../utils';
import { auth } from '../../../firebase';

const AddProduct: FC = (): JSX.Element => {

    const { handleSubmit, register, formState: { errors, isSubmitting }, } = useForm<Inputs>()

    const navigate = useNavigate();

    const handleGoProducts = () => navigate('/admin/products')

    const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
        const prod = await addProduct(values)

        console.log(values.image)
        console.log(prod)
    }

    return (
        <VStack minHeight='calc(100vh - 112px)' bgColor='gray.200' py={4}>
            <Heading my={4}>
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
                                minLength: 8,
                            })}
                        />
                        {errors.description && <FormErrorMessage>La descripción es requerida</FormErrorMessage>}
                    </FormControl>

                    <FormControl isInvalid={!!errors.category} mb={4}>
                        <FormLabel htmlFor='category'>Categoría</FormLabel>
                        <Input
                            type='text'
                            id='category'
                            borderColor='gray.200'
                            placeholder='Carnívora'
                            {...register('category', {
                                required: true,
                                minLength: 4
                            })}
                        />
                        {errors.category && <FormErrorMessage>La categoría es requerida</FormErrorMessage>}
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
                        <input
                            type='file'
                            id='image'
                            onChange={uploadImage}
                        />
                        {errors.price && <FormErrorMessage>La imagen es requerida</FormErrorMessage>}
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
