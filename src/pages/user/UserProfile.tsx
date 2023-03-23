import { useEffect } from 'react'

import { Box } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { queryUser } from '@/utils/firebase'

const UserProfile = () => {

    const { uid } = useParams();


    useEffect(() => {
        const getUserData = async () => {
            const user = await queryUser(uid)

            console.log(user);
        }

        getUserData()
    }, [uid])

    return (
        <Box>

        </Box>
    )
}

export default UserProfile