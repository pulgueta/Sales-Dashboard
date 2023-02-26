import { FC, useEffect, useState } from 'react'

import { Heading, VStack } from '@chakra-ui/react'

import { ProductCard } from '../../components'
import { ProductCardSkeleton } from '../../components/skeleton'
import { LazyLoadComponent } from 'react-lazy-load-image-component'

const Products: FC = (): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [loading])

    return (
        <VStack h='calc(100vh - 64px)' bgColor='gray.200'>
            <Heading my={8}>
                Products
            </Heading>
            {
                loading
                    ?
                    <ProductCardSkeleton />
                    :
                    <LazyLoadComponent>
                        <ProductCard />
                    </LazyLoadComponent>
            }
        </VStack>
    )
}

export default Products