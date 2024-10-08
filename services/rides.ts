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
    const headers = await getHeaderWithToken();
    const url = `http://${LOCAL_IP}:8000/rides/${type}/${category}`
    try {
        const response = await axios.get(url, { headers: headers });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }

}


export const getRideSearchDetail = async (rideId) => {

    const url = `http://${LOCAL_IP}:8000/rides/search/detail/${rideId}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getRiderDetail = async (rideId) => {

    const url = `http://${LOCAL_IP}:8000/rides/rider/detail/${rideId}`;
    const headers = await getHeaderWithToken();

    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getDriverUpcomingDetail = async (rideId) => {

    const url = `http://${LOCAL_IP}:8000/rides/search/detail/${rideId}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getDriverHistoryDetail = async (rideId) => {

    const url = `http://${LOCAL_IP}:8000/rides/driver/history/detail/${rideId}`;
    const headers = await getHeaderWithToken();

    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const joinRide = async (data) => {
    const headers = await getHeaderWithToken();

    const url = `http://${LOCAL_IP}:8000/rides/join`

    return axios.post(url, data, { headers })
}



export const getReservationData = async (ride_id) => {

    const url = `http://${LOCAL_IP}:8000/rides/requests/pendings/${ride_id}`;

    const headers = await getHeaderWithToken();

    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const handleReservation = async (data) => {
    const headers = await getHeaderWithToken();
    const url = `http://${LOCAL_IP}:8000/rides/requests/isAccepted`;

    try {
        const response = await axios.put(url, data, { headers });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}