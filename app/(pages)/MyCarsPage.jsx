import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { FlatList, View, Text, ScrollView, Image } from "react-native";
import CarCard from "../../components/CarCard";
import { Button, XStack } from "tamagui";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import icons from "../../constants/icons"
import { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query'
import {LOCAL_IP} from '@env'
import LoadingPage from '../(pages)/LoadingPage'
import ErrorPage from "./ErrorPage";
import * as SecureStore from 'expo-secure-store';
import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';

const queryClient = new QueryClient()

export default function MyCarsPage() {

    return (
        <QueryClientProvider client={queryClient} >
            <Content />
        </QueryClientProvider>
    )
}

function Content() {
    const [token, setToken] = useState(null);


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


    const url = `http://${LOCAL_IP}:8000/users/mycars`
    
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    

    const { isPending, error, data } = useQuery({
        queryKey: ['fetchMycars'],
        queryFn: () =>
            fetch(url, {headers} ).then((res) =>
                res.json(),
            ),
            enabled: !!token,

    });
    
    
    if (isPending) {
        return <LoadingPage />
    }

    if (error) {
        return <ErrorPage />
    }


    
    const renderItem = ({ item }) => {
        return (
            <CarCard model={item.model} plate={item.plate} />
        );

    }
    return (
        <SafeAreaView className="w-full h-full bg-background">
            <Header />
            <View className="items-start mt-5 ml-4">
                <Link href="/(tabs)/profile" asChild>
                    <Button className="h-9 w-9 bg-background rounded-xl">
                        <Image source={icons.arrowleft} className="h-7 w-7" resizeMode="contain" />
                    </Button>
                </Link>
            </View>
            <XStack className="items-center justify-center mb-7">
                <Text className="text-4xl font-qbold text-black">MIS AUTOS</Text>
            </XStack>
            { data!= undefined && <FlatList
                className="w-full"
                data={data}
                keyExtractor={item => item.plate}
                renderItem={renderItem}
            />}
            <XStack className="items-center justify-center my-10">
                <Text className="text-lg text-gray-600 font-qsemibold">Agregá un auto nuevo</Text>
                <Link href="/(pages)/AddCarPage" asChild>
                    <Button className="h-8 w-8 bg-background rounded-xl ml-3 mt-1">
                        <Image source={icons.add} className="h-6 w-6" resizeMode="contain" />
                    </Button>
                </Link>
            </XStack>
        </SafeAreaView>
    );

}