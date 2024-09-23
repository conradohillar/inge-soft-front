import { View, Text, Image } from 'react-native';
import React from 'react';
import { XStack, YStack } from 'tamagui';
import BlackButton from '../../components/BlackButton';
import { Link } from 'expo-router';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { LOCAL_IP } from '@env'
import LoadingPage from '../(pages)/LoadingPage'
import ErrorPage from "../(pages)/ErrorPage";
import * as SecureStore from 'expo-secure-store';
import { useState, useEffect } from "react";


const queryClient = new QueryClient()

export default function Home() {
    return (
        <QueryClientProvider client={queryClient} >
            <Content />
        </QueryClientProvider>
    )

}

function Content(){
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

  const url = `http://${LOCAL_IP}:8000/auth/users/me`
  
  const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
  };
  

  const { isPending, error, data } = useQuery({
      queryKey: ['fetchUserData'],
      queryFn: () =>
          fetch(url, {headers} ).then((res) =>
              res.json(),
          ),
          enabled: !!token,

  })

  if (isPending) {
      return <LoadingPage />
  }

  if (error) {
      return <ErrorPage />
  }


  return (
    <SafeAreaView className="bg-background flex-1">
      <Header />
      
      <YStack className="h-full items-center justify-evenly bg-background">
      
        <XStack className="items-center h-[15%]">
          <Text className="text-3xl text-black font-qsemibold"> Bienvenido,</Text>
          <Text className="text-3xl text-primary font-qbold"> {data.name}</Text>
        </XStack>
        <View className="w-[90%] mb-10 bg-gray-400 rounded-2xl border-2 justify-center">
          <Image
            source={require("../../assets/images/map.png")}
            className="w-full items-center justify-evenly rounded-2xl border-2 border-gray-400"
          />
        </View>
        <XStack className="items-start justify-evenly w-[100%] h-[25%] px-3">
          <View className="w-[55%]">
            <BlackButton href="/(pages)/SearchTripPage" variant={"secondary"}>
              <Text className="text-[20px] font-qsemibold text-white">Buscar viaje</Text>
            </BlackButton>
          </View>
          <View className="w-[55%]">
            <BlackButton href="/(pages)/PostTripPage">
              <Text className="text-[20px] font-qsemibold text-white">Publicar viaje</Text>
            </BlackButton>
          </View>
        </XStack>
      </YStack>
    </SafeAreaView>
  );
};