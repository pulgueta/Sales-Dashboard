import { useState, useEffect, FC, ReactNode } from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

import { app } from '../../firebase';
import { UserContext } from "."

type TContextProps = {
  children: ReactNode;
}

export const UserProvider: FC<TContextProps> = ({ children }) => {
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

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};