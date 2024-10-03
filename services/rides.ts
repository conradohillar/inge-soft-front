import { getHeaderWithToken } from './utils';
import { LOCAL_IP } from '@env';
import axios from 'axios';



export const getRideData = async (fromLocation, toLocation) => {
    const headers = await getHeaderWithToken();
    const url = `http://${LOCAL_IP}:8000/rides/create?location_from=${fromLocation}&location_to=${toLocation}`
    
    try {
        const response = await axios.get(url, {headers: headers});
        return response.data;
    }catch (error) {
        console.error(error);
        return null; 
    }

}

export const postTrip = async (tripData, car) => {
    const headers = await getHeaderWithToken();
    const url = `http://${LOCAL_IP}:8000/rides/create/detail?plate=${car}`;

    return axios.post(url , tripData, { headers })
}