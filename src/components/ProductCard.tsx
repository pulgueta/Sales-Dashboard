import { FC } from 'react'

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Button, ButtonGroup, Card, CardBody, Divider, Heading, Stack, Tag, Text } from '@chakra-ui/react'
import { priceFormat } from '../utils';

const ProductCard: FC = (): JSX.Element => {
    return (
        <Card maxW={['xs', 'sm', 'md']} borderRadius='xl'>
            <CardBody>
                <LazyLoadImage
                    src='https://cdn.akamai.steamstatic.com/steam/apps/1326470/capsule_616x353.jpg?t=1675449555'
                    effect='blur'
                    style={{ borderRadius: 12 }}
                />
                <Stack spacing='3' my='2'>
                    <Heading size='lg'>Sons of the Forest</Heading>
                    <Tag width='max-content'>Sample Tag</Tag>
                    <Text>ChatGPT is a browser extension that enhance search engines with
                        the power of ChatGPT.
                    </Text>
                </Stack>
                <Text fontSize='lg' fontWeight='medium' my={1}>{priceFormat(5600)}</Text>
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