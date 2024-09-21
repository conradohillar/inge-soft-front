import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, Button, XStack, YStack } from 'tamagui'
import CustomInput from '../../components/CustomInput'
import ButtonNext from '../../components/ButtonNext'
import { Link, useLocalSearchParams } from 'expo-router'
import { set } from 'date-fns'
import Home from '../(tabs)/home'
import { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios';

import { LOCAL_IP } from '@env'


const queryClient = new QueryClient()



const SignUp2 = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Content />
    </QueryClientProvider>
  )

}

export default SignUp2



function Content() {
  
  const { email, userName, address } = useLocalSearchParams();

  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState(false);

  const userData =   { 
  "name": userName,
  "email": email,
  "password": password,
  "address": address,
  "dni": dni,
  "photo_id": 1
};

  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.post(`http://${LOCAL_IP}:8000/auth/users/register`, data)
    },
  })

  const handleContinue = () => {

    if (password !== confirmPassword) {
      setError(true);                     //ACA PODEMOS PONER UN RENDERIZADO CONDICIONAL DE LOS ERRORES BAJO LA CONDICION DE ESTE FLAG
    } else {
      console.log(userData)
      mutation.mutate(userData)
    }
  };
  return (
    <SafeAreaView className="bg-background h-full w-full">
      {mutation.isLoading ? (<LoadingPage />) : (
        <>
          {mutation.isError ? (
            <Text>An error occurred: {mutation.error.message}</Text>   // ACA TENEMOS QUE VER QUE MOSTRAMOS
          ) : null}

          {mutation.isSuccess ? <Home /> : null}
          <YStack className="h-full justify-evenly">
            <YStack className="items-center">
              <Text className="text-black text-4xl font-qbold">Detalles</Text>
              <Text className="text-black text-3xl font-qsemibold">de
                <Text className="text-primary text-3xl font-qbold"> TU PERFIL</Text>
              </Text>
            </YStack>

            <YStack className="justify-center">
              <CustomInput title="DNI" value={dni} handleChangeText={setDni} />
              <CustomInput title="Contraseña" value={password} handleChangeText={setPassword} />
              <CustomInput title="Confirmá tu contraseña" value={confirmPassword} handleChangeText={setConfirmPassword} />
            </YStack>
            <YStack className="items-center">
              <ButtonNext height={90} width={270} onPress={handleContinue}>
                <Text className="text-2xl font-qsemibold text-white">Registrate</Text>
              </ButtonNext>
              <Link href="/(pages)/LandingPage" asChild>
                <Text className="text-base text-red-500 font-qsemibold underline">Cancelar</Text>
              </Link>
            </YStack>
          </YStack>
        </>
      )}
    </SafeAreaView>
  )
}