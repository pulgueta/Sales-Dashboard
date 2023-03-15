import { FC, lazy } from "react";

import { Box, Button, CloseButton, Flex, Heading, HStack, IconButton, Link, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { FiMenu, FiShoppingCart, FiUser } from "react-icons/fi";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const SearchDrawer = lazy(() => import("./SearchDrawer"));

const links = [
    {
        id: 1,
        text: "Productos",
        route: '/products'
    },
    {
        id: 2,
        text: "Blog",
        route: '/blog'
    },
    {
        id: 3,
        text: "Contacto",
        route: '/contact'
    }
]

export const Navbar: FC = (): JSX.Element => {
    const isInLogin = window.location.pathname

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
                <Heading bgColor='green.500' w="full" px={{ base: 2, sm: 4, }} py={4} shadow="md">
                    <Flex alignItems="center" justifyContent="space-between" mx="auto">
                        <Link to="/" title="Xochicalli Commerce - Inicio" as={RouterLink}>
                            <Text fontWeight="bold" ml={2} color='gray.100' textDecoration='none'>
                                Xochicalli Plantas
                            </Text>
                        </Link>
                        <HStack display="flex" alignItems="center" spacing={1}>
                            <HStack spacing={[1, 1, 1, 2, 4]} mr={1} color="brand.500" display={["none", "none", "inline-flex"]}>
                                {
                                    links.map(({ id, text, route }) => (
                                        <Button color='white' variant='ghost' _hover={{ bg: 'gray.200', color: 'gray.800' }}
                                            key={id} onClick={() => onRoute(route)}
                                        >
                                            {text}
                                        </Button>
                                    ))
                                }
                                <SearchDrawer />
                                <IconButton
                                    aria-label="login"
                                    variant='ghost'
                                    color='white'
                                    _hover={{ bgColor: 'white', color: 'gray.800' }}
                                    icon={<FiUser />}
                                    onClick={() => onRoute('/login')}
                                />
                                <IconButton
                                    aria-label="carrito"
                                    variant='ghost'
                                    color='white'
                                    _hover={{ bgColor: 'white', color: 'gray.800' }}
                                    icon={<FiShoppingCart />}
                                    onClick={() => onRoute('/cart')}
                                />
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
                                        links.map(({ id, text, route }) => (
                                            <Button variant='ghost' width='full' _hover={{ bg: 'green.400', color: 'white' }}
                                                key={id} onClick={() => onRoute(route)}
                                            >
                                                {text}
                                            </Button>
                                        ))
                                    }
                                    <Button
                                        leftIcon={<FiShoppingCart />}
                                        w="full"
                                        colorScheme='green'
                                        onClick={() => onRoute('/cart')}
                                    >
                                        Ver carrito
                                    </Button>
                                    <Button
                                        leftIcon={<FiUser />}
                                        w="full"
                                        colorScheme='blue'
                                        onClick={() => onRoute('/login')}
                                    >
                                        Iniciar sesión
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