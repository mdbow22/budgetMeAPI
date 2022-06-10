import React, { useContext, createContext, useState, useEffect } from 'react';
import { checkExpiration, decode, getToken } from '../utils/Auth';

export interface User {
    username: string;
    email: string;
    id: number;
    iat: number;
}

export interface UserContextType {
    user: User | undefined,
    isAuthed: boolean,
    setIsAuthed: React.Dispatch<React.SetStateAction<boolean>>;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const userContext = createContext<UserContextType | null>(null);
export const useUser = () => useContext(userContext)!;

const UserProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User>();
    const [isAuthed, setIsAuthed] = useState(false);

    useEffect(() => {
        const token = getToken();
        const user = decode(token);

        if(user && checkExpiration(user)) {
            setUser(user);
            setIsAuthed(true);
        }
    }, [setUser, setIsAuthed]);


    return (
        <userContext.Provider value = {{user, setUser, isAuthed, setIsAuthed}}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider;