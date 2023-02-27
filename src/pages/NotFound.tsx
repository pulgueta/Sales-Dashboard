import { FC } from 'react';

import { Button, Img, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const NotFound: FC = (): JSX.Element => {
    const navigate = useNavigate()

    const handleGoBack = () => navigate('/')

    return (
        <VStack h='calc(100vh - 64px)' bgColor='gray.200' justifyContent='center' gap={4}>
            <Helmet>
                <title>404</title>
            </Helmet>
            <Img
                src='https://firebasestorage.googleapis.com/v0/b/xochicalli-commerce.appspot.com/o/assets%2Fplant-sad-512.webp?alt=media&token=50a7864e-dd95-4902-9561-7065fa1f655d'
                width='256px'
            />
            <Text fontWeight='medium'>No pudimos encontrar la página que buscaste</Text>
            <Button colorScheme='red' onClick={handleGoBack}>
                Volver al inicio
            </Button>
        </VStack>
    )
}