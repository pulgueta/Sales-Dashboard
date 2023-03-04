import { FC, useState } from 'react'

import {
    Box, Button, ButtonGroup, Center, FormControl, FormErrorMessage, FormLabel, Heading, HStack, IconButton, Img, Input, InputGroup, InputRightElement, Stack, useToast, VStack
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'
import { FaEye, FaEyeSlash } from 'react-icons/fa'


import { AdminLoginInputs } from '../../../interfaces'
import { loginWithEmail } from '../../../utils'

export const AdminLogin: FC = (): JSX.Element => {

    const [show, setShow] = useState<boolean>(true)

    const toast = useToast();

    const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm<AdminLoginInputs>();

    const onSubmit: SubmitHandler<AdminLoginInputs> = async (values: AdminLoginInputs) => {
        if (!await loginWithEmail(values.email, values.password)) {
            toast({
                status: 'error',
                duration: 1500,
                isClosable: false,
                title: 'Inicio de sesión',
                description: '¡Algo salió mal!'
            })
        } else {
            toast({
                status: 'success',
                duration: 1500,
                isClosable: false,
                title: 'Inicio de sesión',
                description: '¡Bienvenido de vuelta!'
            })
            reset()
        }
    }

    return (

        <VStack minH='calc(100vh - 115px)' bgColor='gray.200'>
            <Helmet>
                <title>Administrador</title>
            </Helmet>
            <Center>
                <Box bgColor='white' w={['xs', 'sm']} py={2} px={4} borderRadius='xl' mt={8}>
                    <Heading textAlign='center' my={4}>
                        Iniciar sesión
                    </Heading>

                    <Img
                        src={import.meta.env.VITE_ADMIN_LOGIN_IMAGE}
                        width='128px'
                        mx='auto'
                        my={4}
                    />

                    <Stack gap={2}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl isInvalid={!!errors.email}>
                                <FormLabel htmlFor='email'>Correo electrónico</FormLabel>
                                <Input
                                    autoComplete='false'
                                    type='email'
                                    id='email'
                                    borderColor='gray.200'
                                    {...register('email', {
                                        required: true,
                                        minLength: 4,
                                        pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                                    })}
                                />
                                {errors.email && <FormErrorMessage>El correo es requerido</FormErrorMessage>}
                            </FormControl>

                            <FormControl isInvalid={!!errors.password} mt={4}>
                                <FormLabel htmlFor='password'>Contraseña</FormLabel>
                                <InputGroup>
                                    <InputRightElement>
                                        <IconButton
                                            variant='link'
                                            aria-label='Show password'
                                            icon={show ? <FaEye /> : <FaEyeSlash />}
                                            onClick={() => setShow(!show)}
                                        />
                                    </InputRightElement>
                                    <Input
                                        autoComplete='false'
                                        type={show ? 'password' : 'text'}
                                        id='password'
                                        borderColor='gray.200'
                                        {...register('password', {
                                            required: true,
                                            minLength: 4
                                        })}
                                    />
                                </InputGroup>
                                {errors.password && <FormErrorMessage>La contraseña es requerida</FormErrorMessage>}
                            </FormControl>
                            <HStack alignItems='right' my={4} justifyContent='flex-end'>
                                <Button variant="link" colorScheme="blue" size="sm" onClick={() => console.log('forgot')}>
                                    Olvidé mi contraseña
                                </Button>
                            </HStack>
                            <ButtonGroup pb={4} width='100%' colorScheme='green'>
                                <Button type='submit' isLoading={isSubmitting} width='100%'>Iniciar sesión</Button>
                            </ButtonGroup>
                        </form>
                    </Stack>
                </Box>
            </Center>
        </VStack >
    )
}