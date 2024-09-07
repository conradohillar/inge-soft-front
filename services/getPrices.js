import axios from 'axios';

LOCAL_IP="192.168.100.158"

axios.defaults.timeout = 10000;
export const fetchRidePrices = async (cityFrom, cityTo) => {
  try {
    // Construir la URL con los parámetros proporcionados
    const url = `http://${LOCAL_IP}:8000/rides/create?location_from=${encodeURIComponent(cityFrom)}&location_to=${encodeURIComponent(cityTo)}`;
    
    const response = await axios.get(url);
    
    // Acceder a los datos del cuerpo de la respuesta
    return response.data;
  } catch (error) {
    console.error('Error al obtener precios de ride:', error);

  }
};



