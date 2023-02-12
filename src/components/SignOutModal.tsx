import { FC, useRef } from 'react'

import {
    useDisclosure,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'

import { MdLogout } from 'react-icons/md'

export const SignOutModal: FC = () => {
    const cancelRef = useRef<any>()

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button leftIcon={<MdLogout />} colorScheme='red' onClick={onOpen}>Cerrar sesión</Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                size={['xs', 'sm', 'md', 'lg', 'xl']}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Cerrar sesión
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            ¿Seguro que quieres cerrar sesión?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                No
                            </Button>
                            <Button colorScheme='red' onClick={onClose} ml={3}>
                                Sí
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}