import { useState, useEffect, FC } from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

import { ContextProps } from '@/types';
import { app } from '@/firebase';
import { UserContext } from "."

export const UserProvider: FC<ContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const AUTH = getAuth(app);

    const unsubscribe = onAuthStateChanged(AUTH, (activeUser) => {
      if (activeUser) {
        setUser(activeUser);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  });

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>);
};