import { LOCAL_IP } from '@env';
import { getToken, getHeaderWithToken, handleRequest } from './utils';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { queryClient } from '../app/_layout';

const BASE_URL = `http://${LOCAL_IP}:8000/chat`;
let wc: WebSocket;


export const connect = async (chat_id:String) => {
    wc = new WebSocket(`ws://${LOCAL_IP}:8000/chat/${chat_id}?token=${await getToken()}`);
    wc.onmessage = (event) => {
        const messageData = JSON.parse(event.data);
        switch (messageData.action) {
            case 'new_message':
                const previousMessages : [] = queryClient.getQueryData(["getMessages", chat_id]) || [];
                queryClient.setQueryData(["getMessages", chat_id], [messageData, ...previousMessages]);
                break;
            case 'edit_message':
                //editar la data la cache de tanstack
                break;
            case 'remove_message':
                //editar la data la cache de tanstack
                break;
            default:
                console.error("Si llega aca revisar el back, algo esta mal, siempre deberia caer en uno de los casos de arriba")
        }
        
    }
};

export const disconnect = async () => {
    wc.close();
}


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

    return await handleRequest(() => axios.get(url, { headers }));

}

export const updateMessage = async (message_id: string, message: string) => {
    const headers = await getHeaderWithToken();
    const url = `${BASE_URL}/message/${message_id}?new_message=${message}`;
    return await handleRequest(() => axios.put(url, { headers }));

}

export const removeMessage = async (message_id: string) => {
    const headers = await getHeaderWithToken();
    const url = `${BASE_URL}/message/${message_id}`;
    return await handleRequest(() => axios.delete(url, { headers }));
}


