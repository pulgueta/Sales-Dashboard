import { FC } from 'react'

import { Box, Center, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import ImageSlider from 'react-simple-image-slider';

const images = [
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg'
    },
    {
        url: 'https://www.eatthis.com/wp-content/uploads/sites/4/2020/12/unhealthiest-foods-planet.jpg?quality=82&strip=1'
    },
    {
        url: 'https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-03/plant-based-food-mc-220323-02-273c7b.jpg'
    },
    {
        url: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/processed-food700-350-e6d0f0f.jpg'
    },
    {
        url: 'https://media.socastsrm.com/wordpress/wp-content/blogs.dir/2897/files/2023/02/bad-food.jpg'
    },
]

const Home: FC = (): JSX.Element => {

    return (
        <Box overflow='hidden'>
            <ImageSlider
                width='100%'
                autoPlay
                height={592}
                images={images}
                slideDuration={2}
                showBullets
                showNavs
            />
            <HStack justifyContent='center' py={16} px={[8, 0]} bgColor='green.400'>
                <Center>
                    <VStack>
                        <Heading>
                            Xochicalli Commerce
                        </Heading>
                        <Text fontSize='20px' textAlign='center' fontWeight={600}>Planta tus sueños y que florezcan tus objetivos</Text>
                        <Text fontSize='18px' textAlign='center'>
                            En Xochicalli Commerce nos interesa proporcionar plantas, macetas, fertilizantes y todo tipo de herramientas que le permiten a tus plantas crecer de una forma más fácil y eficaz
                        </Text>
                    </VStack>
                </Center>
            </HStack>
        </Box>
    )
}

export default Home;

