import axios from 'axios';

LOCAL_IP="192.168.1.36"


axios.defaults.timeout = 10000;

export const fetchRidePartOne = async (cityFrom, cityTo) => {
  try {
    // Construir la URL con los parámetros proporcionados
    const url = `http://${LOCAL_IP}:8000/rides/create?location_from=${cityFrom}&location_to=${cityTo}`;
    
    console.log(url)
    
    const response = await axios.get(url);
    
    console.log(response.data)
    
    return response.data;
  } catch (error) {
    console.error('Error al obtener precios de ride:', error);

  }
};



