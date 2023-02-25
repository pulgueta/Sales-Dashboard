import { FC } from 'react';

import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

export const NotFound: FC = (): JSX.Element => {
    const { pathname } = useLocation()

    const navigate = useNavigate()

    const handleGoBack = () => navigate('/')

    return (
        <VStack h='calc(100vh - 64px)' bgColor='gray.200' justifyContent='center'>
            <Heading>
                ¡Ups!
            </Heading>
            <Text fontSize={['lg', 'xl', '2xl']} fontWeight='medium'><i>'{pathname}'</i> al parecer no existe...</Text>
            <Button colorScheme='blue' onClick={handleGoBack}>
                Volver al inicio
            </Button>
        </VStack>
    )
}