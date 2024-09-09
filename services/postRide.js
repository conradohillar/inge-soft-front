import axios from 'axios';

const LOCAL_IP="192.168.100.158"

const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNGM1MjBmMS0yNTU1LTQyOWUtOGFkMi02ZTNkYTZhY2JjZDEiLCJleHAiOjE3MjU5MDgzNzJ9.qoQKMjHbTqenalbg22v4SNFC8D7f-L20ECKXup22_DQ"

axios.defaults.timeout = 10000;

export const postRide = async (body, plate) => {
  try {
    // Construir la URL con los parámetros proporcionados
    const url = `http://${LOCAL_IP}:8000/rides/create?plate=${plate}`;
    
    const headers = {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json' // Si es necesario especificar el tipo de contenido
    };

    const response = await axios.post(url, body, {headers});
   
   
    return response.status;
  } catch (error) {
    console.error('Error al crear el nuevo viaje:', error);

  }
};



