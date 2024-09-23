import React, {useEffect} from 'react';
import { SafeAreaView, Text } from 'react-native';
import ButtonNext from '../../components/ButtonNext';
import { YStack } from 'tamagui';
import { Link, useRouter } from 'expo-router'
import { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { LOCAL_IP } from '@env';
import ErrorPage from './ErrorPage';

const queryClient = new QueryClient();

export default function CredentialsPage() {
    return (
        <QueryClientProvider client={queryClient} >
            <Content />
        </QueryClientProvider>
    )

};


function Content() {
    const mutation = useMutation({
        mutationFn: (token) => {
            
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
            return axios.post(`http://${LOCAL_IP}:8000/users/driver`,null, { headers })
        },
    })
    
    
      const router = useRouter();
    
      const handleContinue = async () => {
        
        
        let token = ""
        try {
            token = await SecureStore.getItemAsync("token");
        } catch (error) {
            console.error('Error getting token from SecureStore', error);
            return null;
        }
    
     
        
        mutation.mutate(token);
      };
    
      useEffect(() => {
        const handleSuccess = async () => {

          if (mutation.isSuccess) {
            console.log("Success");
            router.push({
              pathname: "/(tabs)/home",
    
            });
          }
        };
    
        handleSuccess();
      }, [mutation.isSuccess]);
    
      if (mutation.isLoading) {
        return <LoadingPage />;
      }
    
      if (mutation.isError) {
        console.log(mutation.error);
        return <ErrorPage />;
      }

    return (
        <SafeAreaView className="h-full w-full bg-background">
            <YStack className="items-center justify-evenly h-full">
                <Text className="text-black text-3xl font-qbold">Mis credenciales</Text>
                <ButtonNext variant={"secondary"} onPress={handleContinue}>
                    <Text className="text-white text-2xl font-qsemibold">Quiero ser conductor</Text>
                </ButtonNext>
                <Link href="/(tabs)/profile" asChild>
                    <Text className="text-primary text-lg font-qsemibold underline">Volver</Text>
                </Link>
            </YStack>
        </SafeAreaView>
    );
}