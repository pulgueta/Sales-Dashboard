import { FC } from 'react'

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Button, ButtonGroup, Card, CardBody, Divider, Heading, Stack, Text } from '@chakra-ui/react'
import { priceFormat } from '../../utils';
import { ProductInformation } from '../../interfaces';

const ProductCard: FC<ProductInformation> = ({ image, title, description, price }): JSX.Element => {
    return (
        <Card maxW={['xs', 'sm', 'md']} borderRadius='xl'>
            <CardBody>
                <LazyLoadImage
                    src={image}
                    effect='blur'
                    style={{ borderRadius: 12 }}
                />
                <Stack spacing='3' my='3'>
                    <Heading size='lg'>{title}</Heading>
                    <Text>{description}</Text>
                </Stack>
                <Text fontSize='lg' fontWeight='medium'>{priceFormat(price)}</Text>
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