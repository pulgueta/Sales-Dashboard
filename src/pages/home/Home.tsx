import { FC, lazy } from 'react'

import { Box, Center, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import ImageSlider from 'react-simple-image-slider';
import { Helmet } from 'react-helmet-async';

const Footer = lazy(() => import('@/components/Footer'))
const PrivacyPolicyBanner = lazy(() => import('@/components/ui/PrivacyPolicyBanner'))

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

    // const [closeBanner, setCloseBanner] = useState<boolean>(true)

    const closeBanner = true

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
            <PrivacyPolicyBanner show={closeBanner} />
            <Footer />
        </Box>
    )
}

export default Home;

