import { LOCAL_IP } from '@env';
import { getToken, getHeaderWithToken, handleRequest } from './utils';
import axios from 'axios';


const BASE_URL = `http://${LOCAL_IP}:8000/chat`;
let wc: WebSocket;


export const connect = async (chat_id:String) => {
    console.log(`ws://0.0.0.0:8000/chat/${chat_id}`);

    wc = new WebSocket(`ws://${LOCAL_IP}:8000/chat/${chat_id}?token=${await getToken()}`);
    wc.onmessage = (event) => {
        console.log(event.data);
    }
};


export const sendMessage = async (message: string) => {
    if (wc.readyState !== WebSocket.OPEN) 
        throw new Error('Connection is not open')
    wc.send(message);
};

export const getMessages = async (chat_id: string, limit: Number = 20, before: Date = null) => {
    const headers = await getHeaderWithToken();
    let url: string;
    if(before != null)
        url = `${BASE_URL}/messages/${chat_id}?limit=${limit}&before=${before}`;
    else
        url = `${BASE_URL}/messages/${chat_id}?limit=${limit}`;
  
    const ans = await handleRequest(() => axios.get(url, { headers }));
    console.log(ans);
    return ans;
}   



