import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Text, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import CustomInput from '../../components/CustomInput';
import ButtonNext from '../../components/ButtonNext';
import LoadingPage from '../(pages)/LoadingPage';
import ErrorPage from '../(pages)/ErrorPage';
import { YStack, XStack } from 'tamagui';

import { sign_in } from '../../services/auth';



export default function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation({

    mutationFn: () => sign_in(email, password),
    onSuccess: () => {
      router.replace('../(tabs)/home');
    }
  });


  const handleContinue = async () => {
    try {
      mutation.mutate();
    } catch (error) {
      console.error("Mutation salio mal", error);
    }
  };


  if (mutation.isPending) {
    return <LoadingPage />;
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
              {mutation.isError && <Text className="text-red-500 text-base font-qsemibold">Error al iniciar sesión</Text>}
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

