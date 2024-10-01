import { Image, View, Text, Pressable,  } from "react-native";
import { XStack, YStack, Avatar , Button} from "tamagui";
import icons from '../constants/icons';
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {LOCAL_IP} from '@env'
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import LoadingPage from "../app/(pages)/LoadingPage";
import ErrorPage from "../app/(pages)/ErrorPage";



export default function CarCard({model, plate}){
    const [token, setToken] = useState(null);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => {
            
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
            
            return axios.delete(`http://${LOCAL_IP}:8000/users/removecar/?plate=${plate}`, { headers })
        },
        onSuccess: () => {
            queryClient.invalidateQueries('fetchMycars');
        }
    })

    if (mutation.isLoading) return <LoadingPage/>
    if (mutation.isError) return <ErrorPage />

    const handleDelete = () => {
        mutation.mutate()
    }

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await SecureStore.getItemAsync('token');
                if (storedToken) {
                    setToken(storedToken);
                }
            } catch (error) {
                console.error('Error fetching token from SecureStore', error);
            }
        };

        fetchToken();
    }, []);

    return (
        <View className="w-full items-center my-3">
            <Pressable 
                    style={({ pressed }) => ({ 
                        width:"85%", height:150, paddingTop:20, paddingHorizontal: 30,
                        borderWidth:2, borderColor:"#aaa", borderRadius:40,
                        backgroundColor: "#eee"
                    })}
                    >
                <YStack>
                    <XStack className="items-start justify-between">
                        <YStack className="space-y-3">
                            <XStack className="space-x-5 items-center">
                                <Text className="text-black text-2xl font-qbold">{model}</Text>
                                <Image source={icons.car} className="h-10 w-10" tintColor="#bbb" resizeMode="contain"/>
                            </XStack>
                            <Text className="text-base font-qsemibold text-grey-500">Patente: {plate}</Text>
                        </YStack>
                    </XStack>
                    <View className="items-end mb-3">
                        <Pressable onPress={handleDelete} style={({ pressed }) => ({backgroundColor: pressed ? "#fdcdcd":"#eee"})}>
                            <Image source={icons.trash} className="h-7 w-7" tintColor="#c00" resizeMode="contain"/>
                        </Pressable>
                    </View>
                </YStack>
            </Pressable>
        </View>
    );
}