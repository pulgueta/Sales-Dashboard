import { FC } from 'react'

import { ButtonGroup, Center, HStack, IconButton, Image, Stack, Text, } from '@chakra-ui/react'
import { FaInstagram, FaFacebook, FaTwitter, } from 'react-icons/fa'
import { SiMastercard, SiVisa, SiAmericanexpress } from 'react-icons/si'

const Footer: FC = (): JSX.Element => (
    <Stack as="footer" role="contentinfo" py='4' minWidth='100%' bgColor='green.400'>
        <Stack spacing={{ base: '4', md: '5' }}>
            <Stack justify="space-evenly" direction={["column", "row"]} align="center">
                <HStack justifyContent='center'>
                    <Image
                        src={import.meta.env.VITE_ADMIN_LOGIN_IMAGE}
                        alt='Footer Image'
                        objectFit='cover'
                        fallbackSrc='https://via.placeholder.com/256'
                        loading='lazy'
                        width={['64px', '128px']}
                        borderRadius='lg'
                    />
                </HStack>
                <HStack>
                    <Text fontWeight={600}>Síguenos en:</Text>
                    <ButtonGroup variant="ghost" spacing={['2', '3']}>
                        <IconButton
                            as="a"
                            target='_blank'
                            href="https://facebook.com/"
                            aria-label="Facebook"
                            icon={<FaFacebook fontSize='18' />}
                        />
                        <IconButton
                            as="a"
                            href="https://instagram.com/"
                            target='_blank'
                            aria-label="Instagram"
                            icon={<FaInstagram fontSize='18' />}
                        />
                        <IconButton
                            as="a"
                            href="https://twitter.com/"
                            target='_blank'
                            aria-label="Twitter"
                            icon={<FaTwitter fontSize='18' />}
                        />
                    </ButtonGroup>
                </HStack>
            </Stack>
            <Stack direction={['column', 'row']} justifyContent='center' alignItems='center' gap={2}>
                <Text fontSize="sm" color="subtle" textAlign='center'>
                    &copy; {new Date().getFullYear()} Xochicalli Tienda. Todos los derechos reservados.
                </Text>
                <Center gap={4}>
                    <SiVisa fontSize='24' />
                    <SiMastercard fontSize='24' />
                    <SiAmericanexpress fontSize='24' />
                </Center>
            </Stack>
        </Stack>
    </Stack>
)

export default Footer;