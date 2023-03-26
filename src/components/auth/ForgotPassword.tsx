import { ChangeEvent, FC, useRef, useState } from 'react'

import {
    AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
    Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Radio, Select,
    Stack, useDisclosure, useMediaQuery, useToast, RadioGroup
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { forgotPasswordWithEmail, forgotPasswordWithQuestion } from '@/utils';
import { PasswordResetEmail, PasswordResetQuestion } from '@/interfaces';

export const ForgotPassword: FC = (): JSX.Element => {
    const [formState, setFormState] = useState<number>(0)
    const [securityQ, setSecurityQ] = useState<string>('¿Cuál es tu color favorito?')
    const [recoveryMethod, setRecoveryMethod] = useState<string>('email')
    const cancelRef = useRef<any>()

    const { isOpen, onClose, onOpen } = useDisclosure();
    const toast = useToast()
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')

    const nextForm = () => formState <= 3 && setFormState(prev => prev + 1)
    const prevForm = () => formState >= 0 && setFormState(prev => prev - 1)

    const onChangeRecoveryMethod = () => recoveryMethod === 'email' ? setRecoveryMethod('emailQuestion') : setRecoveryMethod('email')
    const setQuestionValue = ({ target }: ChangeEvent<HTMLSelectElement>) => setSecurityQ(target.value)

    const validationSchemaQuestion = yup.object().shape({
        email: yup
            .string()
            .email('El email no es válido')
            .required('El correo es requerido'),
        securitySelect: yup
            .string()
            .required('La pregunta de seguridad no puede estar vacía')
    })

    const validationSchemaEmail = yup.object().shape({
        email: yup
            .string()
            .email('El email no es válido')
            .required('El correo es requerido')
    })

    const { handleSubmit, register, reset, formState: {
        errors,
        isSubmitting
    }, } = useForm<PasswordResetQuestion>({ resolver: yupResolver(recoveryMethod === 'email' ? validationSchemaEmail : validationSchemaQuestion) });

    const onSubmitQuestion: SubmitHandler<PasswordResetQuestion> = async ({ email, securityQuestion = securityQ, securitySelect }: PasswordResetQuestion) => {
        await forgotPasswordWithQuestion({ email, securityQuestion, securitySelect }).then(() => {
            toast({
                status: 'success',
                duration: 1500,
                isClosable: false,
                title: 'Recuperación de contraseña',
                position: isLargerThan800 ? 'top-right' : 'bottom',
                description: 'Correo enviado exitosamente'
            })

            reset()
        }).catch(() => {

            toast({
                status: 'error',
                duration: 1500,
                isClosable: false,
                title: 'Recuperación de contraseña',
                position: isLargerThan800 ? 'top-right' : 'bottom',
                description: 'Respuesta incorrecta'
            })
        })
    }

    const onSubmitEmail: SubmitHandler<PasswordResetEmail> = async (email: PasswordResetEmail) => {
        try {
            await forgotPasswordWithEmail(email)
            toast({
                status: 'success',
                duration: 1500,
                isClosable: false,
                title: 'Recuperación de contraseña',
                position: isLargerThan800 ? 'top-right' : 'bottom',
                description: 'Correo enviado exitosamente'
            })

            reset()

        } catch (error) {
            toast({
                status: 'error',
                duration: 1500,
                isClosable: false,
                title: 'Recuperación de contraseña',
                position: isLargerThan800 ? 'top-right' : 'bottom',
                description: 'Algo salió mal'
            })
        }
    }

    return (
        <>
            <Button variant='link' colorScheme='blue' onClick={onOpen}>Olvidé mi contraseña</Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                size={['xs', 'sm', 'md', 'lg', 'xl']}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Recuperar contraseña
                        </AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            {
                                formState === 0 &&
                                <RadioGroup onChange={onChangeRecoveryMethod} value={recoveryMethod}>
                                    <Stack>
                                        <Radio value='email'>Correo electrónico</Radio>
                                        <Radio value='emailQuestion'>Correo electrónico y pregunta de seguridad</Radio>
                                    </Stack>
                                </RadioGroup>
                            }
                            {
                                (formState === 1 && recoveryMethod === 'email') &&
                                <FormControl isInvalid={!!errors.email}>
                                    <FormLabel htmlFor='email'>Correo electrónico</FormLabel>
                                    <Input
                                        autoComplete='false'
                                        type='email'
                                        id='email'
                                        placeholder='correo@electronico.com'
                                        {...register('email', {
                                            required: true,
                                            minLength: 4,
                                            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                                        })}
                                    />
                                    {errors.email && <FormErrorMessage>El correo es requerido</FormErrorMessage>}
                                </FormControl>
                            }
                            {
                                recoveryMethod === 'emailQuestion' &&
                                <form onSubmit={handleSubmit(onSubmitQuestion)}>
                                    {
                                        formState === 1 &&
                                        <FormControl isInvalid={!!errors.email}>
                                            <FormLabel htmlFor='email'>Correo electrónico</FormLabel>
                                            <Input
                                                autoComplete='false'
                                                type='email'
                                                id='email'
                                                placeholder='correo@electronico.com'
                                                {...register('email', {
                                                    required: true,
                                                    minLength: 4,
                                                    pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                                                })}
                                            />
                                            {errors.email && <FormErrorMessage>El correo es requerido</FormErrorMessage>}
                                        </FormControl>
                                    }
                                    {
                                        formState === 2 &&
                                        <>
                                            <FormControl>
                                                <FormLabel htmlFor='securityQuestion'>Pregunta de seguridad</FormLabel>
                                                <Select bgColor='white' defaultValue="¿Cuál es tu color favorito?" onChange={setQuestionValue}>
                                                    <option value="¿Cuál es tu color favorito?">¿Cuál es tu color favorito?</option>
                                                    <option value="¿Cuál es tu película favorita?">¿Cuál es tu película favorita?</option>
                                                    <option value="¿Cuál es tu equipo de fútbol favorito?">¿Cuál es tu equipo de fútbol favorito?</option>
                                                    <option value="¿Cuál es tu género de música favorito?">¿Cuál es tu género de música favorito?</option>
                                                    <option value="¿Cuál es el nombre de tu mascota?">¿Cuál es el nombre de tu mascota?</option>
                                                </Select>
                                            </FormControl>
                                            <FormControl isInvalid={!!errors.securitySelect} mt={4}>
                                                <FormLabel htmlFor='securitySelect'>Respuesta</FormLabel>
                                                <Input
                                                    autoComplete='false'
                                                    type='text'
                                                    id='securitySelect'
                                                    bgColor={['white', 'transparent']}
                                                    borderColor='gray.200'
                                                    placeholder='Tu respuesta aquí...'
                                                    {...register('securitySelect')}
                                                />
                                                {errors.securitySelect && <FormErrorMessage>{errors.securitySelect.message}</FormErrorMessage>}
                                            </FormControl>
                                        </>
                                    }
                                </form>}
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Flex direction={['column', 'row']} width='100%' gap={2.5}>
                                <Button width='100%' colorScheme='red' type='button' onClick={prevForm} isDisabled={formState === 0}>
                                    Anterior
                                </Button>
                                <Button
                                    marginInlineStart={0}
                                    width='100%'
                                    colorScheme='blue'
                                    onClick={nextForm}
                                    isDisabled={((formState === 2) || (recoveryMethod === 'email' && formState === 1))}
                                >
                                    Siguiente
                                </Button>
                                {
                                    ((formState === 2) || (recoveryMethod === 'email' && formState === 1)) &&
                                    <Button
                                        marginInlineStart={0}
                                        colorScheme='purple'
                                        width='100%'
                                        isLoading={isSubmitting}
                                        onClick={
                                            recoveryMethod === 'email'
                                                ?
                                                handleSubmit(onSubmitEmail)
                                                :
                                                handleSubmit(onSubmitQuestion)
                                        }
                                    >
                                        Enviar correo
                                    </Button>
                                }
                            </Flex>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
