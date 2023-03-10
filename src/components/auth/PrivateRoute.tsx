import { useContext, FC } from 'react'
import { Navigate } from 'react-router-dom'

import { PrivateRouteProps } from '../../types'
import { UserContext } from '../../context/auth'

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {

    const { user } = useContext(UserContext)

    return user ? <>{children}</> : <Navigate to='/login' replace />
}
