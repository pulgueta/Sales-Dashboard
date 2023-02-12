import { FC } from 'react'

import { Heading, VStack } from '@chakra-ui/react'

const Home: FC = (): JSX.Element => {
    return (
        <VStack h='calc(100vh - 64px)' bgColor='green.500'>
            <Heading>
                Home
            </Heading>
        </VStack>
    )
}

export default Home;