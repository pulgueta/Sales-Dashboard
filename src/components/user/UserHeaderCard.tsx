import { FC } from "react"

import { Avatar, Card, CardBody, CardHeader, HStack, IconButton, Text, Tooltip } from "@chakra-ui/react"

import { UserHeaderCardProps } from "@/interfaces"
import { FiUpload } from "react-icons/fi"

const UserHeaderCard: FC<UserHeaderCardProps> = ({ createdAt, imageURL, name }) => {
    return (
        <Card direction={['column', 'row']} alignItems={['center']} width={['xs', 'md', 'lg', 'lg', 'xl']}>
            <CardHeader>
                <Avatar size='2xl' name={name} src={imageURL} />
                <Tooltip
                    hasArrow
                    label={
                        imageURL === null
                            ?
                            'Subir foto de perfil'
                            :
                            'Cambiar foto de perfil'
                    }
                    placement="bottom"
                >
                    <IconButton
                        position='absolute'
                        top={['28']}
                        left={['44', '28']}
                        rounded='full'
                        aria-label="Subir foto de perfil"
                        icon={<FiUpload />}
                    />
                </Tooltip>
            </CardHeader>
            <CardBody>
                <HStack alignItems='center'>
                    <Text fontSize={[15, 13, 15, 16, 20]} fontWeight={700}>Nombre:</Text>
                    <Text fontSize={[15, 13, 15, 16, 20]} fontWeight={500} noOfLines={1}>{name}</Text>
                </HStack>

                <Text fontSize={12}>Miembro desde: {createdAt}</Text>


            </CardBody>
        </Card>
    )
}
export default UserHeaderCard