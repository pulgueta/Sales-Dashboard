import { FC } from 'react'

import { Button, ButtonGroup, Card, CardBody, Divider, Heading, HStack, Image, Stack, Tag, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

import { usePrice } from '@/hooks';
import { Product } from '@/interfaces';

const ProductCard: FC<Product> = (product): JSX.Element => {
    const navigate = useNavigate();

    const { newPrice } = usePrice(product.price)

    const toProduct = () => navigate(`/products/${product.id}`)

    return (
        <Card maxW={['xs', 'sm']} h='470px' borderRadius='xl'>
            <CardBody>
                <Image
                    src={product.image}
                    alt={`${product.title}-${product.id}`}
                    objectFit='cover'
                    fallbackSrc='https://via.placeholder.com/256'
                    loading='lazy'
                    height={256}
                    width={512}
                    borderRadius='lg'
                />
                <Stack spacing='3' my='3'>
                    <HStack alignItems='center' justifyContent='space-between'>
                        <Heading noOfLines={1} size={['lg', 'md', 'lg']}>{product.title}</Heading>
                        <Text fontSize={['xl', 'xl', '2xl']} fontWeight='medium'>{newPrice}</Text>
                    </HStack>
                    <Tag width='max-content'>{product.category}</Tag>
                    <Text noOfLines={1}>{product.description}</Text>
                </Stack>
                <Divider my={2} />
                <ButtonGroup mt='3' justifyContent='flex-end' width='100%'>
                    <Button variant='link' colorScheme='blue' fontSize={16} onClick={toProduct}>Ver más</Button>
                </ButtonGroup>
            </CardBody>
        </Card>
    )
}

export default ProductCard;