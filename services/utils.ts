import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { API_KEY_LOCATIONIQ } from '@env'


export const handleRequest = async (requestFunc) => {
    try {
        const response = await requestFunc();
        return response.data;
    } catch (error) {
        if (error.response == undefined) {
            throw new Error('408');
        }
        throw new Error(error.response.status); 
    }
};
export const setToken = async (token: string) => {
    await SecureStore.setItemAsync("token", token);
}

export const getToken = async () => {
    try {
        const storedToken = await SecureStore.getItemAsync('token');

        if (storedToken) {
            return storedToken;
        }
    } catch (error) {
        console.error('Error fetching token from SecureStore', error);
    }
    return null;
}


export const getHeaderWithToken = async () => {
    const token = await getToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
};




let lastRequestTime = 0;


export const autocomplete = async (text: string) => {
    const now = Date.now();


    if (now - lastRequestTime < 600) {
        return;
    }

    lastRequestTime = now;
    try {
        const url = `https://api.locationiq.com/v1/autocomplete?key=pk.2e190d42afd4bf8da39b9ba216bc5be7&q=${text}&limit=8&countrycodes=AR`;
        console.log(url);
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

