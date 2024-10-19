import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { YStack } from 'tamagui'
import CustomInput from '../../components/CustomInput'
import ButtonNext from '../../components/ButtonNext'
import { Link, useRouter } from 'expo-router'
import AutocompleteCityInput from '../../components/AutocompleteCityInput';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { signUpPart1Schema } from '../../validation/authSchemas'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


export default function SignUp() {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpPart1Schema),
    defaultValues: {
      userName: '',
      dni: '',
      address: ''
    },
  });


  const router = useRouter();

  const handleContinue = async (formData) => {
    router.push({
      pathname: "/(auth)/sign-up2",
      params: { "userName": formData.userName, "dni": formData.dni, "address": formData.address }
    });

  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} // "padding" para iOS, "height" para Android
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="bg-background h-full w-full">
          <YStack className="h-full justify-evenly">
            <YStack className="items-center">
              <Text className="text-black text-5xl font-qbold mb-3">Registrá</Text>
              <Text className="text-primary text-5xl font-qbold">TU CUENTA</Text>
            </YStack>
            <YStack className="items-center justify-center">
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    title="Nombre"
                    value={value}
                    handleChangeText={onChange}
                    placeholder="Ingresá tu nombre"
                  />
                )}
                name="userName"
              />
              {errors.userName && <Text className="text-red-500">{errors.userName.message}</Text>}

              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    title="DNI"
                    value={value}
                    handleChangeText={onChange}
                    placeholder="Ingresá tu DNI"
                    keyboardType="numeric"
                  />
                )}
                name="dni"
              />
              {errors.dni && <Text className="text-red-500">{errors.dni.message}</Text>}

              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <AutocompleteCityInput
                    title="Dirección"
                    placeholder="i.e: Tigre"
                    setValue={onChange}
                    value={value}
                  />
                )}
                name="address"
              />
              {errors.address && <Text className="text-red-500">{errors.address.message}</Text>}
            </YStack>
            <YStack className="items-center">
              <ButtonNext height={90} width={270} onPress={handleSubmit(handleContinue)}>
                <Text className="text-2xl font-qsemibold text-white">Continuar</Text>
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
