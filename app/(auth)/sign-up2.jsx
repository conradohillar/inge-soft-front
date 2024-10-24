import {
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { YStack } from "tamagui";
import CustomInput from "../../components/CustomInput";
import ButtonNext from "../../components/ButtonNext";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import LoadingPage from "../(pages)/LoadingPage";
import { sign_up } from "../../services/auth";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpPart2Schema } from "../../validation/authSchemas";
import { registerIndieID } from "native-notify";

export default function SignUp2() {
  const { dni, userName, address } = useLocalSearchParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpPart2Schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (userData) => sign_up(userData),
    onSuccess: (user_id) => {
      registerIndieID(user_id.user_id, 24233, "SX3XOZEi4N2YNO4U2RkCfD");

      router.push({
        pathname: "/(auth)/sign-in",
      });
    },
  });

  const handleContinue = async (formData) => {
    const userData = {
      name: userName,
      email: formData.email,
      password: formData.password,
      address: address,
      dni: Number(dni),
      photo_url: null,
    };

    mutation.mutate(userData);
  };

  if (mutation.isLoading) {
    return <LoadingPage />;
  }

  return (
    <YStack className="h-full justify-evenly bg-background">
      <YStack className="items-center">
        <Text className="text-black text-4xl font-qbold">Detalles</Text>
        <Text className="text-black text-3xl font-qsemibold">
          de
          <Text className="text-primary text-3xl font-qbold"> TU PERFIL</Text>
        </Text>
      </YStack>

      <YStack className="items-center justify-center">
        {mutation.isError && mutation.error.message == 408 && (
          <Text className="text-red-500 text-base font-qsemibold pb-12">
            Error de conexion, intente mas tarde.
          </Text>
        )}
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <>
              <CustomInput
                title="E-mail"
                value={value}
                handleChangeText={onChange}
                placeholder="ejemplo@gmail.com"
                keyboardType="email-address"
              />
            </>
          )}
          name="email"
        />
        {errors.email && (
          <Text className="text-red-500">{errors.email.message}</Text>
        )}
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <>
              <CustomInput
                title="Contraseña"
                value={value}
                handleChangeText={onChange}
                secureTextEntry={true}
                autoComplete={"password"}
                multiline={false}
                inputMode={"password"}
                placeholder={"Ingresa tu contraseña"}
              />
            </>
          )}
          name="password"
        />
        {errors.password && (
          <Text className="text-red-500">{errors.password.message}</Text>
        )}
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <>
              <CustomInput
                title="Confirmá tu contraseña"
                value={value}
                handleChangeText={onChange}
                secureTextEntry={true}
                autoComplete={"password"}
                multiline={false}
                inputMode={"password"}
                placeholder={"Reingresá tu contraseña"}
              />
            </>
          )}
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <Text className="text-red-500">{errors.confirmPassword.message}</Text>
        )}
      </YStack>
      <YStack className="items-center">
        <ButtonNext
          height={90}
          width={270}
          onPress={handleSubmit(handleContinue)}
        >
          <Text className="text-2xl font-qsemibold text-white">Registrate</Text>
        </ButtonNext>
        <Link href="/(pages)/LandingPage" asChild>
          <Text className="text-base text-red-500 font-qsemibold underline">
            Cancelar
          </Text>
        </Link>
      </YStack>
    </YStack>
  );
}
