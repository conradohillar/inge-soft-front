import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header';
import { Avatar, Button, XStack, YStack } from 'tamagui';
import icons from "../../constants/icons"
import { History } from '@tamagui/lucide-icons';
import { Link } from 'expo-router';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { LOCAL_IP } from '@env'
import LoadingPage from '../(pages)/LoadingPage'
import ErrorPage from "../(pages)/ErrorPage";
import * as SecureStore from 'expo-secure-store';
import { useState, useEffect } from "react";


const queryClient = new QueryClient()

export default function Profile() {
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
    <SafeAreaView className="bg-background">
        <Header />
        <YStack className="h-full items-center justify-evenly">
          <YStack className="h-[15%] items-center justify-evenly">
            <XStack className="w-[90%] items-center justify-start">
              <Avatar circular size="$12" borderColor="$black" borderWidth={1}>
                <Avatar.Image
                  accessibilityLabel="Cam"
                  src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                />
              <Avatar.Fallback backgroundColor="$gray5" />
              </Avatar>
              <YStack className="items-start justify-evenly ml-5">
                <XStack className="items-center">
                  <Text className="text-black text-lg font-qbold">{data.name}</Text>
                  <Button className="h-5 w-5 bg-background ml-2">
                    <Image source={icons.pencil} className="h-4 w-4" tintColor="#aaa" resizeMode='contain'/> 
                  </Button>
                </XStack>     
                <Text className="text-gray-600 text-base font-qsemibold">{data.email}</Text>     
              </YStack>
            </XStack>
          </YStack>
          <YStack className="w-full">
            <View className="w-full h-[17%] items-center justify-center" borderTopColor="#ddd" borderTopWidth={2}>
              <XStack className="w-[80%] items-center justify-start space-x-5" >
                <Image source={icons.car} className="h-6 w-6" tintColor="#aaa" resizeMode='contain'/>
                <Link href="/(pages)/MyCarsPage" asChild>
                  <Text className="text-xl text-black font-qbold">Mis autos</Text>
                </Link> 
              </XStack>
            </View>
            <View className="w-full h-[17%] items-center justify-center" borderTopColor="#ddd" borderTopWidth={2}>
              <XStack className="w-[80%] items-center justify-start space-x-5" >
                <Image source={icons.history} className="h-6 w-6" tintColor="#aaa" resizeMode='contain'/> 
                <Text className="text-xl text-black font-qbold">Historial</Text>
              </XStack>
            </View>
            <View className="w-full h-[17%] items-center justify-center" borderTopColor="#ddd" borderTopWidth={2}>
              <XStack className="w-[80%] items-center justify-start space-x-5" >
                <Image source={icons.map} className="h-6 w-6" tintColor="#aaa" resizeMode='contain'/> 
                <Text className="text-xl text-black font-qbold">PrÃ³ximos viajes</Text>
              </XStack>
            </View>
            <View className="w-full h-[17%] items-center justify-center" borderTopColor="#ddd" borderTopWidth={2}>
              <XStack className="w-[80%] items-center justify-start space-x-5" >
                <Image source={icons.id_card} className="h-6 w-6" tintColor="#aaa" resizeMode='contain'/>
                <Link href="/(pages)/CredentialsPage" asChild>
                  <Text className="text-xl text-black font-qbold">Credenciales</Text>
                </Link>
              </XStack>
            </View>
          </YStack>
        </YStack>
    </SafeAreaView>
  )
}