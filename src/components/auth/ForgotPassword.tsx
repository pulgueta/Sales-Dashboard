import { FC, useRef } from 'react'

import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, FormControl, FormErrorMessage, FormLabel, Input, useDisclosure, useMediaQuery, useToast } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { forgotPassword } from '@/utils';

interface PasswordReset {
    email: string;
}

export const ForgotPassword: FC = (): JSX.Element => {
    const cancelRef = useRef<any>()

    const { isOpen, onClose, onOpen } = useDisclosure();
    const toast = useToast()
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')

    const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm<PasswordReset>();

    const onSubmit: SubmitHandler<PasswordReset> = async ({ email }: PasswordReset) => {
        await forgotPassword(email).then(() => {
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
                            </form>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button
                                colorScheme='red'
                                ref={cancelRef}
                                onClick={onClose}
                            >
                                Cancelar
                            </Button>
                            <Button
                                colorScheme='purple'
                                ml={3}
                                isLoading={isSubmitting}
                                onClick={handleSubmit(onSubmit)}
                            >
                                Enviar correo
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
