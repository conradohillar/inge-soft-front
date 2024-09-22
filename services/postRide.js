import axios from 'axios';


LOCAL_IP="192.168.1.36"

const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNGM1MjBmMS0yNTU1LTQyOWUtOGFkMi02ZTNkYTZhY2JjZDEiLCJleHAiOjE3MjU5Mjg1NTB9.49ODAhWQtdRHAZzdGmSDbYDpUdt4nJO--rLHFtfSsIA"

axios.defaults.timeout = 10000;

export const postRide = async (body, plate) => {
  try {
    // Construir la URL con los parámetros proporcionados
    const url = `http://${LOCAL_IP}:8000/rides/create/detail?plate=${plate}`;

    console.log(url)
    
    const headers = {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json' // Si es necesario especificar el tipo de contenido
    };

    const response = await axios.post(url, body, {headers});
   
    console.log(response.data)
   
    return response.data;
  } catch (error) {
    console.error('Error al crear el nuevo viaje:', error);

  }
};


