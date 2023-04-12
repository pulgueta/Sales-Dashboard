import { FC } from "react"

import { Button, Card, CardBody, HStack, IconButton, Image, Tag, Text } from "@chakra-ui/react"

import { ProductInformation } from "@/interfaces"
import { usePrice } from "@/hooks"
import { FiTrash } from "react-icons/fi"

const CartProductCard: FC<ProductInformation> = ({ image, price, title, category }): JSX.Element => {
    const { newPrice } = usePrice(price)

    return (
        <Card direction='row' bgColor='gray.50' h='44'>
            <Image loading='lazy' src={image} alt={title} w='36' h='44' objectFit='cover' borderLeftRadius='md' />
            <CardBody w={[48, 80, 96]}>
                <Text fontSize='lg' fontWeight={600}>
                    {title}
                </Text>
                <Tag my={2} bgColor='gray.200' width='max-content'>{category}</Tag>
                <Text fontSize='md' fontWeight='medium'>{newPrice}</Text>
                <HStack mt={4} w='100%' justifyContent='space-between'>
                    <HStack gap={[0, 1]}>
                        <Button size='sm'>
                            -
                        </Button>
                        <Text>3</Text>
                        <Button size='sm'>
                            +
                        </Button>
                    </HStack>
                    <IconButton
                        aria-label='delete-icon'
                        icon={<FiTrash />}
                    />
                </HStack>
            </CardBody>
        </Card>
    )
}
export default CartProductCard