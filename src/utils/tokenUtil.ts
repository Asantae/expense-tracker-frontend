import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    sub: string;
    unique_name: string;
    email: string;
    iat: string;
}

export const getToken = () => {
    return localStorage.getItem('token');
};


export const getUserFromToken = (token: string): DecodedToken => {
    const decodedToken = jwtDecode<DecodedToken>(token);
    return decodedToken;
};