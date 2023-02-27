import { FC } from 'react'

import { Card, CardBody, Divider, HStack, Skeleton, SkeletonText, Stack } from '@chakra-ui/react'

const ProductCardSkeleton: FC = (): JSX.Element => (
    <Card maxW={['xs', 'sm']} borderRadius='xl'>
        <CardBody>
            <Skeleton height='44' w='64' />
            <Stack spacing='3' my='3'>
                <SkeletonText noOfLines={1} skeletonHeight='8' size='lg' />
                <SkeletonText skeletonHeight='2' noOfLines={5} w='256px' />
            </Stack>
            <Divider />
            <HStack mt='3'>
                <Skeleton height='12' width='24' />
                <Skeleton height='12' width='24' />
            </HStack>
        </CardBody>
    </Card>
)

export default ProductCardSkeleton