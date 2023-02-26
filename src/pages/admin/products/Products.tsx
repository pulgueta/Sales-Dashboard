import { FC, useEffect, useState } from 'react'

import { Center, Container, Grid, GridItem, Heading, VStack } from '@chakra-ui/react'

import { ProductCard } from '../../../components/admin'
import { ProductCardSkeleton } from '../../../components/skeleton'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
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
        const ara = async () => {
            const data = await getProducts()
            setProducts(data)
            setLoading(false)
        }

        ara()

    }, [loading, products])

    return (
        <VStack minH='calc(100vh - 64px)' bgColor='gray.200'>
            <Heading my={8}>
                Products
            </Heading>
            <Container maxW={['container.xl', '90vw']}>
                <Center>
                    {
                        loading
                            ?
                            <ProductCardSkeleton />
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