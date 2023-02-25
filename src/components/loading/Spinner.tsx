import { FC } from "react"

import { VStack, Heading, Spinner as Loader } from "@chakra-ui/react"

export const Spinner: FC = (): JSX.Element => (
    <VStack justifyContent='center' h='100vh'>
        <Heading>
            Cargando...
        </Heading>
        <Loader size='lg' />
    </VStack>
)