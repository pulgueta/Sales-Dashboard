import { FC, useMemo } from 'react'

import { Button, ButtonGroup, Flex, HStack, Img, Text, VStack } from "@chakra-ui/react"

import { ProductInformation } from '@/interfaces'

export const DrawerCard: FC<ProductInformation> = ({ title, description, image, price }): JSX.Element => {
    const memoPrice: string = useMemo(() => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency', currency: 'MXN'
        }).format(price);
    }, [price])

    return (
        <Flex border='1px' rounded='lg' borderColor='gray.200' p={4} gap={4} mb={4}>
            <Img
                src={image}
                rounded='md'
                maxW={32}
                loading='lazy'
            />
            <VStack alignItems='flex-start'>
                <HStack alignItems='center' justifyContent='space-between' width='100%'>
                    <Text fontWeight={700} fontSize={24}>{title}</Text>
                    <Text fontWeight={600}>
                        {memoPrice.replace('.00', '')}
                    </Text>
                </HStack>
                <Text noOfLines={2}>{description}</Text>
                <ButtonGroup justifyContent='flex-end' width='100%'>
                    <Button variant='link' colorScheme='blue'>Ver más</Button>
                </ButtonGroup>
            </VStack>
        </Flex>
    )
}