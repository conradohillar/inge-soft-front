import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { YStack, XStack } from "tamagui";
import { useRouter } from "expo-router";
import AutocompleteCityInput from '../../components/AutocompleteCityInput';
import DatePicker from "../../components/DatePicker";
import TimePicker from "../../components/TimePicker";
import ButtonNext from "../../components/ButtonNext";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from "expo-router";
import { postTripSchema } from '../../validation/ridesSchemas';


export default function PostTripPage() {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postTripSchema),
    defaultValues: {
      fromLocation: '',
      toLocation: '',
      date: '',
      time: '',
    },
  });


  const router = useRouter();

  const handleContinue = async (formData) => {
    try {
      const formattedDate = formData.date.toISOString().split('T')[0]; // YYYY-MM-DD
      const formattedTime = new Date(formData.time);
      formattedTime.setHours(formattedTime.getHours() - 3);
      const departureTime = formattedTime.toISOString().split('T')[1]; // HH:MM:SS.sssZ

      router.push({
        pathname: "/(pages)/PostTripPage2",
        params: { fromLocation: formData.fromLocation, toLocation: formData.toLocation, formattedDate, departureTime }
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="h-full">
      <SafeAreaView className="h-full bg-background">
        <Header />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"} // "padding" para iOS, "height" para Android
          style={{ flex: 1 }}
        >
          <ScrollView className="h-full">
            <XStack className="items-center justify-center mt-8 mb-3">
              <Text className="text-[27px] font-qbold text-primary">Publicá</Text>
              <Text className="text-[27px] font-qsemibold text-black"> tu viaje</Text>
            </XStack>
            <YStack className="mb-6">

              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <AutocompleteCityInput
                    title="Desde"
                    placeholder="i.e: Tigre"
                    setValue={onChange}
                    value={value}
                  />
                )}
                name="fromLocation"
              />
              {errors.fromLocation && <Text className="text-red-500 text-center pt-3">{errors.fromLocation.message}</Text>}

              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <AutocompleteCityInput
                    title="Hasta"
                    placeholder="i.e: Mar del Plata"
                    setValue={onChange}
                    value={value}
                  />
                )}
                name="toLocation"
              />
              {errors.toLocation && <Text className="text-red-500 text-center pt-3">{errors.toLocation.message}</Text>}

              <View className="w-full items-start justify-center mt-3">
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      style={{ backgroundColor: "#EEEEEE" }}
                      placeholderTextColor="#777"
                      value={value}
                      onChangeDate={onChange}
                      title={"Fecha de salida"}
                    />
                  )}
                  name="date"
                />
              </View>
              {errors.date && <Text className="text-red-500 text-center pt-3">{errors.date.message}</Text>}

              <View className="w-full items-start justify-center pt-3">
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TimePicker
                      style={{ backgroundColor: "#EEEEEE" }}
                      placeholderTextColor="#777"
                      value={value}
                      onChangeTime={onChange}
                      minuteInterval={30}
                      title={"Hora de salida"}
                    />
                  )}
                  name="time"
                />
              </View>
              {errors.time && <Text className="text-red-500 text-center pt-3">{errors.time.message}</Text>}
              <XStack className="items-center mt-3 px-12">
                <Text className='text-sm text-gray-400 font-qsemibold'>
                  Nota: se asignará automáticamente una franja de
                  <Text className='text-sm text-primary font-qbold'> 1 hora.</Text>
                </Text>
              </XStack>
            </YStack>
            <View className="items-center space-y-2">
              <View className="w-[92%]">
                <ButtonNext onPress={handleSubmit(handleContinue)}>
                  <Text className="text-2xl font-qsemibold text-white">Continuar</Text>
                </ButtonNext>
              </View>
              <Link href="/(tabs)/home" asChild>
                <Text className="text-base font-qsemibold text-red-500">Cancelar publicación</Text>
              </Link>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback >
  );
}
