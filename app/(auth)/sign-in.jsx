import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Text, Platform, TextInput } from 'react-native';
import { Link, router } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import CustomInput from '../../components/CustomInput';
import ButtonNext from '../../components/ButtonNext';
import LoadingPage from '../(pages)/LoadingPage';
import ErrorPage from '../(pages)/ErrorPage';
import { YStack, XStack } from 'tamagui';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { sign_in } from '../../services/auth';
import { signInSchema } from '../../validation/authSchemas';
import { useGlobalState } from '../_layout';
import { getUserData } from '../../services/users';


export default function SignIn() {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { globalState, setGlobalState } = useGlobalState();

  const mutation = useMutation({

    mutationFn: (formData) => sign_in(formData.email, formData.password, setGlobalState),
    onSuccess: async () => {
      const user = await getUserData();
      await setGlobalState({
        ...globalState,
        fullName: user.name,
        firstName: user.name.split(' ')[0],
        email: user.email,
        isLogued: true,
        isDriver: user.is_driver,
        userId: user.user_id,
      });

      if (user.photo_url) {
        await setGlobalState({
          ...globalState,
          photoUrl: user.photo_url,
        });
      }

      router.replace('../(tabs)/home');
    }
  });


  const handleContinue = async (formData) => {

    mutation.mutate(formData);

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
              {mutation.isError && mutation.error.message == 408 && <Text className="text-red-500 text-base font-qsemibold pb-12">Error de conexion, intente mas tarde.</Text>}
              {mutation.isError && mutation.error.message == 401 && <Text className="text-red-500 text-base font-qsemibold pb-12">E-mail o contrasena invalidos.</Text>}

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    title="E-mail"
                    value={value}
                    handleChangeText={onChange}
                    placeholder={"Ingresá tu e-mail"}
                    autoComplete={"email"}
                    inputMode={"email"}

                  />
                )}
                name="email"
              />
              {errors.email && <Text className="text-red-500 text-base font-qsemibold">{errors.email.message}</Text>}
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    title="Contraseña"
                    value={value}
                    secureTextEntry={true}
                    handleChangeText={onChange}
                    placeholder={"Ingresá tu contraseña"}
                    autoComplete={"password"}
                    multiline={false}
                    inputMode={"password"}
                  />
                )}
                name="password"
              />
              {errors.password && <Text className="text-red-500 text-base font-qsemibold">{errors.password.message}</Text>}
            </YStack>
            <YStack className="items-center">
              <ButtonNext height={60} width={220} onPress={handleSubmit(handleContinue)}>
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

