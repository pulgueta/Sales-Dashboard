import { FC, useEffect, useRef, useState } from 'react'

import { onAuthStateChanged } from 'firebase/auth'
import { Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Icon, Text, useDisclosure, } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { FaAlignRight } from 'react-icons/fa'

import { auth } from '../../firebase'
import { SignOutModal } from './'

export const Sidebar: FC = (): JSX.Element => {
    const [isUser, setIsUser] = useState<boolean>(false)
    const btnRef = useRef<HTMLButtonElement | any>()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const navigate = useNavigate();

    const handleNavigate = (route: string) => {
        navigate(route)
        onClose()
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsUser(true)
            } else {
                setIsUser(false)
            }
        });
    }, [isUser, isOpen])

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
                            <Button color='black' fontWeight='normal' variant='link' onClick={() => handleNavigate('/admin/add')}>
                                Agregar producto
                            </Button>
                        </Text>
                        <Divider />
                        <Text my={2.5} onClick={onClose}>
                            <Button color='black' fontWeight='normal' variant='link' onClick={() => handleNavigate('/admin/products')}>
                                Productos
                            </Button>
                        </Text>
                        <Divider />
                        <Text my={2.5} onClick={onClose}>
                            <Button color='black' fontWeight='normal' variant='link' onClick={() => handleNavigate('/admin/user')}>
                                Agregar usuario
                            </Button>
                        </Text>
                        <Divider />
                        <Text my={2.5} onClick={onClose}>
                            <Button color='black' fontWeight='normal' variant='link' onClick={() => handleNavigate('/admin/dashboard')}>
                                Ventas
                            </Button>
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