import { FC, useRef } from 'react'

import { Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Icon, Text, useDisclosure, } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaAlignRight } from 'react-icons/fa'

import { SignOutModal } from './'

export const Sidebar: FC = (): JSX.Element => {
    const btnRef = useRef<HTMLButtonElement | any>()

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button ref={btnRef} colorScheme='whiteAlpha' onClick={onOpen}><Icon as={FaAlignRight} /></Button>
            <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>¡Hola, usuario!</DrawerHeader>
                    <DrawerBody>
                        <Text mb={2.5} onClick={onClose}>
                            <Link to='/add'>
                                Agregar producto
                            </Link>
                        </Text>
                        <Divider />
                        <Text my={2.5} onClick={onClose}>
                            <Link to='/products'>
                                Productos
                            </Link>
                        </Text>
                        <Divider />
                        <Text my={2.5} onClick={onClose}>
                            <Link to='/user'>
                                Agregar usuario
                            </Link>
                        </Text>
                        <Divider />
                        <Text my={2.5} onClick={onClose}>
                            <Link to='/dashboard'>
                                Ventas
                            </Link>
                        </Text>
                    </DrawerBody>
                    <DrawerFooter>
                        <SignOutModal />
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}