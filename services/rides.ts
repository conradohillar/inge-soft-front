import { getHeaderWithToken } from './utils';
import { LOCAL_IP } from '@env';
import axios from 'axios';



export const getRideData = async (fromLocation, toLocation) => {
    const headers = await getHeaderWithToken();
    const url = `http://${LOCAL_IP}:8000/rides/create?location_from=${fromLocation}&location_to=${toLocation}`

    try {
        const response = await axios.get(url, { headers: headers });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }

}

export const postTrip = async (tripData, car) => {
    const headers = await getHeaderWithToken();
    const url = `http://${LOCAL_IP}:8000/rides/create/detail?plate=${car}`;

    return axios.post(url, tripData, { headers })
}


export const searchRides = async (fromLocation, toLocation, formattedDate, people, smallPacks, mediumPacks, largePacks) => {
    const url = `http://${LOCAL_IP}:8000/rides/search?city_from=${fromLocation}&city_to=${toLocation}&date=${formattedDate}&people=${people}&small_packages=${smallPacks}&medium_packages=${mediumPacks}&large_packages=${largePacks}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getUserOrDriverRides = async (type, category) => {
    console.log(type, category);
    const headers = await getHeaderWithToken();
    const url = `http://${LOCAL_IP}:8000/rides/${type}/${category}`
    console.log(url);
    try {
        const response = await axios.get(url, { headers: headers });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }

}


export const getRideDetail = async (rideId) => {

    const url = `http://${LOCAL_IP}:8000/rides/detail/${rideId}`;
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}