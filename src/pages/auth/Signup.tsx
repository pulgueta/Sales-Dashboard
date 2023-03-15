import { FC, useState } from 'react'

import {
    Box, Button, ButtonGroup, Container, Divider, Flex,
    FormControl, FormErrorMessage, FormLabel, Heading, HStack,
    IconButton, Input, InputGroup, InputLeftElement, InputRightElement,
    Select, Stack, Text, useMediaQuery, useToast,
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { FiEye, FiEyeOff, FiPhone } from 'react-icons/fi'

import { RegisterInputs } from '@/interfaces'
import { signUpWithEmail } from '@/utils'
import { ProviderButtons } from '@/components'

const Signup: FC = (): JSX.Element => {

    const [show, setShow] = useState<boolean>(true)
    const [showTwo, setShowTwo] = useState<boolean>(true)
    const [formState, setFormState] = useState<number>(1)

    const toast = useToast();
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')

    const navigate = useNavigate();

    const nextForm = () => {
        if (formState <= 2) setFormState(prev => prev + 1)
        else return
    }

    const prevForm = () => {
        if (formState >= 1) setFormState(prev => prev - 1)
        else return
    }

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .required('El correo no puede estar vacío')
            .email('Debe ser un correo válido'),
        password: yup
            .string()
            .required('La contraseña no puede estar vacía')
            .min(6, 'La contraseña debe tener mínimo 6 caracteres'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Las contraseñas deben ser idénticas')
            .required('Debes confirmar la contraseña'),
        name: yup
            .string()
            .required('El nombre no puede estar vacío')
            .min(4, 'El nombre debe tener mínimo 4 caracteres'),
        fatherSurname: yup
            .string()
            .required('El apellido paterno no puede estar vacío')
            .min(4, 'El apellido paterno debe tener mínimo 4 caracteres'),
        motherSurname: yup
            .string()
            .required('El apellido materno no puede estar vacío')
            .min(4, 'El apellido materno debe tener mínimo 4 caracteres'),
        birthday: yup
            .date()
            .required('La fecha de nacimiento es requerida')
            .max(new Date(), 'La fecha de nacimiento debe ser antes de hoy'),
        gender: yup
            .string()
            .required('Debes seleccionar un género')
            .oneOf(['Masculino', 'Femenino'], `El género debe ser "Masculino" o "Femenino"`),
        phoneNumber: yup
            .string()
            .matches(/^\d{10}$/, 'El número de teléfono no es válido')
            .required('El número de teléfono no puede estar vacío')
    });

    const {
        handleSubmit,
        register,
        formState: {
            errors,
            isSubmitting
        },
        reset
    } = useForm<RegisterInputs>({ resolver: yupResolver(validationSchema) });

    const onSubmit: SubmitHandler<RegisterInputs> = async (values: RegisterInputs) => {
        const { birthday, fatherSurname, motherSurname, gender, name, phoneNumber } = values;
        console.log(birthday);

        try {
            const user = await signUpWithEmail(values.email, values.password, { birthday, fatherSurname, motherSurname, gender, name, phoneNumber })
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
                <Stack spacing="8" alignItems='center'>
                    <Stack spacing="6">
                        {
                            isLargerThan800 &&
                            <HStack justifyContent='center'>
                                <LazyLoadImage
                                    src={import.meta.env.VITE_ADMIN_LOGIN_IMAGE}
                                    width='128px'
                                    effect='blur'
                                />
                            </HStack>
                        }
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
                        py={{ base: '0', sm: '8' }} px={{ base: '4', sm: '10' }}
                        bg={{ base: 'transparent', sm: 'white' }} boxShadow={{ base: 'none', sm: 'md' }}
                        borderRadius={{ base: 'none', sm: 'xl' }} id='register-form' w={['sm', 'md', 'xl']}
                    >
                        <Stack spacing="6">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {
                                    formState === 1
                                    &&
                                    <>
                                        <Flex direction={['column', 'row']} gap={[0, 8]}>
                                            <FormControl isInvalid={!!errors.name}>
                                                <FormLabel htmlFor='name'>Nombre(s)</FormLabel>
                                                <Input
                                                    autoComplete='false'
                                                    type='string'
                                                    id='name'
                                                    bgColor={['white', 'transparent']}
                                                    borderColor='gray.200'
                                                    placeholder='Antonio'
                                                    {...register('name')}
                                                />
                                                {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
                                            </FormControl>
                                            <FormControl isInvalid={!!errors.gender} mt={[4, 0]}>
                                                <FormLabel htmlFor='gender'>Género</FormLabel>
                                                <Select
                                                    defaultValue='Masculino'
                                                    id='gender'
                                                    borderColor='gray.200'
                                                    bgColor={['white', 'transparent']}
                                                    {...register('gender')}
                                                >
                                                    <option value="Masculino">Masculino</option>
                                                    <option value="Femenino">Femenino</option>
                                                </Select>
                                                {errors.gender && <FormErrorMessage>{errors.gender.message}</FormErrorMessage>}
                                            </FormControl>
                                        </Flex>
                                        <Flex direction={['column', 'row']} gap={[0, 8]}>
                                            <FormControl isInvalid={!!errors.fatherSurname} mt={4}>
                                                <FormLabel htmlFor='fatherSurname'>Apellido paterno</FormLabel>
                                                <Input
                                                    autoComplete='false'
                                                    type='string'
                                                    id='fatherSurname'
                                                    bgColor={['white', 'transparent']}
                                                    borderColor='gray.200'
                                                    placeholder='Banderas'
                                                    {...register('fatherSurname')}
                                                />
                                                {errors.fatherSurname && <FormErrorMessage>{errors.fatherSurname.message}</FormErrorMessage>}
                                            </FormControl>
                                            <FormControl isInvalid={!!errors.motherSurname} mt={4}>
                                                <FormLabel htmlFor='motherSurname'>Apellido materno</FormLabel>
                                                <Input
                                                    autoComplete='false'
                                                    type='string'
                                                    id='motherSurname'
                                                    bgColor={['white', 'transparent']}
                                                    borderColor='gray.200'
                                                    placeholder='Solano'
                                                    {...register('motherSurname')}
                                                />
                                                {errors.motherSurname && <FormErrorMessage>{errors.motherSurname.message}</FormErrorMessage>}
                                            </FormControl>
                                        </Flex>
                                        <Flex direction={['column', 'row']} alignItems={['center', 'auto']} gap={[0, 8]}>
                                            <FormControl isInvalid={!!errors.birthday} mt={4}>
                                                <FormLabel htmlFor='birthday'>Fecha de nacimiento</FormLabel>
                                                <Input
                                                    autoComplete='false'
                                                    type='date'
                                                    id='birthday'
                                                    bgColor={['white', 'transparent']}
                                                    borderColor='gray.200'
                                                    {...register('birthday')}
                                                />
                                                {errors.birthday && <FormErrorMessage>{errors.birthday.message}</FormErrorMessage>}
                                            </FormControl>
                                            <FormControl isInvalid={!!errors.phoneNumber} mt={4}>
                                                <FormLabel htmlFor='phoneNumber'>Teléfono</FormLabel>
                                                <InputGroup>
                                                    <InputLeftElement
                                                        children={<FiPhone />}
                                                    />
                                                    <Input
                                                        autoComplete='false'
                                                        type='tel'
                                                        id='phoneNumber'
                                                        bgColor={['white', 'transparent']}
                                                        borderColor='gray.200'
                                                        w='40'
                                                        pattern="[0-9]*"
                                                        maxLength={10}
                                                        placeholder='3331112244'
                                                        {...register('phoneNumber')}
                                                    />
                                                </InputGroup>
                                                {errors.phoneNumber && <FormErrorMessage>{errors.phoneNumber.message}</FormErrorMessage>}
                                            </FormControl>
                                        </Flex>
                                    </>
                                }
                                {
                                    formState === 2
                                    &&
                                    <>
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
                                        <Flex direction={['column', 'row']} gap={[0, 8]}>
                                            <FormControl isInvalid={!!errors.password} mt={4}>
                                                <FormLabel htmlFor='password'>Contraseña</FormLabel>
                                                <InputGroup>
                                                    <InputRightElement>
                                                        <IconButton
                                                            variant='link'
                                                            aria-label='Show password'
                                                            icon={show ? <FiEye /> : <FiEyeOff />}
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
                                                            icon={showTwo ? <FiEye /> : <FiEyeOff />}
                                                            onClick={() => setShowTwo(!showTwo)}
                                                        />
                                                    </InputRightElement>
                                                    <Input
                                                        autoComplete='false'
                                                        type={showTwo ? 'password' : 'text'}
                                                        id='confirmPassowrd'
                                                        bgColor={['white', 'transparent']}
                                                        placeholder='********'
                                                        borderColor='gray.200'
                                                        {...register('confirmPassword')}
                                                    />
                                                </InputGroup>
                                                {errors.confirmPassword && <FormErrorMessage>{errors.confirmPassword.message}</FormErrorMessage>}
                                            </FormControl>
                                        </Flex>
                                    </>
                                }
                                <ButtonGroup width='100%'>
                                    <Button mt={8} width='100%' colorScheme='red' type='button' onClick={prevForm} isDisabled={formState === 1}>
                                        Anterior
                                    </Button>
                                    <Button mt={8} width='100%' colorScheme='blue' type='button' onClick={nextForm} isDisabled={formState === 2}>
                                        Siguiente
                                    </Button>
                                </ButtonGroup>

                                {
                                    formState === 2
                                    &&
                                    <Button mt={8} width='100%' colorScheme='green'
                                        type='submit' isLoading={isSubmitting}
                                    >
                                        Registrarme
                                    </Button>
                                }
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