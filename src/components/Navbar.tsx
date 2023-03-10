import { FC } from "react";

import { Box, Button, CloseButton, Flex, Heading, HStack, IconButton, Link, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { FaAlignRight, FaUser } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";

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
                isInLogin !== '/login' &&

                <Heading bgColor='green.500' w="full" px={{ base: 2, sm: 4, }} py={4} shadow="md">
                    <Flex alignItems="center" justifyContent="space-between" mx="auto">
                        <Link to="/" title="Xochicalli Commerce - Inicio" as={RouterLink}>
                            <Text fontWeight="bold" ml={["2", "2", "0"]} color='gray.100' textDecoration='none'>
                                Xochicalli Plantas
                            </Text>
                        </Link>
                        <HStack display="flex" alignItems="center" spacing={1}>
                            <HStack spacing={[1, 1, 2, 4]} mr={1} color="brand.500" display={["none", "none", "inline-flex"]}>
                                {
                                    links.map(({ id, text, route }) => (
                                        <Button color='white' variant='ghost' _hover={{ bg: 'gray.200', color: 'gray.800' }}
                                            key={id} onClick={() => onRoute(route)}
                                        >
                                            {text}
                                        </Button>
                                    ))
                                }
                                <Button colorScheme='blue' leftIcon={<FaUser />}
                                    onClick={() => onRoute('/login')}
                                >Iniciar sesión</Button>
                            </HStack>
                            <Box display={["inline-flex", "inline-flex", "none"]}>
                                <IconButton display={["flex", "flex", "none"]} aria-label="Open menu" fontSize="20px"
                                    color="gray.800" variant="ghost"
                                    icon={<FaAlignRight />}
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
                                    <Button leftIcon={<FaUser />} w="full" colorScheme='blue'>
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