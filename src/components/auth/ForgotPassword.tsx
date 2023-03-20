import { ChangeEvent, FC, useRef, useState } from 'react'

import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, ButtonGroup, Flex, FormControl, FormErrorMessage, FormLabel, Input, Select, useDisclosure, useMediaQuery, useToast } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { forgotPassword } from '@/utils';
import { PasswordReset } from '@/interfaces';

export const ForgotPassword: FC = (): JSX.Element => {
    const [formState, setFormState] = useState<number>(1)
    const [securityQ, setSecurityQ] = useState<string>('¿Cuál es tu color favorito?')
    const cancelRef = useRef<any>()

    const { isOpen, onClose, onOpen } = useDisclosure();
    const toast = useToast()
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')

    const nextForm = () => formState <= 3 && setFormState(prev => prev + 1)
    const prevForm = () => formState >= 1 && setFormState(prev => prev - 1)

    const setQuestionValue = ({ target }: ChangeEvent<HTMLSelectElement>) => setSecurityQ(target.value)

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .email('El email no es válido')
            .required('El correo es requerido'),
        securitySelect: yup
            .string()
            .required('La pregunta de seguridad no puede estar vacía')
    })

    const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm<PasswordReset>({ resolver: yupResolver(validationSchema) });

    const onSubmit: SubmitHandler<PasswordReset> = async ({ email, securityQuestion = securityQ, securitySelect }: PasswordReset) => {
        await forgotPassword({ email, securityQuestion, securitySelect }).then(() => {
            toast({
                status: 'success',
                duration: 1500,
                isClosable: false,
                title: 'Recuperación de contraseña',
                position: isLargerThan800 ? 'top-right' : 'bottom',
                description: 'Correo enviado exitosamente'
            })
            reset()
        })
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
                            <form onSubmit={handleSubmit(onSubmit)}>
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
                            </form>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Flex direction={['column', 'row']} width='100%' gap={2.5}>
                                <Button width='100%' colorScheme='red' type='button' onClick={prevForm} isDisabled={formState === 1}>
                                    Anterior
                                </Button>
                                <Button marginInlineStart={0} width='100%' colorScheme='blue' onClick={nextForm} isDisabled={formState === 2}>
                                    Siguiente
                                </Button>
                                {
                                    formState === 2 &&
                                    <Button
                                        marginInlineStart={0}
                                        colorScheme='purple'
                                        width='100%'
                                        isLoading={isSubmitting}
                                        onClick={handleSubmit(onSubmit)}
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
