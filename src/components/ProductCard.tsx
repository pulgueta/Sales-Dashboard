import { FC } from 'react'

import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import { Button, ButtonGroup, Card, CardBody, Divider, Heading, Stack, Text } from '@chakra-ui/react'

const ProductCard: FC = (): JSX.Element => {
    return (
        <Card maxW={['xs', 'sm', 'md']} borderRadius='xl'>
            <CardBody>
                <LazyLoadComponent>
                    <LazyLoadImage
                        src='https://cdn.akamai.steamstatic.com/steam/apps/1326470/capsule_616x353.jpg?t=1675449555'
                        effect='blur'
                        style={{ borderRadius: 12 }}
                    />
                </LazyLoadComponent>

                <Stack spacing='3' my='3'>
                    <Heading size='lg'>Sons of the Forest</Heading>
                    <Text>ChatGPT is a browser extension that enhance search engines with
                        the power of ChatGPT.
                    </Text>
                </Stack>
                <Divider />
                <ButtonGroup mt='3'>
                    <Button colorScheme='telegram'>Editar</Button>
                    <Button colorScheme='red'>Eliminar</Button>
                </ButtonGroup>
            </CardBody>
        </Card>
    )
}

export default ProductCard