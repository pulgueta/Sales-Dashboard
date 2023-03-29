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
                    size='2xl'
                    name={`${userInformation.name} ${userInformation.fatherSurname} ${userInformation.motherSurname}`}
                    src={userInformation.profilePicture}
                    my={4}
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
                        position='relative'
                        top='-16'
                        left='10'
                        rounded='full'
                        aria-label="Subir foto de perfil"
                        icon={<FiUpload />}
                    />
                </Tooltip>
                <UserPersonalData />
            </VStack>
        </VStack>
    )
}

export default UserInformation