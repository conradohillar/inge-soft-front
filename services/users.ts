import { getHeaderWithToken } from './utils';
import { LOCAL_IP } from '@env';
import axios from 'axios';



export const getUserData = async () => {
    const headers = await getHeaderWithToken();
    const url = `http://${LOCAL_IP}:8000/users/me`;
    
    
    try {
        const response = await axios.get(url, {headers: headers});

        return response.data;
        
    }catch (error) {
        
        console.error(error);
        return null; 
    }

}

export const deleteImage = async () => {
    const headers = await getHeaderWithToken();
    const url = `http://${LOCAL_IP}:8000/users/delete/photo`;

      return axios.delete(url, {
        headers,
        timeout: 25000,
      });
}

export const newImage = async (base64Image) => {
    const body = {
      base_64_image: base64Image,
    };

    const headers = await getHeaderWithToken();

    const url = `http://${LOCAL_IP}:8000/users/edit/photo`;
  
    return axios.put(url, body, { headers, timeout: 25000 });
  }


export const newCar = async (carData) => {

    const headers = await getHeaderWithToken();

    return axios.post(`http://${LOCAL_IP}:8000/users/addcar`, carData, { headers });
}


export const getMyCars = async () => {
    const url = `http://${LOCAL_IP}:8000/users/mycars`;
    const headers = await getHeaderWithToken();
    
    const ans = await axios.get(url, {headers});
    return ans.data;
    
}

export const deleteCar = async (plate) => {
    const url = `http://${LOCAL_IP}:8000/users/removecar/?plate=${plate}`;
    const headers = await getHeaderWithToken();
    
    return axios.delete(url, { headers });
}

export const newCredential = async () => {

    const url = `http://${LOCAL_IP}:8000/users/driver`    
    const headers = await getHeaderWithToken()

    const ans = await axios.post(url,null, { headers })
    
    return ans
}