import { FC, lazy, useContext } from "react"

import { Avatar, Heading, IconButton, Tooltip, VStack } from "@chakra-ui/react"

import { UserContext } from "@/context/auth"
import { FiUpload } from "react-icons/fi"

const UserPersonalData = lazy(() => import("@/components/user/UserPersonalData"));

const UserInformation: FC = (): JSX.Element => {

    const { userInformation } = useContext(UserContext)

    return (
        <VStack minH='calc(100vh - 64px)' bgColor='gray.100' p={4}>
            <Heading>
                Datos personales
            </Heading>
            <VStack>
                <Avatar
                    loading="lazy"
                    style={{ width: '216px', height: '216px' }}
                    name={`${userInformation.name} ${userInformation.fatherSurname} ${userInformation.motherSurname}`}
                    src={userInformation.profilePicture}
                    mt={4} mb={0}
                />
                <Tooltip
                    hasArrow
                    label={
                        userInformation.profilePicture.length < 1
                            ?
                            'Subir foto de perfil'
                            :
                            'Cambiar foto de perfil'
                    }
                    placement="bottom"
                >
                    <IconButton
                        size='lg'
                        position='relative'
                        top='-12'
                        left='10'
                        rounded='full'
                        colorScheme='blue'
                        aria-label="Subir foto de perfil"
                        icon={<FiUpload />}
                    />
                </Tooltip>
                <UserPersonalData
                    name={userInformation.name}
                    fatherSurname={userInformation.fatherSurname}
                    motherSurname={userInformation.motherSurname}
                    birthday={userInformation.birthday}
                />
            </VStack>
        </VStack>
    )
}

export default UserInformation