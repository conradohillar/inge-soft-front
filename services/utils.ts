import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { LOCAL_IP, API_KEY_LOCATIONIQ } from '@env'


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
    let result = await SecureStore.getItemAsync("token");
    if (!result) {
        console.error("No token found");
        throw new Error(`No value found for key: token`);
    }
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


export const autocomplete = async (text) => {
    const now = Date.now();


    if (now - lastRequestTime < 600) {
        return;
    }

    lastRequestTime = now;
    try {
        const url = `https://api.locationiq.com/v1/autocomplete?key=${API_KEY_LOCATIONIQ}&q=${text}&limit=8&countrycodes=AR`;

        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

