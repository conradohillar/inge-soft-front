import { getHeaderWithToken } from './utils';
import { LOCAL_IP } from '@env';
import axios from 'axios';

const BASE_URL = `http://${LOCAL_IP}:8000/users`;

const getHeaders = async () => {
    return await getHeaderWithToken();
};

const handleRequest = async (requestFunc) => {
    try {
        const response = await requestFunc();
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getUserData = async () => {
    const headers = await getHeaders();
    const url = `${BASE_URL}/me`;
    console.log(url);
    return handleRequest(() => axios.get(url, { headers }));
};

export const deleteImage = async () => {
    const headers = await getHeaders();
    const url = `${BASE_URL}/delete/photo`;
    return axios.delete(url, { headers, timeout: 25000 });
};

export const newImage = async (base64Image) => {
    const headers = await getHeaders();
    const url = `${BASE_URL}/edit/photo`;
    const body = { base_64_image: base64Image };
    return axios.put(url, body, { headers, timeout: 25000 });
};

export const newCar = async (carData) => {
    const headers = await getHeaders();
    const url = `${BASE_URL}/addcar`;
    return axios.post(url, carData, { headers });
};

export const getMyCars = async () => {
    const headers = await getHeaders();
    const url = `${BASE_URL}/mycars`;
    return handleRequest(() => axios.get(url, { headers }));
};

export const deleteCar = async (plate) => {
    const headers = await getHeaders();
    const url = `${BASE_URL}/removecar?plate=${plate}`;
    return axios.delete(url, { headers });
};

export const newCredential = async () => {
    const headers = await getHeaders();
    const url = `${BASE_URL}/driver`;
    return handleRequest(() => axios.post(url, null, { headers }));
};

export const newName = async (name) => {
    const headers = await getHeaders();
    const url = `${BASE_URL}/edit/name?name=${name}`;
    return handleRequest(() => axios.put(url, null, { headers }));
};
