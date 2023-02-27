import { FC, RefObject, useRef, useState } from 'react'

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputLeftAddon, InputRightAddon, Textarea, useToast, VStack, } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import { Inputs } from '../../../interfaces';
import { addProduct } from '../../../utils';
import { storage } from '../../../firebase';

const AddProduct: FC = (): JSX.Element => {

    const [imageUrl, setImageUrl] = useState<string>('')
    const fileRef = useRef<HTMLInputElement>(null);

    const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm<Inputs>()

    const toast = useToast();

    const navigate = useNavigate();
    const handleGoProducts = () => navigate('/admin/products')

    const uploadImage = async (fileRef: RefObject<HTMLInputElement>) => {
        try {
            const file = fileRef.current?.files?.[0] ?? new Blob();
            const fileName = file?.name;
            const imgRef = ref(storage, `products/${uuidv4() + fileName}`);
            const imgUpload = uploadBytesResumable(imgRef, file);

            if (!file) {
                console.error('No file selected');
                return;
            }

            imgUpload.on("state_changed", ({ state }) => {
                switch (state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            }, (err) => {
                console.error(err);
            }, async () => {
                const url = await getDownloadURL(imgUpload.snapshot.ref);
                setImageUrl(url)
            });
        } catch (error) {
            console.error(error);
        }
    }

    const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
        const prod = await addProduct(values, imageUrl).then(() => {
            toast({
                title: 'Producto subido correctamente',
                duration: 2000,
                status: 'success',
                position: 'top-right'
            })
            reset()
        }).catch(() => {
            toast({
                title: '¡Algo salió mal!',
                duration: 2000,
                status: 'error',
                position: 'top-right'
            })
        })


        console.log(imageUrl)
        console.log(prod)
    }

    return (
        <VStack minHeight='calc(100vh - 115px)' bgColor='gray.200' py={4}>
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
                            ref={fileRef}
                            onChange={() => uploadImage(fileRef)}
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
