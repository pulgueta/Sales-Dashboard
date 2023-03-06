import { createContext } from 'react'

import { User } from 'firebase/auth';

interface IUserContext {
    user: User | null;
}

export const UserContext = createContext<IUserContext>({
    user: null,
});