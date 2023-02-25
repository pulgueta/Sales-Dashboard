import { FC } from 'react'

import { Text, HStack, useMediaQuery, Heading } from '@chakra-ui/react'

import { Sidebar } from '.'
import { NavbarItems } from '../interfaces'
import { Link } from 'react-router-dom'

const links: NavbarItems[] = [
    {
        id: 1,
        text: 'Agregar producto',
        path: '/add',
    },
    {
        id: 2,
        text: 'Productos',
        path: '/products',
    },
    {
        id: 3,
        text: 'Agregar usuario',
        path: '/user',
    },
    {
        id: 4,
        text: 'Ventas',
        path: '/dashboard',
    },
]

const Navbar: FC = (): JSX.Element => {
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')

    return (
        <HStack justifyContent='space-between' alignItems='center' bgColor='gray' textAlign='center' h='64px' px={[4, 8, 12]} width='100%'>
            <Heading color='gray.900' fontSize={['xl', '2xl']}>
                Panel de administrador
            </Heading>
            {
                isLargerThan800
                    ?
                    <>
                        <HStack>
                            {links.map((item: NavbarItems) => (
                                <Link to={item.path} key={item.id}>
                                    <Text fontWeight='semibold' _hover={{ color: 'gray.300', transition: 'all 200ms ease' }} mx={[1, 1, 1, 4, 8]}>{item.text}</Text>
                                </Link>
                            ))}
                        </HStack>
                    </>
                    : <Sidebar />
            }
        </HStack>
    )
}

export default Navbar;