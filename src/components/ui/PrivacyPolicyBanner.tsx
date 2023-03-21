import { FC } from 'react';

import { Box, CloseButton, Link, Stack, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion';
import { Link as RLink } from 'react-router-dom';

interface PrivacyPolicy {
    show: boolean
}

const PrivacyPolicyBanner: FC<PrivacyPolicy> = ({ show }): JSX.Element => {

    return (
        <Box bg="green.500" color="white" as={motion.div}
            initial={{
                y: 100,
                opacity: 0
            }}
            animate={{
                transition: {
                    duration: 1.05,
                    ease: 'easeInOut',
                },
                y: 0,
                opacity: 1,
                filter: 'blur'
            }}
            p={{ base: '4', md: '3' }} py={{ base: '3', md: '5' }}
            position="fixed" bottom={2} left={['5%', '12.5%']}
            width={['90vw', '75vw']} borderRadius="xl" zIndex={99}
        >
            <Stack
                direction={{ base: 'column', md: 'row' }}
                justify="center"
                spacing={{ base: '0.5', md: '1.5' }}
                pe={{ base: '4', sm: '0' }}
                textAlign='center'
            >
                <Text fontWeight="medium">Al usar nuestra tienda, estás aceptando nuestras políticas de privacidad.</Text>
                <Text color="on-accent-muted">
                    <Link as={RLink} to='/privacy-policy'>Ir a nuestras políticas de privacidad</Link>
                </Text>
            </Stack>
            <CloseButton position="absolute" right="2" top={{ base: '2', md: '4' }} />
        </Box>
    )
}

export default PrivacyPolicyBanner;
