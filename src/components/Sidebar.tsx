import { FC, useRef } from 'react'

import {
    useDisclosure,
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Text,
    Divider
} from '@chakra-ui/react'
import { MdMenu } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { SignOutModal } from './'

export const Sidebar: FC = (): JSX.Element => {
    const btnRef = useRef<HTMLButtonElement | any>()

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button
                ref={btnRef}
                colorScheme='whiteAlpha'
                onClick={onOpen}
            ><MdMenu /></Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>¡Hola, usuario!</DrawerHeader>
                    <DrawerBody>
                        <Text mb={2} onClick={onClose}>
                            <Link to='/add'>
                                Agregar producto
                            </Link>
                        </Text>
                        <Divider />
                        <Text my={2} onClick={onClose}>
                            <Link to='/products'>
                                Productos
                            </Link>
                        </Text>
                        <Divider />
                        <Text my={2} onClick={onClose}>
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