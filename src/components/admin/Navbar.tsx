import { FC } from 'react'

import { Text, HStack, useMediaQuery, Heading } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

import { Sidebar } from '.'
import { NavbarItems } from '../../interfaces'

const links: NavbarItems[] = [
    {
        id: 1,
        text: 'Agregar producto',
        path: '/admin/add',
    },
    {
        id: 2,
        text: 'Productos',
        path: '/admin/products',
    },
    {
        id: 3,
        text: 'Agregar usuario',
        path: '/admin/user',
    },
    {
        id: 4,
        text: 'Ventas',
        path: '/admin/dashboard',
    },
]

const Navbar: FC = (): JSX.Element => {
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')

    return (
        <HStack justifyContent='space-between' alignItems='center' bgColor='green.400' textAlign='center' h='64px' px={[4, 8, 12]} width='100%'>
            <Heading color='white' fontSize={['xl', '2xl']}>
                Panel de administrador
            </Heading>
            {
                isLargerThan800
                    ?
                    <>
                        <HStack>
                            {links.map((item: NavbarItems) => (
                                <NavLink
                                    style={({ isActive }) =>
                                        isActive
                                            ?
                                            { backgroundColor: '#fff', color: '#4A5568', padding: '4px', borderRadius: '4px', transition: 'all 300ms ease' }
                                            :
                                            { color: '#fff', transition: 'all 300ms ease' }
                                    }
                                    to={item.path}
                                    key={item.id}
                                >
                                    <Text
                                        fontWeight='semibold'
                                        mx={[1, 1, 1, 4, 8]}
                                    >{item.text}</Text>
                                </NavLink>
                            ))}
                        </HStack>
                    </>
                    : <Sidebar />
            }
        </HStack >
    )
}

export default Navbar;