import { FC, lazy } from 'react'

import { Center, GridItem, Heading, Text, VStack, Grid, ButtonGroup, Button } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import { ProductCardSkeleton } from '@/components/skeleton'
import { ProductInformation } from '@/interfaces'
import { useProducts } from '@/hooks'

const ProductCard = lazy(() => import('@/components/products/ProductCard'))

const Products: FC = (): JSX.Element => {
    const { handleNextProd, handlePrevProd, loading, more, products } = useProducts(); 

    return (
        <VStack minH='calc(100vh - 115px)' bgColor='gray.200' p={4}>
            <Helmet>
                <title>Productos</title>
            </Helmet>
            <Heading my={8}>
                Productos
            </Heading>
            <Center>
                {
                    loading
                        ?
                        <ProductCardSkeleton />
                        :
                        products.length !== 0
                            ?
                            <VStack gap={6}>
                                <Grid
                                    gap={6}
                                    templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
                                >
                                    {products.slice(more - 3, more).map(({ category, description, id, image, price, title }: ProductInformation) => {
                                        return (
                                            <GridItem key={id}>
                                                <ProductCard
                                                    id={id}
                                                    category={category}
                                                    description={description}
                                                    image={image}
                                                    price={price}
                                                    title={title}
                                                />
                                            </GridItem>
                                        )
                                    })}
                                </Grid>
                                {
                                    products.length >= 4 && (
                                        <ButtonGroup mt={8}>
                                            <Button onClick={handlePrevProd} colorScheme='blue' leftIcon={<FaArrowLeft size='0.75em' />}>Anterior</Button>
                                            <Button onClick={handleNextProd} colorScheme='green' rightIcon={<FaArrowRight size='0.75em' />}>Siguiente</Button>
                                        </ButtonGroup>
                                    )
                                }
                            </VStack>
                            :
                            <Text fontWeight='medium'>No hay productos ????</Text>
                }
            </Center>
        </VStack>
    )
}

export default Products