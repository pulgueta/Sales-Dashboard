import { FC, useEffect, useState } from 'react'

import { onAuthStateChanged } from 'firebase/auth'
import { Button, VStack } from '@chakra-ui/react'

import { loginWithEmail, logOut } from '../../utils'
import { auth } from '../../firebase'

const Home: FC = (): JSX.Element => {

    const [isActive, setIsActive] = useState<boolean | null>(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsActive(true)
            } else {
                setIsActive(false)
            }
        });
    }, [isActive])

    return (
        <VStack h='calc(100vh - 64px)' bgColor='green.500'>
            {
                !isActive ?
                    <Button onClick={() => loginWithEmail('correo@admin.com', 'administrador')}>
                        Login
                    </Button>
                    :
                    <Button onClick={logOut}>
                        Logout
                    </Button>
            }
        </VStack>
    )
}

export default Home;