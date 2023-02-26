import { FC } from 'react'

import { Button, VStack } from '@chakra-ui/react'

import { signUpWithEmail } from '../../utils'

const Home: FC = (): JSX.Element => {
    return (
        <VStack h='calc(100vh - 64px)' bgColor='green.500'>
            <Button onClick={() => signUpWithEmail('correo@admin.com', 'administrador')}>
                Login
            </Button>
        </VStack>
    )
}

export default Home;