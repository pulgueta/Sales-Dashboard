import { FC, useEffect, useState } from 'react'

import { Center, Container, Grid, GridItem, Heading, Text, VStack } from '@chakra-ui/react'
import { LazyLoadComponent } from 'react-lazy-load-image-component'

import { ProductCard } from '../../../components/admin'
import { ProductCardSkeleton } from '../../../components/skeleton'
import { getProducts } from '../../../utils'
import { ProductInformation } from '../../../interfaces'

const Products: FC = (): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(true)
    const [products, setProducts] = useState<any>([{
        title: '',
        price: 0,
        description: '',
        image: '',
        category: '',
    }])

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts()
            setProducts(data)
            setLoading(false)
        }

        fetchProducts()
    }, [])

    return (
        <VStack minH='calc(100vh - 115px)' bgColor='gray.200'>
            <Heading my={8}>
                Productos
            </Heading>
            <Container maxW={['container.xl', '90vw']}>
                <Center>
                    {
                        loading
                            ?
                            <ProductCardSkeleton />
                            :
                            products.length === 0
                                ?
                                <Text fontWeight='medium'>No hay productos 😓</Text>
                                :
                                <Grid gap={6} templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)', 'repeat(2, 1fr)']}>
                                    <LazyLoadComponent>
                                        {products.map((product: ProductInformation) => {
                                            return (
                                                <GridItem key={product.image}>
                                                    <ProductCard
                                                        category={product.category}
                                                        description={product.description}
                                                        image={product.image}
                                                        price={product.price}
                                                        title={product.title}
                                                    />
                                                </GridItem>
                                            )
                                        })}
                                    </LazyLoadComponent>
                                </Grid>
                    }
                </Center>
            </Container>
        </VStack>
    )
}

export default Products