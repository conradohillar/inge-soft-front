import { SafeAreaView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Text, Platform } from 'react-native';
import React, { useState, useEffect } from 'react'
import {  YStack } from 'tamagui'
import CustomInput from '../../components/CustomInput'
import ButtonNext from '../../components/ButtonNext'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { useMutation } from '@tanstack/react-query'
import ErrorPage from '../(pages)/ErrorPage'
import LoadingPage from '../(pages)/LoadingPage'
import { sign_up } from '../../services/auth'


export default function SignUp2() {

  const { email, userName, address } = useLocalSearchParams();
  const [dni, setDni] = useState(0);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();


  const mutation = useMutation({
    mutationFn: (userData) => sign_up(userData),
    onSuccess: () => {
      router.push({
        pathname: "/(auth)/sign-in"
      });
    }
  })

  const handleContinue = () => {
    const userData = {
      "name": userName,
      "email": email,
      "password": password,
      "address": address,
      "dni": Number(dni),
      "photo_url": null
    };
    
   mutation.mutate(userData)
    
  };

  if (mutation.isLoading) {
    return <LoadingPage />;
  }

  if (mutation.isError) {
    console.log(mutation.error);
    return <ErrorPage />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} // "padding" para iOS, "height" para Android
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="bg-background h-full w-full">
          <YStack className="h-full justify-evenly">
            <YStack className="items-center">
              <Text className="text-black text-4xl font-qbold">Detalles</Text>
              <Text className="text-black text-3xl font-qsemibold">de
                <Text className="text-primary text-3xl font-qbold"> TU PERFIL</Text>
              </Text>
            </YStack>

            <YStack className="justify-center">
              <CustomInput title="DNI" value={dni} handleChangeText={setDni} />
              <CustomInput
                title="Contraseña"
                value={password}
                handleChangeText={setPassword}
                secureTextEntry={true}
                placeholder={"Ingresa tu contraseña"}
              />
              <CustomInput
                title="Confirmá tu contraseña"
                value={confirmPassword}
                handleChangeText={setConfirmPassword}
                secureTextEntry={true}
              />
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
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}