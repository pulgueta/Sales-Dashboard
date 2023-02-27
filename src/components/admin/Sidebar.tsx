import { FC, useEffect, useRef, useState } from 'react'

import { onAuthStateChanged } from 'firebase/auth'
import { Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Icon, Text, useDisclosure, } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaAlignRight } from 'react-icons/fa'

import { auth } from '../../firebase'
import { SignOutModal } from './'

export const Sidebar: FC = (): JSX.Element => {
    const [isUser, setIsUser] = useState<boolean>(false)
    const btnRef = useRef<HTMLButtonElement | any>()

    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsUser(true)
            } else {
                setIsUser(false)
            }
        });
    }, [isUser])

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
                            <Link to='/admin/add'>
                                Agregar producto
                            </Link>
                        </Text>
                        <Divider />
                        <Text my={2.5} onClick={onClose}>
                            <Link to='/admin/products'>
                                Productos
                            </Link>
                        </Text>
                        <Divider />
                        <Text my={2.5} onClick={onClose}>
                            <Link to='/admin/user'>
                                Agregar usuario
                            </Link>
                        </Text>
                        <Divider />
                        <Text my={2.5} onClick={onClose}>
                            <Link to='/admin/dashboard'>
                                Ventas
                            </Link>
                        </Text>
                    </DrawerBody>
                    {
                        isUser && (
                            <DrawerFooter>
                                <SignOutModal />
                            </DrawerFooter>
                        )
                    }
                </DrawerContent>
            </Drawer>
        </>
    )
}