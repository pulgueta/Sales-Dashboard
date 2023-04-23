import { FC, lazy } from 'react'

import { Text, HStack, useMediaQuery, Heading, IconButton } from '@chakra-ui/react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'

import { ActiveUser, NavbarItems } from '@/interfaces'
import { logOut } from '@/utils'

const Sidebar = lazy(() => import('./Sidebar'))

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
        text: 'Usuarios',
        path: '/admin/user',
    },
    {
        id: 4,
        text: 'Ventas',
        path: '/admin/dashboard',
    },
    {
        id: 5,
        text: 'Backup',
        path: '/admin/backups',
    },
]

const Navbar: FC<ActiveUser> = ({ isUser }): JSX.Element => {
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')

    const navigate = useNavigate()

    const onLogout = async () => {
        await logOut()
            .then(() => {
                navigate('/')
                window.location.reload()
            })
            .catch((err) => console.log(err))
    }

    return (
        <HStack justifyContent='space-between' alignItems='center' bgColor='green.400' textAlign='center' h='64px' px={[4, 8, 12]} width='100%'>
            <Heading color='white' fontSize={['xl', '2xl']}>
                Panel de administrador
            </Heading>
            {
                isLargerThan800
                    ?
                    <>
                        <HStack justifyContent='space-between'>
                            <HStack>
                                {links.map(({ path, id, text }: NavbarItems) => (
                                    <NavLink
                                        style={({ isActive }) =>
                                            isActive
                                                ?
                                                { backgroundColor: '#fff', color: '#4A5568', padding: '4px', borderRadius: '4px', transition: 'all 300ms ease' }
                                                :
                                                { color: '#fff', transition: 'all 300ms ease' }
                                        }
                                        to={path}
                                        key={id}
                                    >
                                        <Text fontWeight='semibold' mx={[1, 1, 1, 4, 8]}>{text}</Text>
                                    </NavLink>
                                ))}
                            </HStack>
                            {
                                isUser && <IconButton aria-label='logout' colorScheme='red' icon={<FiLogOut />} onClick={onLogout} />
                            }
                        </HStack>
                    </>
                    :
                    <Sidebar isUser={isUser} />
            }
        </HStack >
    )
}

export default Navbar;