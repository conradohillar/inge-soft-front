import {LOCAL_IP} from '@env';
import { setToken, getHeaderWithToken } from './utils';
import axios from 'axios';

const basicHeader = {
    'Content-Type': 'application/json',
};

export const sign_in = async (email: string, password: string) => {
    const url = `http://${LOCAL_IP}:8000/auth/token`;
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    const body = new URLSearchParams({
        username: email,
        password: password,
    }).toString();
    try {

        const response = await axios.post(url,body, {headers: headers});

        await setToken(response.data.access_token.toString());
        
        return 0;
    }catch (error) {
        
        console.error(error);
        return new Error('Error signing in', error); 
    }
}

export const sign_up = async (userData) => {
    const url = `http://${LOCAL_IP}:8000/auth/users/register`

    console.log(userData)
    console.log(basicHeader)
    try {
        const response = await axios.post(url, userData, {headers: basicHeader});
        return response.data;
    }catch (error) {
        return new Error('Error signing up', error); 
    }
} 