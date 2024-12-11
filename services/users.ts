import { getHeaderWithToken } from './utils';
import { LOCAL_IP } from '@env';
import axios from 'axios';
import { handleRequest } from './utils';


const BASE_URL = `https://rydio.com.ar/users`;

const getHeaders = async () => {
    return await getHeaderWithToken();
};



export const getUserData = async () => {
    const headers = await getHeaders();
    const url = `${BASE_URL}/me`;
    return handleRequest(() => axios.get(url, { headers }));
};

export const deleteImage = async () => {
    const headers = await getHeaders();
    const url = `${BASE_URL}/delete/photo`;
    return handleRequest(() => axios.delete(url, { headers, timeout: 25000 }));
};

export const newImage = async (base64Image) => {
    const headers = await getHeaders();
    const url = `${BASE_URL}/edit/photo`;
    const body = { base_64_image: base64Image };
    return handleRequest(() =>axios.put(url, body, { headers, timeout: 25000 }));
};

export const newCar = async (carData) => {
    const headers = await getHeaders();
    const url = `${BASE_URL}/addcar`;
    return handleRequest(() =>axios.post(url, carData, { headers }));
};

export const getMyCars = async () => {
    const headers = await getHeaders();
    const url = `${BASE_URL}/mycars`;
    return handleRequest(() => axios.get(url, { headers }));
};

export const deleteCar = async (plate) => {
    const headers = await getHeaders();
    const url = `${BASE_URL}/removecar?plate=${plate}`;
    return handleRequest(() =>axios.delete(url, { headers }));
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

export const getProfileInfo = async (id, category) => {
    const url = `${BASE_URL}/profile/${category}/${id}`;
    return handleRequest(() => axios.get(url));
}

export const addComment = async (receiverId, rideId, category, rating,comment) => {
    const url = `${BASE_URL}/comment/${category}/${receiverId}?ride_id=${rideId}&comment=${comment}&rating=${rating}`;
    const headers = await getHeaders();

    return handleRequest(() => axios.post(url, null,{ headers }));
}
