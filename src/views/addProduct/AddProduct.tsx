import { useState, FC, FormEvent } from 'react'

import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputLeftAddon, InputRightAddon, Textarea, useToast, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom'

import { useForm } from '../../hooks';

const AddProduct: FC = () => {
    const { productInfo, handleChange, onSubmit, loadBtn, errorMessage } = useForm();

    return (
        <VStack h='calc(100vh - 64px)' bgColor='gray.200'>
            <Heading my={8}>
                Añadir un producto
            </Heading>
            <FormControl as='form' onSubmit={onSubmit} w={[350, 450, 550, 650]} bgColor='white' p={5} borderRadius={8} boxShadow='xs'>
                <FormControl>
                    <FormLabel>Nombre de producto</FormLabel>
                    <Input
                        type='text'
                        name='title'
                        borderColor='gray.200'
                        placeholder='Planta medicinal'
                        mb={4}
                        value={productInfo.title}
                        onChange={handleChange}
                        autoFocus
                    />
                    {errorMessage && <FormErrorMessage>Título es requerido</FormErrorMessage>}
                </FormControl>
                {/* <InputGroup>
                        <InputLeftAddon children='$' />
                        <Input
                            type='number'
                            borderColor='gray.200'
                            placeholder='123'
                            mb={4}
                            {...register('price',
                                {
                                    required: 'El precio es requerido',
                                    min: {
                                        value: 10, message: 'El precio debe ser mayor a $10MXN'
                                    }
                                })
                            }
                        />
                        <InputRightAddon children='MXN' />
                    </InputGroup>
                    {errors.price && <FormErrorMessage>El precio es requerido</FormErrorMessage>}
                    <Textarea
                        borderColor='gray.200'
                        placeholder='Planta fea que no sirve'
                        mb={4}
                        {...register('description',
                            {
                                required: 'La descripción es requerida',
                                minLength: {
                                    value: 20, message: 'La descripción debe ser mayor a 20 caracteres'
                                }
                            })
                        }
                    />
                    {errors.description && <FormErrorMessage>La descripción es requerida</FormErrorMessage>}
                    <Input
                        type='file'
                        mb={4}
                        {...register('image', { required: 'La imagen es requerida', })}
                    />
                    {errors.image && <FormErrorMessage>La imagen es requerida</FormErrorMessage>} */}

                <Button
                    isLoading={loadBtn}
                    loadingText='Agregando producto...'
                    colorScheme='blue'
                    width='100%'
                    type='submit'
                    mb={2}
                >
                    Agregar producto
                </Button>
                <Button colorScheme='linkedin' width='100%'>
                    <Link to='/products'>
                        Ver productos
                    </Link>
                </Button>
            </FormControl>
        </VStack >
    )
}

export default AddProduct