import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { YStack, XStack } from 'tamagui'
import CustomInput from '../../components/CustomInput'
import ButtonNext from '../../components/ButtonNext'
import { Link, useRouter } from 'expo-router'
import LoadingPage from '../(pages)/LoadingPage'
import axios from 'axios'
import { LOCAL_IP } from '@env'
import { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query'
import ErrorPage from '../(pages)/ErrorPage'
import * as SecureStore from 'expo-secure-store';
import { icons } from '../../constants'

const queryClient = new QueryClient() 

export default function AddCarPage(){
  return (
    <QueryClientProvider client={queryClient} >
      <Content />
    </QueryClientProvider>
  )
  
}

const Content = () => {
  const [model, setModel] = useState('')
  const [plate, setPlate] = useState('')
  const [color, setColor] = useState('')

  const mutation = useMutation({
    mutationFn: ({carData, token}) => {
        
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        console.log(headers);
        console.log(carData);
        return axios.post(`http://${LOCAL_IP}:8000/users/addcar`, carData, { headers })
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

    const obj = {
      "model": model,
      "plate": plate,
      "color": color
    }
    
    mutation.mutate({ carData: obj, token });
  };

  useEffect(() => {
    const handleSuccess = async () => {
      if (mutation.isSuccess) {

        router.push({
          pathname: "/(pages)/PostSuccessful",
          params: {
            title: "Agregaste tu auto!",
            section: "Mis autos",
            sectionSource: icons.car,
            returnTo: "Volver a Mis autos",
            returnToSource: icons.car,
          }
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
      <SafeAreaView className="bg-background h-full w-full">
        <YStack className="h-full justify-evenly">
          <YStack className="items-center justify-center">
            <Text className="text-black text-4xl font-qbold">Cargá los datos</Text>
            <Text className="text-black text-4xl font-qbold">de
              <Text className="text-primary text-4xl font-qbold"> tu auto</Text>
            </Text>
          </YStack>
          <YStack className="items-center justify-center">
            <CustomInput title="Modelo" value={model} handleChangeText={setModel}/>
            <CustomInput title="Patente" value={plate} handleChangeText={setPlate}/>
            <CustomInput title="Color" value={color} handleChangeText={setColor}/>
          </YStack>
          <YStack className="items-center space-y-5">
            <ButtonNext height={60} width={220} onPress={handleContinue}>
              <Text className="text-white text-xl font-qsemibold">Agregar auto</Text>
            </ButtonNext>
            <Link href="/(pages)/MyCarsPage" asChild>
              <Text className="text-base text-primary font-qsemibold underline">Volver</Text>
            </Link>
          </YStack>
        </YStack>
      </SafeAreaView>
    )
  }
