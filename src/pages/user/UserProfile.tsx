import { FC, lazy, useContext, useEffect, useState } from 'react'

import { VStack, Text, Box, InputGroup, InputLeftAddon, Input, Heading, Button, FormControl, FormErrorMessage } from '@chakra-ui/react'
import { DocumentData } from 'firebase/firestore'
import { FiPhone } from 'react-icons/fi'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { enroll2FA, queryUser, send2FA, verifyUserEnrolled } from '@/utils/firebase'
import { UserContext } from '@/context/auth'
// import { useCaptcha } from '@/hooks'


const UserHeaderCard = lazy(() => import('@/components/user/UserHeaderCard'))

interface PhoneNumber {
    phoneNumber: string;
}

const UserProfile: FC = (): JSX.Element => {
    const [otpCodeId, setOtpCodeId] = useState<string | undefined>()
    const [otpValue, setOtpValue] = useState('')
    const [otpView, setOtpView] = useState<boolean>(false)
    const [currentUserData, setCurrentUserData] = useState<DocumentData | undefined>()
    const { user } = useContext(UserContext)

    // const captcha = useCaptcha('mfa-button')

    const validationSchema = yup.object().shape({
        phoneNumber: yup
            .string()
            .required('El número de teléfono no puede estar vacío')
            .min(10, 'El número de teléfono debe ser de 10 dígitos')
            .max(10, 'El número de teléfono no puede tener más de 10 dígitos'),
    })

    const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm<PhoneNumber>({ resolver: yupResolver(validationSchema) });

    const onSubmit: SubmitHandler<PhoneNumber> = async (data) => {
        const verificationId = await send2FA(user, `+57${data.phoneNumber}`, 'xdd')

        if (!verificationId) return

        setOtpCodeId(verificationId)
        setOtpView(true)
        reset()
    }

    const validateOTP = async () => {
        const res = await enroll2FA(user, otpCodeId, otpValue)

        res ? setOtpView(false) : alert('error')
    }

    useEffect(() => {
        const getUserData = async () => {
            const currentUser = await queryUser(user?.uid)
            setCurrentUserData(currentUser)

            console.log(currentUser);
        }

        getUserData()
    }, [user?.uid])

    return (
        <VStack minH='calc(100vh - 64px)' bgColor='gray.100' p={4}>
            {
                (user && user?.emailVerified && !verifyUserEnrolled(user))
                    ?
                    <Box bgColor='white' borderRadius='lg' py={4} px={6} id='mfa'>
                        {
                            !otpView
                                ?
                                <>
                                    <Heading textAlign='center'>Activar 2FA</Heading>
                                    <Text my={4}>Ingresa tu número de teléfono para activar la autenticación por 2 factores (SMS)</Text>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <FormControl isInvalid={!!errors.phoneNumber} display='flex' flexDir='column' alignItems='center'>
                                            <Box width='max-content' mx='auto'>
                                                <InputGroup>
                                                    <InputLeftAddon bgColor='blue.400' children={<FiPhone color='white' />} />
                                                    <Input
                                                        type='number'
                                                        width='40'
                                                        {...register('phoneNumber')}
                                                    />
                                                </InputGroup>
                                            </Box>
                                            {errors.phoneNumber && <FormErrorMessage textAlign='center'>{errors.phoneNumber.message}</FormErrorMessage>}
                                        </FormControl>
                                        <Button
                                            type='submit'
                                            // onClick={() => setOtpView(true)}
                                            mt={8}
                                            mb={2}
                                            id='mfa-button'
                                            width='100%'
                                            colorScheme='blue'
                                            isLoading={isSubmitting}
                                            loadingText='Enviando mensaje...'
                                        >
                                            Enviar SMS
                                        </Button>
                                    </form>
                                </>
                                :
                                <>
                                    <Heading textAlign='center'>Código SMS</Heading>
                                    <Text textAlign='center' my={4}>Ingresa el código que hemos enviado a tu celular</Text>
                                    <VStack justifyContent='center' gap={6} my={4}>
                                        <Input
                                            type='number'
                                            inputMode='numeric'
                                            maxLength={6}
                                            w={24}
                                            textAlign='center'
                                            fontWeight={600}
                                            value={otpValue}
                                            onChange={({ target }) => setOtpValue(target.value)}
                                        />
                                        {/* <Suspense fallback={<Spinner size='xl' />}>
                                        <OTPInput length={6} onChange={() => setOtpValue} />
                                    </Suspense> */}
                                        <Button onClick={validateOTP} colorScheme='green'>Validar código</Button>
                                    </VStack>
                                </>
                        }
                    </Box>
                    :
                    <UserHeaderCard
                        createdAt={currentUserData?.createdAt}
                        imageURL={
                            currentUserData?.profilePicture === null
                                ?
                                'https://via.placeholder.com/350'
                                :
                                currentUserData?.profilePicture
                        }
                        name={`${currentUserData?.name} ${currentUserData?.fatherSurname} ${currentUserData?.motherSurname}`}
                    />
            }
        </VStack>
    )
}

export default UserProfile