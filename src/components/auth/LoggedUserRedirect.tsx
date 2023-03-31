import { FC, lazy, useContext } from "react"

import { UserContext } from "@/context/auth"
import { Navigate } from "react-router-dom";

const Login = lazy(() => import('@/pages/auth/Login'))

const LoggedUserRedirect: FC = (): JSX.Element => {

    const { user, userRole } = useContext(UserContext)

    if (user && userRole) {
        if (userRole === 'user') return <Navigate to={`/user/profile/${user?.uid}`} replace />
        if (userRole === 'admin') return <Navigate to='/admin/products' replace />
        if (userRole === 'moderator') return <Navigate to='/moderator/' replace />
    }

    return <Login />
}

export default LoggedUserRedirect