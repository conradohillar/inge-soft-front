import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Text, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import CustomInput from '../../components/CustomInput';
import ButtonNext from '../../components/ButtonNext';
import LoadingPage from '../(pages)/LoadingPage';
import ErrorPage from '../(pages)/ErrorPage';

import { YStack, XStack } from 'tamagui';
import { LOCAL_IP } from '@env';

const queryClient = new QueryClient()

export default function SignIn() {
  return (
    <QueryClientProvider client={queryClient} >
      <Content />
    </QueryClientProvider>
  )

}

const Content = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const mutation = useMutation({

    mutationFn: (data) => {
      
      return axios.post(`http://${LOCAL_IP}:8000/auth/token`, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    },
  })


  const handleContinue = async () => {

    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    formData.append('grant_type', 'password');
    formData.append('scope', '');
    formData.append('client_id', '');
    formData.append('client_secret', '');

    mutation.mutate(formData)

  }

  useEffect(() => {
    const handleSuccess = async () => {
      if (mutation.isSuccess) {
        const token = mutation.data.data.access_token.toString();
        await SecureStore.setItemAsync("token", token);
        let result = await SecureStore.getItemAsync("token");
        if (!result) {
          console.log("No token found");
          throw new Error(`No value found for key: token`);
        }
        router.push({
          pathname: "/(tabs)/home",
          params: { email, password }
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} // "padding" para iOS, "height" para Android
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="bg-background h-full w-full">
          <YStack className="h-full justify-evenly">
            <YStack className="items-center justify-center">
              <Text className="text-black text-5xl font-qbold">Iniciá sesión</Text>
              <Text className="text-black text-4xl font-qbold">con
                <Text className="text-primary text-4xl font-qbold"> tu cuenta</Text>
              </Text>
            </YStack>
            <YStack className="items-center justify-center">
              <CustomInput
                title="E-mail"
                value={email}
                handleChangeText={setEmail}
                placeholder={"Ingresá tu e-mail"}
                autoComplete={"email"}
                inputMode={"email"}

              />
              <CustomInput
                title="Contraseña"
                value={password}
                secureTextEntry={true}
                handleChangeText={setPassword}
                placeholder={"Ingresá tu contraseña"}
                autoComplete={"password"}
                multiline={false}
                inputMode={"password"}
              />
            </YStack>
            <YStack className="items-center">
              <ButtonNext height={60} width={220} onPress={handleContinue}>
                <Text className="text-white text-xl font-qsemibold">Ir al Inicio</Text>
              </ButtonNext>
              <Link href="/(pages)/LandingPage" asChild>
                <Text className="text-base text-primary font-qsemibold underline">Volver</Text>
              </Link>
            </YStack>
          </YStack>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
