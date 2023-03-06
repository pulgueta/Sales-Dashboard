import { FC, useState } from 'react'

import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Divider,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    useMediaQuery,
    useToast,
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import { LoginInputs } from '../../interfaces'
import { loginWithEmail } from '../../utils'
import { ProviderButtons } from '../../components'

const AdminLogin: FC = (): JSX.Element => {

    const [show, setShow] = useState<boolean>(true)

    const toast = useToast();
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')

    const navigate = useNavigate();

    const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm<LoginInputs>();

    const onSubmit: SubmitHandler<LoginInputs> = async (values: LoginInputs) => {
        await loginWithEmail(values.email, values.password).then((user) => {
            toast({
                status: 'success',
                duration: 1500,
                isClosable: false,
                title: 'Inicio de sesión',
                position: isLargerThan800 ? 'bottom' : 'top-right',
                description: `¡Bienvenido ${user?.displayName}!`
            })
            reset()
            navigate(-1)
        }).catch((error) => {
            toast({
                status: 'error',
                duration: 1500,
                isClosable: false,
                title: 'Inicio de sesión',
                position: isLargerThan800 ? 'bottom' : 'top-right',
                description: error
            })
        })
    }

    return (
        <Box bgColor='gray.100' minHeight='100vh'>
            <Helmet>
                <title>Iniciar sesión</title>
            </Helmet>
            <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
                <Stack spacing="8">
                    <Stack spacing="6">
                        <HStack justifyContent='center'>
                            <LazyLoadImage
                                src={import.meta.env.VITE_ADMIN_LOGIN_IMAGE}
                                width='128px'
                                style={{ margin: '8px auto' }}
                                effect='blur'
                            />
                        </HStack>
                        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                            <Heading size={{ base: 'xl', md: 'lg' }}>Iniciar sesión</Heading>
                            <HStack spacing="1" justify="center">
                                <Text color="muted">¿No tienes cuenta?</Text>
                                <Button variant="link" colorScheme="blue">
                                    Registrarme
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
                                            bgColor={['white', 'transparent']}
                                            borderColor='gray.200'
                                            {...register('password', {
                                                required: true,
                                                minLength: 4
                                            })}
                                        />
                                    </InputGroup>
                                    {errors.password && <FormErrorMessage>La contraseña es requerida</FormErrorMessage>}
                                </FormControl>
                                <HStack alignItems='right' mt={4} mb={1} justifyContent='flex-end'>
                                    <Button variant="link" colorScheme="blue" size="sm" onClick={() => console.log('forgot')}>
                                        Olvidé mi contraseña
                                    </Button>
                                </HStack>
                                <ButtonGroup pt={4} width='100%' colorScheme='green'>
                                    <Button type='submit' isLoading={isSubmitting} width='100%'>Iniciar sesión</Button>
                                </ButtonGroup>
                            </form>
                            <HStack>
                                <Divider borderColor={['gray.400', 'gray.200']} />
                                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                                    O ingresa con:
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

export default AdminLogin;