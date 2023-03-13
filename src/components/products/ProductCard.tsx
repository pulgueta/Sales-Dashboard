import { FC, useMemo } from 'react'

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Button, ButtonGroup, Card, CardBody, Divider, Heading, HStack, Stack, Tag, Text } from '@chakra-ui/react'
import { ProductInformation } from '@/interfaces';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProductCard: FC<ProductInformation> = ({ image, title, id, description, price, category }): JSX.Element => {
    const memoPrice: string = useMemo(() => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency', currency: 'MXN'
        }).format(price);
    }, [price]).replace('.00', '')

    const navigate = useNavigate();

    const toProduct = () => navigate(`/products/${id}`)

    return (
        <Card maxW={['xs', 'sm']} h='520px' borderRadius='xl'>
            <CardBody>
                <LazyLoadImage
                    src={image}
                    effect='blur'
                    style={{ borderRadius: 12, width: 512, objectFit: 'cover', height: 256 }}
                />
                <Stack spacing='3' my='3'>
                    <HStack alignItems='center' justifyContent='space-between'>
                        <Heading noOfLines={1} size={['lg', 'md', 'lg']}>{title}</Heading>
                        <Text fontSize='xl' fontWeight='medium'>{memoPrice}</Text>
                    </HStack>
                    <Tag width='max-content'>{category}</Tag>
                    <Text noOfLines={2}>{description}</Text>
                </Stack>
                <Divider my={2} />
                <ButtonGroup mt='3' justifyContent='space-between' width='100%'>
                    <Button variant='link' colorScheme='blue' onClick={toProduct}>Ver más</Button>
                    <Button leftIcon={<FaShoppingCart />} colorScheme='purple'>Añadir al carrito</Button>
                </ButtonGroup>
            </CardBody>
        </Card>
    )
}

export default ProductCard;