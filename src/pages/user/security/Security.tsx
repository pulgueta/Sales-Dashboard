import { Button, ButtonGroup, Center, FormControl, FormLabel, Heading, Input, Stack, VStack } from "@chakra-ui/react"
import { FC } from "react"

const Security: FC = (): JSX.Element => {
    return (
        <VStack minH='calc(100vh - 64px)' bgColor='gray.100' p={4}>
            <Center bg='white' p={[6, 8]} borderRadius='lg' w={['sm', 'lg', 'xl', '2xl']}>
                <VStack spacing={6} w='full'>
                    <Heading>Seguridad de la cuenta</Heading>
                    <Stack spacing={4} w='full'>
                        <FormControl>
                            <FormLabel>Correo electrónico</FormLabel>
                            <Input />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Contraseña</FormLabel>
                            <Input />
                        </FormControl>
                    </Stack>
                    <ButtonGroup>
                        <Button>Cambiar correo</Button>
                        <Button>Cambiar contraseña</Button>
                    </ButtonGroup>
                </VStack>

            </Center>
        </VStack>
    )
}
export default Security