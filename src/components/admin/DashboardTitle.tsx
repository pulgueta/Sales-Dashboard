import { FC } from 'react'

import { Box, Heading } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

export const DashboardTitle: FC = (): JSX.Element => {
    return (
        <Box h='64px' bgColor='gray.200' py={2}>
            <Heading textAlign='center'>Panel</Heading>
            <Outlet />
        </Box>
    )
}
