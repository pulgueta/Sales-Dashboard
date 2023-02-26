import { FC } from "react"

import { VStack, Spinner as Loader } from "@chakra-ui/react"

export const Spinner: FC = (): JSX.Element => (
    <VStack justifyContent='center' h='100vh' bgColor='gray.200'>
        <Loader size='xl' />
    </VStack>
)