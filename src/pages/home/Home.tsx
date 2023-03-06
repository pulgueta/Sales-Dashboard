import { FC } from 'react'

import { Button, Heading, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Home: FC = (): JSX.Element => {

    const navigate = useNavigate()

    const handleProducts = () => navigate('/admin/products')

    return (
        <VStack h='100vh' bgColor='green.500' alignItems='center' justifyContent='center'>
            <VStack>
                <Heading>
                    Home
                </Heading>
                <Button onClick={handleProducts}>Go to products</Button>
            </VStack>
        </VStack>
    )
}

export default Home;