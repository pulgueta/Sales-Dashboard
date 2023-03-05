import { FC, useRef, useState } from 'react'

import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, ButtonGroup, Card, CardBody, Divider, Heading, HStack, Stack, Tag, Text, useDisclosure } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';

import { deleteProduct, priceFormat } from '../../utils';
import { ProductInformation } from '../../interfaces';

const ProductCard: FC<ProductInformation> = ({ image, title, description, price, category, id }): JSX.Element => {

    const [loading, setLoading] = useState<boolean>(false)
    const cancelRef = useRef<any>()

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toProduct = useNavigate();

    const handleToProduct = () => toProduct(`/admin/products/${id}`)

    const handleDelete = async () => {
        setLoading(true)
        await deleteProduct(id, image)
        setLoading(false)
    }

    return (
        <>
            <Card maxW={['xs', 'sm']} borderRadius='xl'>
                <LazyLoadComponent>
                    <CardBody>
                        <LazyLoadImage
                            src={image}
                            effect='blur'
                            style={{ borderRadius: 12, width: 512, objectFit: 'cover', height: 256 }}
                        />
                        <Stack spacing='3' my='3'>
                            <Heading noOfLines={1} size={['lg', 'md', 'lg']}>{title}</Heading>
                            <Text>id: {id}</Text>
                            <Divider />
                            <Tag width='max-content'>{category}</Tag>
                            <Text noOfLines={2}>{description}</Text>
                        </Stack>
                        <HStack alignItems='center' justifyContent='space-between' width='100%' mt={4}>
                            <ButtonGroup spacing={4}>
                                <Button onClick={onOpen} colorScheme='red'>Eliminar</Button>
                                <Button onClick={handleToProduct} variant='link' colorScheme='telegram'>Ver más</Button>
                            </ButtonGroup>
                            <Text fontSize='xl' fontWeight='medium'>{priceFormat(price)}</Text>
                        </HStack>
                    </CardBody>
                </LazyLoadComponent>
            </Card>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                size={['xs', 'sm', 'md', 'lg', 'xl']}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Eliminar producto
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            ¿Seguro que quieres eliminar el producto '{title}'?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                No, cancelar
                            </Button>
                            <Button
                                isLoading={loading}
                                leftIcon={<FaTrash />}
                                colorScheme='red'
                                onClick={handleDelete} ml={3}
                            >
                                Sí, eliminar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default ProductCard;