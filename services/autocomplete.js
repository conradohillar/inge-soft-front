import axios from 'axios';


axios.defaults.timeout = 10000;

const API_KEY = 'pk.2e190d42afd4bf8da39b9ba216bc5be7'

export const autocomplete = async (text) => {
  try {
    
    const url =  `https://api.locationiq.com/v1/autocomplete?key=${API_KEY}&q=${text}&limit=5&countrycodes=AR`;
    
    const response = await axios.get(url);

    return response.data
  } catch (error) {
    console.error('Error al autocompletar:', error);

  }
};
