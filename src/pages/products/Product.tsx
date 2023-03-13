import { FC } from 'react'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Center, Box } from '@chakra-ui/react';

import { useProduct } from '@/hooks';

import { Link, useParams } from 'react-router-dom';

const Product: FC = (): JSX.Element => {

    const { id } = useParams();
    console.log(id);

    const { product } = useProduct(id);

    console.log(product);

    return (
        <Box minH=' calc(100vh - 75px)' bgColor='gray.100' p={4}>
            <Breadcrumb py={2} pb={4}>
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
            </Center>
        </Box>
    )
}

export default Product;