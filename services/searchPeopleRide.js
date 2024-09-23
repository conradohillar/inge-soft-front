import axios from 'axios';

LOCAL_IP="192.168.0.5"


axios.defaults.timeout = 10000;

export const searchRides = async (fromLocation, toLocation, date, passengers, bags, suitcases) => {
  try {
    //city_from: str, city_to: str, date: date, people:  int ,  medium_packages: int, large_packages: int
    // Construir la URL con los parámetros proporcionados
    const url = `http://${LOCAL_IP}:8000/rides/people?city_from=${fromLocation}&city_to=${toLocation}&date=${date}&people=${passengers}&medium_packages=${bags}&large_packages=${suitcases}`;
    
    console.log(url)
    
    const response = await axios.get(url);
    
    console.log(response.data)
    
    return response.data;
  } catch (error) {
    console.error('Error al buscar un viaje:', error);

  }
};



