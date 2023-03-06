import { useContext, ReactNode, FC } from 'react'
import { Navigate } from 'react-router-dom'

import { UserContext } from '../../context/auth'

type TPrivateRoute = {
    children: ReactNode;
}

export const PrivateRoute: FC<TPrivateRoute> = ({ children }) => {

    const { user } = useContext(UserContext)

    return user ? <>{children}</> : <Navigate to='/login' replace />
}
