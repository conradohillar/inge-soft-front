import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { API_KEY_LOCATIONIQ } from '@env'

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


const API_KEY = 'pk.2e190d42afd4bf8da39b9ba216bc5be7';


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
        console.error('Error al autocompletar:', error);
    }
};


export const emailValidation = async (email) => {
    axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=adffe0a7d64041efbdc7001a9c4385e0&email=${email}`)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
}