import { getHeaderWithToken } from './utils';
import axios from 'axios';
import { handleRequest } from './utils';


const BASE_URL = `https://rydio.com.ar/rides`;


export const getRideData = async (fromLocation, toLocation) => {
    const headers = await getHeaderWithToken();
    const url = `${BASE_URL}/create?location_from=${fromLocation}&location_to=${toLocation}`

    return handleRequest(() => axios.get(url, { headers }));

}

export const postTrip = async (tripData, car) => {
    const headers = await getHeaderWithToken();
    const url = `${BASE_URL}/create/detail?plate=${car}`;

    return handleRequest(() => axios.post(url, tripData, { headers }));
}


export const searchRides = async (fromLocation, toLocation, formattedDate, people, smallPacks, mediumPacks, largePacks) => {
    const url = `${BASE_URL}/search?city_from=${fromLocation}&city_to=${toLocation}&date=${formattedDate}&people=${people}&small_packages=${smallPacks}&medium_packages=${mediumPacks}&large_packages=${largePacks}`;
    return handleRequest(() => axios.get(url));
}

export const getUserOrDriverRides = async (type, category) => {
    const headers = await getHeaderWithToken();
    const url = `${BASE_URL}/${type}/${category}`

     return handleRequest(() => axios.get(url, { headers }));
}


export const getRideSearchDetail = async (rideId) => {

    const url = `${BASE_URL}/search/detail/${rideId}`;
    return handleRequest(() => axios.get(url));

}

export const getRiderDetail = async (rideId) => {

    const url = `${BASE_URL}/rider/detail/${rideId}`;
    const headers = await getHeaderWithToken();
    return handleRequest(() => axios.get(url, { headers }));
   
}

export const getDriverUpcomingDetail = async (rideId) => {

    const url = `${BASE_URL}/driver/detail/${rideId}`;
    const headers = await getHeaderWithToken();
    return handleRequest(() => axios.get(url, { headers }));
    
}

export const getDriverHistoryDetail = async (rideId) => {

    const url = `${BASE_URL}/driver/history/detail/${rideId}`;
    const headers = await getHeaderWithToken();
    return handleRequest(() => axios.get(url, { headers }));
}

export const joinRide = async (data) => {
    const headers = await getHeaderWithToken();

    const url = `${BASE_URL}/join`
    return handleRequest(() => axios.post(url, data, { headers }));
}



export const getReservationData = async (ride_id) => {

    const url = `${BASE_URL}/requests/pendings/${ride_id}`;

    const headers = await getHeaderWithToken();
    return handleRequest(() => axios.get(url, { headers }));
}

export const handleReservation = async (data) => {
    const headers = await getHeaderWithToken();
    const url = `${BASE_URL}/requests/isAccepted`;

    return handleRequest(() => axios.put(url, data, { headers }));
}

export const handleStartTripMut = async (id) => {
    const headers = await getHeaderWithToken();
    const url = `${BASE_URL}/start/${id}`;

    return handleRequest(() => axios.post(url, null, { headers }));
}

export const handleEndTripMut = async (id) => {
    const headers = await getHeaderWithToken();
    const url = `${BASE_URL}/finish/${id}`;

    return handleRequest(() => axios.post(url, null, { headers }));
}

// export const cancelReservation = async (data) => {
//     const headers = await getHeaderWithToken();
//     const url = `${BASE_URL}/requests/cancel`;

//     return handleRequest(() => axios.put(url, data, { headers }));
// }

export const payRide = async (data) => {
    const headers = await getHeaderWithToken();
    const url = `https://rydio.com.ar/payments/create?title=${data.title}&price=${data.price}&ride_id=${data.ride_id}`;

    return handleRequest(() => axios.post(url, data, { headers }));
}