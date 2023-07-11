import { FC } from 'react';

import { Button, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, Select, Stack, useColorModeValue } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { PaymentInformation as PaymentInterface } from '@/interfaces';

const PaymentInformation: FC = (): JSX.Element => {
    const onlyNumbersRegex = new RegExp('^[0-9]');

    const validationSchema = yup.object().shape({
        names: yup.string().required('Debes ingresar nombres y apellidos').min(6, 'Debes ingresar al menos 6 caracteres'),
        cardNumber: yup
            .string()
            .required('Debes ingresar los numeros de tu tarjeta')
            .min(16, 'La tarjeta debe tener todos los 16 numeros'),
        name: yup.string().required('El nombre no puede estar vacío').min(4, 'El nombre debe tener mínimo 4 caracteres'),
        cvv: yup
            .string()
            .required('El CVV no puede estar vacio')
            .min(3, 'El CVV debe ser de 3 digitos')
            .max(3, 'El CVV no puede ser de mas de 3 digitos')
            .matches(onlyNumbersRegex, 'Solo puedes ingresar numeros'),
    });

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<PaymentInterface>({ resolver: yupResolver(validationSchema) });

    const onSubmit: SubmitHandler<PaymentInterface> = (data) => {
        console.log(data);
    };

    return (
        <Stack spacing={{ base: '6', md: '12' }}>
            <Heading size="lg">Información de pago</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing="6">
                    <Stack direction="row" spacing="6">
                        <FormControl isInvalid={!!errors.name}>
                            <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Nombre en la tarjeta</FormLabel>
                            <Input
                                placeholder="Auriela Lourdes"
                                focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                                {...register('name')}
                            />
                            {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
                        </FormControl>
                        <FormControl isInvalid={!!errors.cardNumber}>
                            <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Número en la tarjeta</FormLabel>
                            <Input
                                placeholder="4321 1234 5432 7890"
                                focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                                {...register('cardNumber')}
                                maxLength={19}
                            />

                            {errors.cardNumber && <FormErrorMessage>{errors.cardNumber.message}</FormErrorMessage>}
                        </FormControl>
                    </Stack>
                    <HStack spacing="6">
                        <FormControl width="full" isInvalid={!!errors.expDate}>
                            <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Fecha de expiración</FormLabel>
                            <HStack spacing="3">
                                <Select aria-label="Select Month" focusBorderColor={useColorModeValue('blue.500', 'blue.200')}>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                </Select>
                                <Select aria-label="Select Year" focusBorderColor={useColorModeValue('blue.500', 'blue.200')}>
                                    <option>2023</option>
                                    <option>2024</option>
                                    <option>2025</option>
                                    <option>2026</option>
                                    <option>2027</option>
                                    <option>2028</option>
                                    <option>2029</option>
                                    <option>2030</option>
                                    <option>2031</option>
                                    <option>2032</option>
                                </Select>
                            </HStack>
                        </FormControl>
                        <FormControl isInvalid={!!errors.cvv}>
                            <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>CVV</FormLabel>
                            <Input
                                placeholder="111"
                                focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                                {...register('cvv')}
                                maxLength={3}
                            />
                            {errors.cvv && <FormErrorMessage>{errors.cvv.message}</FormErrorMessage>}
                        </FormControl>
                    </HStack>
                    <Button type="submit" isLoading={isSubmitting} colorScheme="blue">
                        Realizar pago
                    </Button>
                </Stack>
            </form>
        </Stack>
    );
};

export default PaymentInformation;
