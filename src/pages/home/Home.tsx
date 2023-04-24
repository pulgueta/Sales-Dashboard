import { FC, useState } from 'react'

import { Box, Center, CloseButton, Heading, HStack, Link, Stack, Text, VStack } from '@chakra-ui/react'
import { Link as RLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ImageSlider from 'react-simple-image-slider';
import { motion } from 'framer-motion';

const images = [
    {
        url: import.meta.env.VITE_B1
    },
    {
        url: import.meta.env.VITE_B2
    },
    {
        url: import.meta.env.VITE_B3
    },
    {
        url: import.meta.env.VITE_B4
    },
    {
        url: import.meta.env.VITE_B5
    },
    {
        url: import.meta.env.VITE_B6
    },
    {
        url: import.meta.env.VITE_B7
    },
    {
        url: import.meta.env.VITE_B8
    },
]

const Home: FC = (): JSX.Element => {

    const [closeBanner, setCloseBanner] = useState<boolean>(true)

    return (
        <Box overflowX='hidden'>
            <Helmet>
                <title>Xochicalli Commerce</title>
            </Helmet>
            <ImageSlider width='100%' height={592} autoPlay images={images} slideDuration={1} showBullets showNavs />
            <HStack justifyContent='center' py={28} px={[8, 0]} bgGradient='linear(to-b, white, gray.100)'>
                <Center>
                    <VStack>
                        <Heading fontSize={[32, 48]}>
                            Xochicalli Commerce
                        </Heading>
                        <Text fontSize={[20, 24]} py={6} textAlign='center' fontWeight={600}>Planta tus sueños y que florezcan tus objetivos</Text>
                        <Text fontSize='18px' textAlign='center'>
                            En Xochicalli Commerce nos interesa proporcionar plantas, macetas, fertilizantes y todo tipo de herramientas que le permiten a tus plantas crecer de una forma más fácil y eficaz
                        </Text>
                    </VStack>
                </Center>
            </HStack>
            {
                closeBanner &&
                <Box bg="green.500" color="white" as={motion.div}
                    initial={{
                        y: 100,
                        opacity: 0
                    }}
                    animate={{
                        transition: {
                            duration: 1.05,
                            ease: 'easeInOut',
                        },
                        y: 0,
                        opacity: 1,
                        filter: 'blur'
                    }}
                    p={{ base: '4', md: '3' }} py={{ base: '3', md: '5' }}
                    position="fixed" bottom={2} left={['5%', '12.5%']}
                    width={['90vw', '75vw']} borderRadius="xl" zIndex={999}
                >
                    <Stack
                        direction={{ base: 'column', md: 'row' }}
                        justify="center"
                        spacing={{ base: '0.5', md: '1.5' }}
                        pe={{ base: '4', sm: '0' }}
                        textAlign='center'
                    >
                        <Text fontWeight="medium">Al usar nuestra tienda, estás aceptando nuestras políticas de privacidad.</Text>
                        <Text color="on-accent-muted">
                            <Link as={RLink} to='/privacy-policy'>Ir a nuestras políticas de privacidad</Link>
                        </Text>
                    </Stack>
                    <CloseButton onClick={() => setCloseBanner(!closeBanner)} position="absolute" right="2" top={{ base: '2', md: '4' }} />
                </Box>
            }
        </Box>
    )
}

export default Home;

