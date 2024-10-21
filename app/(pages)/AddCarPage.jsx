import { Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { YStack, XStack, ScrollView } from "tamagui";
import CustomInput from "../../components/CustomInput";
import ButtonNext from "../../components/ButtonNext";
import { Link, useRouter } from "expo-router";
import LoadingPage from "../(pages)/LoadingPage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorPage from "../(pages)/ErrorPage";
import { icons } from "../../constants";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { newCar } from "../../services/users";
import { addCarSchema } from "../../validation/usersSchemas";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function AddCarPage() {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addCarSchema),
    defaultValues: {
      model: "",
      plate: "",
      color: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (carData) => newCar(carData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCars"] });
      queryClient.invalidateQueries({ queryKey: ["getRideData"] });
      router.push({
        pathname: "/(pages)/PostSuccessful",
        params: {
          title: "Agregaste tu auto!",
          section: "Mis autos",
          sectionSource: icons.car,
          returnTo: "Volver a Mis autos",
          returnToSource: icons.car,
          returnToRef: "/(pages)/MyCarsPage",
        },
      });
    },
  });

  const router = useRouter();

  const handleContinue = (formData) => {
    const obj = {
      model: formData.model,
      plate: formData.plate,
      color: formData.color,
    };

    mutation.mutate(obj);
  };

  if (mutation.isPending) {
    return <LoadingPage />;
  }

  return (
    <YStack className="h-full justify-evenly bg-background">
      <YStack className="items-center justify-center">
        <Text className="text-black text-4xl font-qbold">Cargá los datos</Text>
        <Text className="text-black text-4xl font-qbold">
          de
          <Text className="text-primary text-4xl font-qbold"> tu auto</Text>
        </Text>
      </YStack>
      <YStack className="items-center justify-center">
        {mutation.isError && mutation.error.message == 408 && (
          <Text className="text-red-500 text-base font-qsemibold pb-12">
            Error de conexion, intente mas tarde.
          </Text>
        )}
        {mutation.isError && mutation.error.message == 403 && (
          <Text className="text-red-500 text-base font-qsemibold pb-12">
            Aun no sos conductor.
          </Text>
        )}
        {mutation.isError && mutation.error.message == 402 && (
          <Text className="text-red-500 text-base font-qsemibold pb-12">
            Ya tenes un auto con esta patente.
          </Text>
        )}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              title="Modelo"
              value={value}
              handleChangeText={onChange}
              placeholder={"Ej: Toyota etios"}
            />
          )}
          name="model"
        />
        {errors.model && (
          <Text className="text-red-500 text-base font-qsemibold">
            {errors.model.message}
          </Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              title="Patente"
              value={value}
              handleChangeText={onChange}
              placeholder={"Ej: abc-123"}
            />
          )}
          name="plate"
        />
        {errors.plate && (
          <Text className="text-red-500 text-base font-qsemibold">
            {errors.plate.message}
          </Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              title="Color"
              value={value}
              handleChangeText={onChange}
              placeholder={"Ej: Rojo"}
            />
          )}
          name="color"
        />
        {errors.color && (
          <Text className="text-red-500 text-base font-qsemibold">
            {errors.color.message}
          </Text>
        )}
      </YStack>
      <YStack className="items-center">
        <ButtonNext onPress={handleSubmit(handleContinue)}>
          <Text className="text-white text-xl font-qsemibold">
            Agregar auto
          </Text>
        </ButtonNext>
        <Link href="/(pages)/MyCarsPage" asChild>
          <Text className="text-base text-primary font-qsemibold underline">
            Volver
          </Text>
        </Link>
      </YStack>
    </YStack>
  );
}
