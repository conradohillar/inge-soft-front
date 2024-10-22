import React, { useState } from "react";
import { YStack, XStack, View, Spinner } from "tamagui";
import CustomInput from "./CustomInput";
import ButtonNext from "./ButtonNext";
import { Link, useRouter } from "expo-router";
import LoadingPage from "../app/(pages)/LoadingPage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { icons } from "../constants";
import { Text, TouchableOpacity, ScrollView } from "react-native";
import { newCar } from "../services/users";
import { addCarSchema } from "../validation/usersSchemas";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalTemplate from "./ModalTemplate";
import { AlignVerticalJustifyCenter } from "@tamagui/lucide-icons";

const AddCarModal = ({ isVisible, onClose, onSave }) => {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
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
      reset();
      onClose();
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

  return (
    <ModalTemplate
      isVisible={isVisible}
      onBackdropPress={onClose}
      className="justify-center items-center h-full"
    >
      <YStack className="justify-evenly bg-white rounded-xl h-[90%] w-full">
        <ScrollView
          className="w-full h-full flex-1"
          centerContent="true"
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        >
          <YStack className="items-center justify-center h-[28%]">
            <Text className="text-black text-4xl font-qbold">
              Cargá los datos
            </Text>
            <Text className="text-black text-4xl font-qbold">
              de
              <Text className="text-primary text-4xl font-qbold"> tu auto</Text>
            </Text>
          </YStack>
          <YStack className="items-center justify-center h-[60%]">
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
          <YStack className="items-center h-[20%] mt-4 ">
            <ButtonNext onPress={handleSubmit(handleContinue)}>
              {mutation.isPending ? (
                <Spinner />
              ) : (
                <Text className="text-white text-xl font-qsemibold">
                  Agregar auto
                </Text>
              )}
            </ButtonNext>
            <TouchableOpacity
              className={"w-[40%] items-center justify-center pt-4"}
              onPress={() => {
                onClose();
                reset();
              }}
            >
              <Text className="font-qsemibold text-red-600 underline">
                Cancelar
              </Text>
            </TouchableOpacity>
          </YStack>
        </ScrollView>
      </YStack>
    </ModalTemplate>
  );
};

export default AddCarModal;
