import jwt_decode from 'jwt-decode';
import { User } from '../services/UserContext';

export type Decode = (token?: string) => User | undefined;

export const setToken = (token: string) => {
    localStorage.setItem('login_token',token);
}


export const getToken = () => {
    const token = localStorage.getItem('login_token');
    return token ?? undefined;
}

export const decode: Decode = (token) => {
    const userToken = token ?? getToken();
    if(!userToken) {
        return undefined;
    }

    const user: User = jwt_decode(userToken);

    return user;
}

export const checkExpiration = (decoded: User) => {
    const expirationDate = (decoded.iat * 1000) + 86400000;
    const now = Date.now();
    if(expirationDate < now || decoded === undefined) {
        return false;
    }

    return true;
}

export const removeToken = () => {
    localStorage.removeItem('login_token');
}