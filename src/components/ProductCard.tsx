import { FC } from 'react'

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Button, ButtonGroup, Card, CardBody, Divider, Heading, Stack, Tag, Text } from '@chakra-ui/react'
import { priceFormat } from '../utils';
import { ProductInformation } from '../interfaces';

const ProductCard: FC<ProductInformation> = ({ image, title, description, price, category }): JSX.Element => (
    <Card maxW={['xs', 'sm']} borderRadius='xl'>
        <CardBody>
            <LazyLoadImage
                src={image}
                effect='blur'
                style={{ borderRadius: 12, width: 512, objectFit: 'cover', height: 256 }}
            />
            <Stack spacing='3' my='3'>
                <Heading noOfLines={1} size={['lg', 'md', 'lg']}>{title}</Heading>
                <Tag width='max-content'>{category}</Tag>
                <Text noOfLines={2}>{description}</Text>
            </Stack>
            <Text fontSize='lg' fontWeight='medium'>{priceFormat(price)}</Text>
            <Divider my={2} />
            <ButtonGroup mt='3'>
                <Button colorScheme='telegram'>Editar</Button>
                <Button colorScheme='red'>Eliminar</Button>
            </ButtonGroup>
        </CardBody>
    </Card>
)

export default ProductCard;