import { FC } from 'react'

import { ButtonGroup, Center, Divider, HStack, IconButton, Stack, Text, } from '@chakra-ui/react'
import { FaInstagram, FaFacebook, FaTwitter, } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Footer: FC = (): JSX.Element => (
    <Center as="footer" role="contentinfo" py={['4', '8']} width='100vw'>
        <Stack spacing={{ base: '4', md: '5' }}>
            <Stack justify="space-between" direction="row" align="center">
                <HStack justifyContent='center'>
                    <LazyLoadImage
                        src={import.meta.env.VITE_ADMIN_LOGIN_IMAGE}
                        width='128px'
                        style={{ margin: '8px auto' }}
                        effect='blur'
                    />
                </HStack>
                <Divider orientation='vertical' />
                <ButtonGroup variant="ghost">
                    <IconButton
                        as="a"
                        target='_blank'
                        href="https://facebook.com/"
                        aria-label="Facebook"
                        icon={<FaFacebook fontSize="1.25rem" />}
                    />
                    <IconButton
                        as="a"
                        href="https://instagram.com/"
                        target='_blank'
                        aria-label="Instagram"
                        icon={<FaInstagram fontSize="1.25rem" />}
                    />
                    <IconButton
                        as="a"
                        href="https://twitter.com/"
                        target='_blank'
                        aria-label="Twitter"
                        icon={<FaTwitter fontSize="1.25rem" />}
                    />
                </ButtonGroup>
            </Stack>
            <Text fontSize="sm" color="subtle" textAlign='center'>
                &copy; {new Date().getFullYear()} Xochicalli Tienda. Todos los derechos reservados.
            </Text>
        </Stack>
    </Center>
)

export default Footer;