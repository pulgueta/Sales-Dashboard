import { useState, useEffect, FC } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth';

import { ContextProps } from '@/types';
import { auth } from '@/firebase';
import { UserContext } from "."
import { queryUser } from '@/utils';
import { DocumentData } from 'firebase/firestore';

export const UserProvider: FC<ContextProps> = ({ children }) => {
  const [userRole, setUserRole] = useState<string>('')
  const [user, setUser] = useState<User | null>(null);
  const [userInformation, setUserInformation] = useState<DocumentData | undefined>({})

  useEffect(() => {
    const getUserRole = async () => {
      const userData = await queryUser(user?.uid)
      if (userData && userData.role) {
        setUserInformation(userData)
        setUserRole(userData.role)
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (activeUser) => {
      if (activeUser) {
        setUser(activeUser);
      } else {
        setUser(null);
      }
    });

    getUserRole()

    return unsubscribe;
  }, [user?.uid]);

  return (
    <UserContext.Provider value={{ user, userRole, userInformation }}>
      {children}
    </UserContext.Provider>);
};