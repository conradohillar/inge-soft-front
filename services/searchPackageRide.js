import axios from 'axios';

LOCAL_IP="192.168.0.5"


axios.defaults.timeout = 10000;

export const searchRidesPackages = async (fromLocation, toLocation, date, smallPackages, mediumPackages, largePackages) => {
  try {
    //city_from: str, city_to: str, date: date, people:  int ,  medium_packages: int, large_packages: int
    // Construir la URL con los parámetros proporcionados
    const url = `http://${LOCAL_IP}:8000/rides/package?city_from=${fromLocation}&city_to=${toLocation}&date=${date}&small_packages=${smallPackages}&medium_packages=${mediumPackages}&large_packages=${largePackages}`;
    
    console.log(url)
    
    const response = await axios.get(url);
    
    console.log(response.data)
    
    return response.data;
  } catch (error) {
    console.error('Error al buscar un viaje:', error);

  }
};



