import { createContext, ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import { inputsProps } from '../pages/Login';

export interface CurrentUserProps {
    username: string;
    email: string;
    id: number;
    img: string | null;
};

export interface AuthContextProps {
    setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserProps | null>>;
    currentUser: CurrentUserProps | null,
    login: (inputs: inputsProps) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthContextProviderProps {
    children: ReactNode;
};

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({children}) => {
    const storedUser = localStorage.getItem('user');
    const [currentUser, setCurrentUser] = useState<CurrentUserProps | null>(storedUser ? JSON.parse(storedUser) : null);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser])

    const login = async (inputs: inputsProps) => {
        const res = await axios.post('/api/auth/login', inputs);
        setCurrentUser(res.data);
    };
    const logout = async () => {
        await axios.post('/api/auth/logout');
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{
            setCurrentUser,
            currentUser,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
};