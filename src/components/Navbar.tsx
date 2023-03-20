import { FC, lazy } from "react";

import { Box, Button, CloseButton, Flex, Heading, HStack, IconButton, Link, useDisclosure, useMediaQuery, VStack } from "@chakra-ui/react";
import { FiBox, FiMenu, FiShoppingCart, FiUser, FiMessageSquare, FiMail } from "react-icons/fi";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const SearchDrawer = lazy(() => import("./SearchDrawer"));

const links = [
    {
        id: 1,
        text: "Productos",
        route: '/products',
        icon: <FiBox />,
    },
    {
        id: 2,
        text: "Blog",
        route: '/blog',
        icon: <FiMessageSquare />,
    },
    {
        id: 3,
        text: "Contacto",
        route: '/contact',
        icon: <FiMail />,
    }
]

export const Navbar: FC = (): JSX.Element => {
    const isInLogin = window.location.pathname

    const [isLargerThan860] = useMediaQuery('(min-width: 860px)')

    const mobileNav = useDisclosure();

    const navigate = useNavigate();

    const onRoute = (toRoute: string) => {
        mobileNav.onClose();
        navigate(toRoute)
    }

    return (
        <>
            {
                (isInLogin !== '/login' && isInLogin !== '/signup') &&
                <Heading bgColor='green.500' w="full" px={{ base: 2, sm: 4, }} py={1} shadow="md">
                    <Flex alignItems="center" justifyContent="space-between" mx="auto">
                        <Link to="/" title="Xochicalli Commerce - Inicio" as={RouterLink}>
                            <LazyLoadImage
                                src={import.meta.env.VITE_ADMIN_LOGIN_IMAGE}
                                style={{ width: 86 }}
                                effect='blur'
                            />
                        </Link>
                        <HStack display="flex" alignItems="center" spacing={1}>
                            <HStack spacing={[1, 1, 1, 2, 4]} mr={1} color="brand.500" display={["none", "none", "inline-flex"]}>
                                {
                                    links.map(({ id, text, route, icon }) => {
                                        return (
                                            !isLargerThan860
                                                ?
                                                <Button color='white' variant='ghost' _hover={{ bg: 'gray.200', color: 'gray.800' }}
                                                    key={id} onClick={() => onRoute(route)}
                                                >
                                                    {text}
                                                </Button>
                                                :
                                                <Button leftIcon={icon} color='white' variant='ghost' _hover={{ bg: 'gray.200', color: 'gray.800' }}
                                                    key={id} onClick={() => onRoute(route)}
                                                >
                                                    {text}
                                                </Button>
                                        )
                                    }
                                    )
                                }
                                <SearchDrawer />
                                {
                                    !isLargerThan860
                                        ?
                                        <>
                                            <Button
                                                color='white'
                                                variant='ghost'
                                                _hover={{ bg: 'gray.200', color: 'gray.800' }}
                                                onClick={() => navigate('/login')}
                                            >
                                                Iniciar sesión
                                            </Button>
                                            <Button
                                                color='white'
                                                variant='ghost'
                                                _hover={{ bg: 'gray.200', color: 'gray.800' }}
                                                onClick={() => navigate('/cart')}
                                            >
                                                Carrito
                                            </Button>
                                        </>
                                        :
                                        <>
                                            <Button
                                                leftIcon={<FiUser />} color='white'
                                                variant='ghost'
                                                _hover={{ bg: 'gray.200', color: 'gray.800' }}
                                                onClick={() => navigate('/login')}
                                            >
                                                Iniciar sesión
                                            </Button>
                                            <Button
                                                leftIcon={<FiShoppingCart />} color='white'
                                                variant='ghost'
                                                _hover={{ bg: 'gray.200', color: 'gray.800' }}
                                                onClick={() => navigate('/cart')}
                                            >
                                                Carrito
                                            </Button>
                                        </>
                                }
                            </HStack>
                            <Box display={["inline-flex", "inline-flex", "none"]}>
                                <IconButton display={["flex", "flex", "none"]} aria-label="Open menu" fontSize="20px"
                                    variant='ghost'
                                    color='white'
                                    _hover={{ bgColor: 'whiteAlpha.400' }}
                                    icon={<FiMenu />}
                                    onClick={mobileNav.onOpen}
                                />

                                <VStack pos="absolute" zIndex={99} top={0} left={0} right={0} display={mobileNav.isOpen ? "flex" : "none"}
                                    flexDirection="column" alignItems='flex-end' p={2} pb={4} m={2} bgColor='gray.200' spacing={3}
                                    rounded="sm" shadow="sm"
                                >
                                    <CloseButton aria-label="Close menu" size='lg' onClick={mobileNav.onClose} />

                                    {
                                        links.map(({ id, text, route, icon }) => (
                                            <Button leftIcon={icon} variant='ghost' width='full' _hover={{ bg: 'green.400', color: 'white' }}
                                                key={id} onClick={() => onRoute(route)}
                                            >
                                                {text}
                                            </Button>
                                        ))
                                    }
                                    <Button
                                        leftIcon={<FiUser />}
                                        w="full"
                                        colorScheme='blue'
                                        onClick={() => onRoute('/login')}
                                    >
                                        Iniciar sesión
                                    </Button>
                                    <Button
                                        leftIcon={<FiShoppingCart />}
                                        w="full"
                                        colorScheme='green'
                                        onClick={() => onRoute('/cart')}
                                    >
                                        Ver carrito
                                    </Button>
                                </VStack>
                            </Box>
                        </HStack>
                    </Flex>
                </Heading>

            }
        </>
    );
};