import { FC, useEffect, useState } from 'react'

import { FormControl, FormLabel, Heading, HStack, IconButton, Input, Stack, useColorModeValue, } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';
// import { SubmitHandler, useForm } from 'react-hook-form'
// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios';
import { MXZip } from '@/interfaces';

const ShippingInformation: FC = (): JSX.Element => {
    const [zipCode, setZipCode] = useState<string>('')
    const [zipData, setZipData] = useState<MXZip>()

    const navigate = useNavigate();

    const getShippingByCode = async () => {
        try {
            if (zipCode.length === 5) {
                const { data } = await axios.get<MXZip>(`https://api.zippopotam.us/MX/${zipCode}`);
                console.log(data);
                setZipData(data)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const delayTimer = setTimeout(getShippingByCode, 500); // Delay of 500 milliseconds before making the API call

        return () => {
            clearTimeout(delayTimer); // Clear the timer if the zip code input changes within the delay time
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zipCode]);

    // const validationSchema = yup.object().shape({
    //     names: yup
    //         .string()
    //         .required('Debes ingresar nombres y apellidos')
    //         .min(6, 'Debes ingresar al menos 6 caracteres'),
    //     address: yup
    //         .string()
    //         .required('La contraseña no puede estar vacía')
    //         .matches(
    //             // eslint-disable-next-line no-useless-escape
    //             /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
    //             'La contraseña debe contener al menos 1 letra minúscula, 1 letra mayúscula, 1 número y 1 caracter especial'
    //         )
    //         .min(6, 'La contraseña debe tener mínimo 6 caracteres'),
    //     confirmPassword: yup
    //         .string()
    //         .oneOf([yup.ref('password')], 'Las contraseñas deben ser idénticas')
    //         .required('Debes confirmar la contraseña'),
    //     name: yup
    //         .string()
    //         .required('El nombre no puede estar vacío')
    //         .min(4, 'El nombre debe tener mínimo 4 caracteres'),
    //     fatherSurname: yup
    //         .string()
    //         .required('El apellido paterno no puede estar vacío')
    //         .min(4, 'El apellido paterno debe tener mínimo 4 caracteres'),
    //     motherSurname: yup
    //         .string()
    //         .required('El apellido materno no puede estar vacío')
    //         .min(4, 'El apellido materno debe tener mínimo 4 caracteres'),
    //     birthday: yup
    //         .date()
    //         .required('La fecha de nacimiento es requerida')
    //         .max(new Date(), 'La fecha de nacimiento debe ser antes de hoy'),
    //     gender: yup
    //         .string()
    //         .required('Debes seleccionar un género')
    //         .oneOf(['Masculino', 'Femenino'], `El género debe ser "Masculino" o "Femenino"`),
    //     phoneNumber: yup
    //         .string()
    //         .required('El número de teléfono no puede estar vacío')
    //         .min(10, 'El número de teléfono debe ser de 10 dígitos')
    //         .max(10, 'El número de teléfono no puede tener más de 10 dígitos'),
    //     securitySelect: yup
    //         .string()
    //         .required('La pregunta de seguridad es requerida')
    //         .min(4, 'La respuesta es de mínimo 4 caracteres')
    // });

    // const {
    //     handleSubmit,
    //     register,
    //     formState: {
    //         errors,
    //         isSubmitting
    //     },
    //     reset
    // } = useForm({ resolver: yupResolver(validationSchema) });

    return (
        <Stack spacing={{ base: '6', md: '12' }}>
            <Stack direction='row' spacing={8}>
                <IconButton aria-label='back' icon={<ArrowBackIcon />} onClick={() => navigate('/cart')} w='max-content' />
                <Heading size="lg">Información de envío</Heading>
            </Stack>
            <Stack spacing={{ base: '6', md: '6' }}>
                <FormControl id="name">
                    <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Nombres y apellidos</FormLabel>
                    <Input
                        name="name"
                        placeholder="Callie Nun"
                        focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                    />
                </FormControl>
                <FormControl id="street">
                    <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Dirección completa</FormLabel>
                    <Input
                        name="name"
                        placeholder="123 Ejemplo St"
                        focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                    />
                </FormControl>
                <HStack spacing="6">
                    <FormControl id="zip" maxW="32">
                        <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Código postal</FormLabel>
                        <Input
                            name="zip"
                            onChange={({ target }) => setZipCode(target.value)}
                            placeholder="03100"
                            focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                        />
                    </FormControl>
                    <FormControl id="state">
                        <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Estado</FormLabel>
                        <Input
                            name="state"
                            value={'' || zipData?.places[0].state}
                            placeholder="Tamaulipas"
                            focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                        />
                    </FormControl>
                    <FormControl id="city">
                        <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Ciudad</FormLabel>
                        <Input
                            name="city"
                            value={'' || zipData?.places[0]['place name']}
                            placeholder="Victoria"
                            focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                        />
                    </FormControl>
                </HStack>
                <FormControl id="email">
                    <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Correo electrónico</FormLabel>
                    <Input
                        name="email"
                        placeholder="you@exmaple.com"
                        focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                    />
                </FormControl>
            </Stack>
        </Stack>
    )
}

export default ShippingInformation;