import { ChangeEvent, FC, useRef, useState } from 'react'

import { Button, ButtonGroup, Center, Spinner, Heading, Text, VStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Input, InputGroup, InputLeftAddon, InputRightAddon, GridItem, Grid, CheckboxGroup, Checkbox, Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight, FiSearch, FiX } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'

import { ProductCard } from '@/components'
import { ProductInformation } from '@/interfaces'
import { useProducts } from '@/hooks'

const Products: FC = (): JSX.Element => {
    const { handleNextProd, handlePrevProd, loading, products } = useProducts();

    const [query, setQuery] = useState<string>('')
    const searchInput = useRef<HTMLInputElement>(null)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])

    const filteredProducts = products.filter(({ title, category }: ProductInformation) => {
        const matchesQuery = title?.toLowerCase().includes(query.toLowerCase())
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category)

        return matchesQuery && matchesCategory
    })

    const handleCategoryChange = (categories: string[]) => setSelectedCategories(categories)

    const onSearchInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { value } = target
        setQuery(value);
    };

    const onClearInput = () => {
        if (searchInput.current) {
            searchInput.current.value = ''
            setQuery('')
        }
    }

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
                        <Spinner size='xl' mt={4} />
                        :
                        products.length !== 0
                            ?
                            <VStack gap={6}>
                                <InputGroup width={['xs', 'sm']}>
                                    <InputLeftAddon bgColor='gray.200' children={<FiSearch />} />
                                    <Input ref={searchInput} type='text' onChange={onSearchInputChange} bgColor='white' placeholder='Planta...' />
                                    <InputRightAddon cursor='pointer' bgColor='gray.200' onClick={onClearInput} children={<FiX />} />
                                </InputGroup>
                                <CheckboxGroup colorScheme='green' onChange={handleCategoryChange}>
                                    <Flex pl={[8, 8, 0]} direction={['column', 'column', 'row']} gap={4} justifyContent={['flex-start', 'flex-start', 'center']} w='100%'>
                                        <Checkbox value='Macetas'>Macetas</Checkbox>
                                        <Checkbox value='Abonos'>Abonos</Checkbox>
                                        <Checkbox value='Plantas'>Plantas</Checkbox>
                                        <Checkbox value='Fertilizantes'>Fertilizantes</Checkbox>
                                        <Checkbox value='Herramientas'>Herramientas</Checkbox>
                                    </Flex>
                                </CheckboxGroup>
                                <Grid height='100%' templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} templateRows="repeat(4, 1fr)" gap={6}>
                                    {filteredProducts && filteredProducts.map(({ category, description, id, image, price, title }: ProductInformation) => {
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
                                        );
                                    }
                                    )}
                                </Grid>
                                {
                                    products.length >= 6 && (
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