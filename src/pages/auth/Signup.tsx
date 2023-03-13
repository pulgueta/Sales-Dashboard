import { FC, useState } from 'react'

import {
    Box, Button, Container, Divider,
    FormControl, FormErrorMessage, FormLabel, Heading, HStack,
    IconButton, Input, InputGroup, InputRightElement, Stack,
    Text, useMediaQuery, useToast,
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import { RegisterInputs } from '@/interfaces'
import { signUpWithEmail } from '@/utils'
import { ProviderButtons } from '@/components'

const Signup: FC = (): JSX.Element => {

    const [show, setShow] = useState<boolean>(true)

    const toast = useToast();
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')

    const navigate = useNavigate();

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .required('El correo es requerido')
            .email('Debe ser un correo válido'),
        password: yup
            .string()
            .required('La contraseña es requerida')
            .min(6, 'La contraseña debe tener mínimo 6 caracteres'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Las contraseñas deben ser idénticas')
            .required('Debes confirmar la contraseña')
    });

    const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm<RegisterInputs>({ resolver: yupResolver(validationSchema) });

    const onSubmit: SubmitHandler<RegisterInputs> = async (values: RegisterInputs) => {
        try {
            const user = await signUpWithEmail(values.email, values.password)
            toast({
                status: 'success',
                duration: 1500,
                isClosable: false,
                title: 'Registro',
                position: isLargerThan800 ? 'top-right' : 'bottom',
                description: `¡Te has registrado con el correo ${user?.email}!`
            })
            reset()
            navigate(-1)
        } catch ({ message }) {
            toast({
                status: 'error',
                duration: 1500,
                isClosable: false,
                title: 'Error de registro',
                position: isLargerThan800 ? 'bottom' : 'top-right',
                description: message as string // Cast error to string
            })
        }
    }

    return (
        <Box bgColor='gray.100' minHeight='100vh'>
            <Helmet>
                <title>Crear cuenta</title>
            </Helmet>
            <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
                <Stack spacing="8">
                    <Stack spacing="6">
                        <HStack justifyContent='center'>
                            <LazyLoadImage
                                src={import.meta.env.VITE_ADMIN_LOGIN_IMAGE}
                                width='128px'
                                effect='blur'
                            />
                        </HStack>
                        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                            <Heading size={{ base: 'xl', md: 'lg' }}>Crear cuenta</Heading>
                            <HStack spacing="1" justify="center">
                                <Text color="muted">¿Ya tienes cuenta?</Text>
                                <Button variant="link" as={Link} to='/login' colorScheme="blue">
                                    Iniciar sesión
                                </Button>
                            </HStack>
                        </Stack>
                    </Stack>
                    <Box
                        py={{ base: '0', sm: '8' }}
                        px={{ base: '4', sm: '10' }}
                        bg={{ base: 'transparent', sm: 'white' }}
                        boxShadow={{ base: 'none', sm: 'md' }}
                        borderRadius={{ base: 'none', sm: 'xl' }}
                    >
                        <Stack spacing="6">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormControl isInvalid={!!errors.email}>
                                    <FormLabel htmlFor='email'>Correo electrónico</FormLabel>
                                    <Input
                                        autoComplete='false'
                                        type='email'
                                        id='email'
                                        bgColor={['white', 'transparent']}
                                        borderColor='gray.200'
                                        placeholder='correo@electronico.com'
                                        {...register('email')}
                                    />
                                    {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
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
                                            bgColor={['white', 'transparent']}
                                            placeholder='********'
                                            borderColor='gray.200'
                                            {...register('password')}
                                        />
                                    </InputGroup>
                                    {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
                                </FormControl>

                                <FormControl isInvalid={!!errors.confirmPassword} mt={4}>
                                    <FormLabel htmlFor='confirmPassword'>Confirmar contraseña</FormLabel>
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
                                            id='confirmPassowrd'
                                            bgColor={['white', 'transparent']}
                                            placeholder='********'
                                            borderColor='gray.200'
                                            {...register('confirmPassword')}
                                        />
                                    </InputGroup>
                                    {errors.confirmPassword && <FormErrorMessage>{errors.confirmPassword.message}</FormErrorMessage>}
                                </FormControl>

                                <Button
                                    mt={8}
                                    width='100%'
                                    colorScheme='green'
                                    type='submit'
                                    isLoading={isSubmitting}
                                >Registrarme</Button>
                            </form>
                            <HStack>
                                <Divider borderColor={['gray.400', 'gray.200']} />
                                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                                    O regístrate con:
                                </Text>
                                <Divider borderColor={['gray.400', 'gray.200']} />
                            </HStack>
                            <ProviderButtons />
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

export default Signup;