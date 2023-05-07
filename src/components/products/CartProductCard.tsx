import { FC, useContext } from 'react'

import { Button, Card, CardBody, HStack, IconButton, Image, Tag, Text } from '@chakra-ui/react'
import { FiTrash } from 'react-icons/fi'

import { CartContext } from '@/context/cart'
import { Product } from '@/interfaces'
import { usePrice } from '@/hooks'

const CartProductCard: FC<Product> = (product): JSX.Element => {
    const { addOneToCart, removeOneFromCart, getProductAmount, removeFromCart } = useContext(CartContext)

    const { newPrice } = usePrice(product.price)

    const amount = getProductAmount(product);

    return (
        <Card direction={['column', 'row']} bgColor='gray.50' h={['96', '48']}>
            <Image loading='lazy' src={product.image} alt={product.title} w={['full', '44']} h='48' objectFit='cover' borderLeftRadius='md' />
            <CardBody w={['full', 80, 96]}>
                <Text fontSize='xl' fontWeight={600}>
                    {product.title}
                </Text>
                <Tag my={2} bgColor='gray.200' width='max-content'>{product.category}</Tag>
                <Text fontSize={['xl', 'lg']} fontWeight='medium'>{newPrice}</Text>
                <HStack my={4} w='100%' justifyContent='space-between'>
                    <HStack gap={[0, 1]}>
                        <Button onClick={() => removeOneFromCart(product)} size='sm'>
                            -
                        </Button>
                        <Text>{amount}</Text>
                        <Button onClick={() => addOneToCart(product)} size='sm'>
                            +
                        </Button>
                    </HStack>
                    <IconButton
                        aria-label='delete-icon'
                        onClick={() => removeFromCart(product)}
                        icon={<FiTrash />}
                    />
                </HStack>
            </CardBody>
        </Card>
    )
}
export default CartProductCard