import { getToken, getHeaderWithToken, handleRequest } from './utils';
import axios from 'axios';
import { queryClient } from '../app/_layout';



const BASE_URL = `https://rydio.com.ar/chat`;
let wc: WebSocket;


export const connect = async (chat_id:String, user_id:String) => {
    wc = new WebSocket(`wss://rydio.com.ar/chat/${chat_id}?token=${await getToken()}`);
    wc.onmessage = (event) => {
        const messageData = JSON.parse(event.data);
        const previousMessages : [] = queryClient.getQueryData(["getMessages", chat_id]) || [];
        switch (messageData.action) {
            case 'new_message':
                if(messageData.writer_id == user_id)
                    queryClient.setQueryData(["getMessages", chat_id], [messageData, ...previousMessages.slice(1)]);
                else
                    queryClient.setQueryData(["getMessages", chat_id], [messageData, ...previousMessages]);
                break;
            case 'edit_message':
                queryClient.setQueryData(["getMessages", chat_id], previousMessages.map((message:any) => {
                    if(message.msg_id == messageData.msg_id)
                        return {...message, msg: messageData.msg};
                    return message;
                }));
                break;
            case 'remove_message':
                queryClient.setQueryData(["getMessages", chat_id], previousMessages.filter((message:any) => message.msg_id != messageData.msg_id));
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
    return await handleRequest(() => axios.put(url, null,{ headers }));

}

export const removeMessage = async (message_id: string) => {
    const headers = await getHeaderWithToken();
    const url = `${BASE_URL}/message/${message_id}`;
    return await handleRequest(() => axios.delete(url, { headers }));
}

export const getOtherUser = async (chat_id: string) => {
    const headers = await getHeaderWithToken();
    const url = `${BASE_URL}/other_user/${chat_id}`;
    return await handleRequest(() => axios.get(url, { headers }));
}

export const getUserChats = async () => {
    const headers = await getHeaderWithToken();
    const url = `${BASE_URL}/list`;
    return await handleRequest(() => axios.get(url, { headers }));
}   

