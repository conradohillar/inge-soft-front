import axios from 'axios';

axios.defaults.timeout = 10000;

const API_KEY = 'pk.2e190d42afd4bf8da39b9ba216bc5be7';

// Variable para almacenar el último tiempo de la solicitud
let lastRequestTime = 0;

// Función para autocompletar con throttling
export const autocomplete = async (text) => {
  const now = Date.now();

  // Verificamos si han pasado al menos 600 ms desde la última solicitud
  if (now - lastRequestTime < 600) {
    return;
  }

  lastRequestTime = now; // Actualizamos el tiempo de la última solicitud

  try {
    const url = `https://api.locationiq.com/v1/autocomplete?key=${API_KEY}&q=${text}&limit=8&countrycodes=AR`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error al autocompletar:', error);
  }
};
