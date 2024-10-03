import * as SecureStore from 'expo-secure-store';


export const setToken = async (token: string) => {
    await SecureStore.setItemAsync("token", token);
    let result = await SecureStore.getItemAsync("token");
    if (!result) {
      console.log("No token found");
      throw new Error(`No value found for key: token`);
    }
}

export const getToken = async () => {
    try {
        const storedToken = await SecureStore.getItemAsync('token');

        if (storedToken) {
            return storedToken;
        }
    } catch (error) {
        console.error('Error fetching token from SecureStore', error);
    }
    return null;
}


export const getHeaderWithToken = async () => {
    const token = await getToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
};
