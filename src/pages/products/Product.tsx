import { FC, useContext, useEffect } from 'react'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Center, Box, Image, VStack, Heading, Stack, Text, Button, Tag, useToast, useMediaQuery, IconButton } from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';

import { CartContext, UserContext } from '@/context';
import { usePrice, useProduct } from '@/hooks';
import { ProductSkeleton } from '@/components/skeleton';
import { Helmet } from 'react-helmet-async';

const Product: FC = (): JSX.Element => {
    const uid = localStorage.getItem('uid')

    const { user } = useContext(UserContext)
    const { addToCart } = useContext(CartContext)

    const toast = useToast();
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')

    const { id } = useParams();
    const navigate = useNavigate();

    const { product, loading } = useProduct(id as string);
    const { newPrice } = usePrice(product?.price as number)

    const addItemToCart = () => {
        if (!user || uid === '') {
            toast({
                status: 'info',
                duration: 1500,
                isClosable: false,
                title: 'Añadir al carrito',
                position: isLargerThan800 ? 'top-right' : 'bottom',
                description: 'Debes iniciar sesión para añadir productos al carrito',
            })
            navigate('/login');
        } else {
            product && addToCart(product)
            toast({
                status: 'success',
                duration: 1000,
                isClosable: false,
                title: 'Añadir al carrito',
                position: isLargerThan800 ? 'top' : 'bottom',
                description: '¡Producto añadido al carrito!',
            })
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <Box minH='calc(100vh - 72px)' bgColor='gray.100' p={4}>
            <Helmet>
                <title>{`Producto: ${product?.title === undefined ? 'Cargando...' : product.title}`}</title>
            </Helmet>
            <Breadcrumb pt={2} pb={6} ml={[0, 0, 16, 24]}>
                <BreadcrumbItem>
                    <IconButton aria-label='back' icon={<FiArrowLeft />} onClick={() => navigate(-1)} />
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to='/'>Inicio</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to='/products'>Productos</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to={`/products/${id}`}>{id}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Center>
                <Box bgColor='white' p={4} borderRadius='lg'>
                    {
                        loading
                            ? <ProductSkeleton />
                            : <Stack direction={['column', 'column', 'row']} gap={[4, 4, 8, 16]} width={[350, 'md', '2xl', '4xl', '6xl']} height='100%'>
                                <Box mx='auto' width={[350, 'full', 1600, 1366]} height='full' bgColor='white' borderRadius='lg' objectFit='cover' boxShadow='base'>
                                    <Image
                                        src={product?.image} alt={product?.title}
                                        width={[350, 'full', 1600, 1366]}
                                        height={500}
                                        mx='auto' objectFit='cover'
                                        borderRadius='lg' loading='lazy'
                                    />
                                </Box>
                                <VStack justifyContent='space-between' boxShadow='base' py={2} px={6} borderRadius='lg' minHeight='full'>
                                    <Box>
                                        <Heading textShadow='base' textAlign='center' py={4}>{product?.title}</Heading>
                                        <Tag mb={4}>Categoría: {product?.category}</Tag>
                                        <Text>{product?.description}</Text>
                                        <Text fontWeight={500} fontSize='lg' mt={4}>En stock: {product?.stock && product.stock > 1 ? '\u2705' : '\u274C'}</Text>
                                    </Box>
                                    <Stack
                                        direction={['row', 'row', 'column']}
                                        gap={4} py={4}
                                        alignItems={['center', 'center', 'flex-start']}
                                        justifyContent='space-around'
                                        width='full'
                                    >
                                        <Text fontSize={['xl', 'xl', '2xl']} fontWeight={600} border='1px solid' borderColor='gray.200' py={2} px={4} borderRadius='lg'>{newPrice}</Text>
                                        <Button
                                            onClick={addItemToCart}
                                            leftIcon={<FiShoppingCart />}
                                            colorScheme='purple'
                                            isDisabled={!product?.stock}
                                            variant={product?.stock && product.stock > 1 ? 'solid' : 'outline'}
                                            size={['md', 'md', 'lg']}
                                        >Añadir al carrito</Button>
                                    </Stack>
                                </VStack>
                            </Stack>
                    }
                </Box>
            </Center>
        </Box>
    )
}

export default Product;