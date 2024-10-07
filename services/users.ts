import { getHeaderWithToken } from './utils';
import { LOCAL_IP } from '@env';
import axios from 'axios';

const BASE_URL = `http://${LOCAL_IP}:8000/rides`;

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

export const getRideData = async (fromLocation, toLocation) => {
    const headers = await getHeaders();
    const url = `${BASE_URL}/create?location_from=${fromLocation}&location_to=${toLocation}`;
    return handleRequest(() => axios.get(url, { headers }));
};

export const postTrip = async (tripData, car) => {
    const headers = await getHeaders();
    const url = `${BASE_URL}/create/detail?plate=${car}`;
    return axios.post(url, tripData, { headers });
};

export const searchRides = async (fromLocation, toLocation, formattedDate, people, smallPacks, mediumPacks, largePacks) => {
    const url = `${BASE_URL}/search?city_from=${fromLocation}&city_to=${toLocation}&date=${formattedDate}&people=${people}&small_packages=${smallPacks}&medium_packages=${mediumPacks}&large_packages=${largePacks}`;
    return handleRequest(() => axios.get(url));
};

export const getUserOrDriverRides = async (type, category) => {
    const headers = await getHeaders();
    const url = `${BASE_URL}/${type}/${category}`;
    return handleRequest(() => axios.get(url, { headers }));
};

export const getRideSearchDetail = async (rideId) => {
    const url = `${BASE_URL}/search/detail/${rideId}`;
    return handleRequest(() => axios.get(url));
};

export const getRiderDetail = async (rideId) => {
    const headers = await getHeaders();
    const url = `${BASE_URL}/rider/detail/${rideId}`;
    return handleRequest(() => axios.get(url, { headers }));
};

export const getDriverUpcomingDetail = async (rideId) => {
    const url = `${BASE_URL}/search/detail/${rideId}`;
    return handleRequest(() => axios.get(url));
};

export const getDriverHistoryDetail = async (rideId) => {
    const headers = await getHeaders();
    const url = `${BASE_URL}/driver/history/detail/${rideId}`;
    return handleRequest(() => axios.get(url, { headers }));
};

export const joinRide = async (data) => {
    const headers = await getHeaders();
    const url = `${BASE_URL}/join`;
    return axios.post(url, data, { headers });
};

export const getReservationData = async (ride_id) => {
    const headers = await getHeaders();
    const url = `${BASE_URL}/requests/pendings/${ride_id}`;
    return handleRequest(() => axios.get(url, { headers }));
};

export const handleReservation = async (data) => {
    const headers = await getHeaders();
    const url = `${BASE_URL}/requests/isAccepted`;
    return handleRequest(() => axios.put(url, data, { headers }));
};
