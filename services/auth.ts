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
        if (error.response == undefined) {
            throw new Error('408');
        }
        throw new Error(error.response.status); 
    }
}

export const sign_up = async (userData) => {
    const url = `http://${LOCAL_IP}:8000/auth/users/register`

    try {
        const response = await axios.post(url, userData, {headers: basicHeader});
        return response.data;
    }catch (error) {
        if (error.response == undefined) {
            throw new Error('408');
        }
        throw new Error(error.response.status); 
    }
} 