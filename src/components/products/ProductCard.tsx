import { FC } from 'react'

import { Button, ButtonGroup, Card, CardBody, Divider, Heading, HStack, Image, Stack, Tag, Text } from '@chakra-ui/react'
import { ProductInformation } from '@/interfaces';
import { FiShoppingCart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { usePrice } from '@/hooks';

const ProductCard: FC<ProductInformation> = ({ image, title, id, description, price, category }): JSX.Element => {
    const { newPrice } = usePrice(price)

    const navigate = useNavigate();

    const toProduct = () => navigate(`/products/${id}`)

    return (
        <Card maxW={['xs', 'sm']} h='490px' borderRadius='xl'>
            <CardBody>
                <Image
                    src={image}
                    alt={`${title}-${id}`}
                    objectFit='cover'
                    fallbackSrc='https://via.placeholder.com/256'
                    loading='lazy'
                    height={256}
                    width={512}
                    borderRadius='lg'
                />
                <Stack spacing='3' my='3'>
                    <HStack alignItems='center' justifyContent='space-between'>
                        <Heading noOfLines={1} size={['lg', 'md', 'lg']}>{title}</Heading>
                        <Text fontSize='xl' fontWeight='medium'>{newPrice}</Text>
                    </HStack>
                    <Tag width='max-content'>{category}</Tag>
                    <Text noOfLines={1}>{description}</Text>
                </Stack>
                <Divider my={2} />
                <ButtonGroup mt='3' justifyContent='space-between' width='100%'>
                    <Button variant='link' colorScheme='blue' onClick={toProduct}>Ver más</Button>
                    <Button leftIcon={<FiShoppingCart />} colorScheme='purple'>Añadir al carrito</Button>
                </ButtonGroup>
            </CardBody>
        </Card>
    )
}

export default ProductCard;