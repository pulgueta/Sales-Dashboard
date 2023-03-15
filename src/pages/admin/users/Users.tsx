import {
    Box, Checkbox, HStack, Icon, IconButton,
    Table, TableProps, Tbody, Td, Text, Th, Thead, Tr,
    StackProps, useColorModeValue, Container, Stack, ButtonGroup, Button, useBreakpointValue
} from '@chakra-ui/react'
import { FiEdit2, FiTrash2, FiStar } from 'react-icons/fi'
import { IoArrowDown } from 'react-icons/io5'

const Users = (props: TableProps) => {
    const isMobile = useBreakpointValue({ base: true, md: false })

    return (
        <Container py={{ base: '4', md: '8' }} px={{ base: '0', md: 8 }}>
            <Box
                bg="bg-surface"
                boxShadow={{ base: 'none', md: 'sm' }}
                borderRadius={{ base: 'none', md: 'lg' }}
            >
                <Stack spacing="5">
                    <Box px={{ base: '4', md: '6' }} pt="5">
                        <Stack direction={{ base: 'column', md: 'row' }} justify="space-between">
                            <Text fontSize="lg" fontWeight="medium">
                                Usuarios
                            </Text>
                        </Stack>
                    </Box>
                    <Box overflowX="auto">
                        <Table {...props}>
                            <Thead>
                                <Tr>
                                    <Th>
                                        <HStack spacing="3">
                                            <Checkbox />
                                            <HStack spacing="1">
                                                <Text>Nombre</Text>
                                                <Icon as={IoArrowDown} color="muted" boxSize="4" />
                                            </HStack>
                                        </HStack>
                                    </Th>
                                    <Th>Email</Th>
                                    <Th>Role</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {members.map((member) => (
                                    <Tr key={member.id}>
                                        <Td>
                                            <HStack spacing="3">
                                                <Checkbox />
                                                <Box>
                                                    <Text fontWeight="medium">{member.name}</Text>
                                                </Box>
                                            </HStack>
                                        </Td>
                                        <Td>
                                            <Text color="muted">{member.email}</Text>
                                        </Td>
                                        <Td>
                                            <Text color="muted">{member.role}</Text>
                                        </Td>
                                        <Td>
                                            <HStack spacing="1">
                                                <IconButton
                                                    icon={<FiTrash2 fontSize="1.25rem" />}
                                                    variant="ghost"
                                                    aria-label="Delete member"
                                                />
                                                <IconButton
                                                    icon={<FiEdit2 fontSize="1.25rem" />}
                                                    variant="ghost"
                                                    aria-label="Edit member"
                                                />
                                            </HStack>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                    <Box px={{ base: '4', md: '6' }} pb="5">
                        <HStack spacing="3" justify="space-between">
                            {!isMobile && (
                                <Text color="muted" fontSize="sm">
                                    Showing 1 to 5 of 42 results
                                </Text>
                            )}
                            <ButtonGroup
                                spacing="3"
                                justifyContent="space-between"
                                width={{ base: 'full', md: 'auto' }}
                                variant="secondary"
                            >
                                <Button>Previous</Button>
                                <Button>Next</Button>
                            </ButtonGroup>
                        </HStack>
                    </Box>
                </Stack>
            </Box>
        </Container>
    )
}




export default Users;

export const members = [
    {
        id: '1',
        name: 'Christian Nwamba',
        handle: '@christian',
        email: 'christian@chakra-ui.com',
        avatarUrl: 'https://bit.ly/code-beast',
        status: 'active',
        role: 'Senior Developer Advocate',
        rating: 4,
    },
    {
        id: '2',
        name: 'Kent C. Dodds',
        handle: '@kent',
        email: 'kent@chakra-ui.com',
        avatarUrl: 'https://bit.ly/kent-c-dodds',
        status: 'active',
        role: 'Director of DX',
        rating: 4,
    },
    {
        id: '3',
        name: 'Prosper Otemuyiwa',
        handle: '@prosper',
        email: 'prosper@chakra-ui.com',
        avatarUrl: 'https://bit.ly/prosper-baba',
        status: 'active',
        role: 'Director of Evangelism',
        rating: 4,
    },
    {
        id: '4',
        name: 'Ryan Florence',
        handle: '@ryan',
        email: 'ryan@chakra-ui.com',
        avatarUrl: 'https://bit.ly/ryan-florence',
        status: 'active',
        role: 'Co-Founder',
        rating: 4,
    },
    {
        id: '5',
        name: 'Segun Adebayo',
        handle: '@segun',
        email: 'segun@chakra-ui.com',
        avatarUrl: 'https://bit.ly/sage-adebayo',
        status: 'active',
        role: 'Frontend UI Engineer',
        rating: 4,
    },
]

interface Props {
    defaultValue?: number
    max?: number
    size?: 'sm' | 'md' | 'lg' | 'xl'
    rootProps?: StackProps
}

export const Rating = (props: Props) => {
    const { defaultValue = 0, max = 5, size = 'md', rootProps } = props
    const color = useColorModeValue('gray.200', 'gray.600')
    const activeColor = useColorModeValue('blue.500', 'blue.200')
    return (
        <HStack spacing="0.5" {...rootProps}>
            {Array.from({ length: max })
                .map((_, index) => index + 1)
                .map((index) => (
                    <Icon
                        key={index}
                        as={FiStar}
                        fontSize={size}
                        color={index <= defaultValue ? activeColor : color}
                    />
                ))}
        </HStack>
    )
}