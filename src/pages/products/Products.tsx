import { FC } from 'react'

import { Button, ButtonGroup, Center, HStack, GridItem, Heading, Text, VStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'

import { ProductCard } from '@/components'
import { ProductCardSkeleton } from '@/components/skeleton'
import { ProductInformation } from '@/interfaces'
import { useProducts } from '@/hooks'

const Products: FC = (): JSX.Element => {
    const { handleNextProd, handlePrevProd, loading, more, products } = useProducts();

    return (
        <VStack minH='calc(100vh - 101px)' bgColor='gray.100' p={4}>
            <Helmet>
                <title>Productos</title>
            </Helmet>
            <Heading mt={4}>
                Products
            </Heading>
                <Breadcrumb py={2} pb={4}>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to='/'>Inicio</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to='/products' isCurrentPage>Productos</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            <Center>
                {
                    loading
                        ?
                        <ProductCardSkeleton />
                        :
                        products.length !== 0
                            ?
                            <VStack gap={6}>
                                <HStack wrap='wrap' gap={6} justifyContent='center'>
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
                                </HStack>
                                {
                                    products.length >= 4 && (
                                        <ButtonGroup mt={8}>
                                            <Button onClick={handlePrevProd} colorScheme='blue' leftIcon={<FiArrowLeft size='0.75em' />}>Anterior</Button>
                                            <Button onClick={handleNextProd} colorScheme='green' rightIcon={<FiArrowRight size='0.75em' />}>Siguiente</Button>
                                        </ButtonGroup>
                                    )
                                }
                            </VStack>
                            :
                            <Text fontWeight='medium'>No hay productos 😓</Text>
                }
            </Center>
        </VStack>
    )
}

export default Products