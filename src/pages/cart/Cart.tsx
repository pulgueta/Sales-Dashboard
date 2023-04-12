import { FC, useContext, useId } from 'react'

import { Card, CardBody, CardHeader, Divider, Text, VStack } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'

import { CartContext } from '@/context/cart'
import { CartProductCard } from '@/components/products'

const Cart: FC = (): JSX.Element => {
  const id = useId()

  const { cart } = useContext(CartContext)

  return (
    <VStack minH='calc(100vh - 72px)' bgColor='gray.100' p={4}>
      <Helmet>
        <title>Carrito de compras</title>
      </Helmet>

      <Card w='auto'>
        <CardHeader textAlign='center' fontWeight={700} fontSize='3xl'>
          Carrito
        </CardHeader>
        <CardBody>
          {
            cart.length < 1
              ?
              <Text fontSize='lg'>¡Tu carrito está vacío!</Text>
              :
              cart.map((item, index) => {
                return (
                  <>
                    <CartProductCard
                      id={id}
                      image={item.image}
                      price={item.price}
                      title={item.title}
                      category={item.category}
                    />
                    {index !== cart.length - 1 && <Divider my={4} />}
                  </>
                )
              })
          }
        </CardBody>
      </Card>
    </VStack>

  )
}
export default Cart