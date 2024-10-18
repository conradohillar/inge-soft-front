import { useState } from "react";
import { format } from 'date-fns';
import { useRouter } from "expo-router";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { YStack, XStack, ScrollView } from "tamagui";
import AutocompleteCityInput from '../../components/AutocompleteCityInput';
import ButtonNext from "../../components/ButtonNext";
import DatePicker from '../../components/DatePicker';
import { Link } from "expo-router";
import Header from "../../components/Header";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SafeAreaView } from 'react-native-safe-area-context';
import { searchTripSchema } from "../../validation/ridesSchemas";



export default function SearchTripPage() {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(searchTripSchema),
    defaultValues: {
      fromLocation: '',
      toLocation: '',
      date: '',
    },
  });

  const router = useRouter();



  const handleViajoYo = async (formDate) => {

    try {
      const formattedDate = format(formDate.date, 'yyyy-MM-dd'); // YYYY-MM-DD
      router.push({

        pathname: "/(pages)/SearchTripPerson",
        params: { fromLocation: formDate.fromLocation, toLocation: formDate.toLocation, formattedDate }
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };


  const handleEnviarPaquete = async (formDate) => {
    try {
      const formattedDate = format(formDate.date, 'yyyy-MM-dd'); // YYYY-MM-DD

      router.push({

        pathname: "/(pages)/SearchTripPackage",
        params: { fromLocation: formDate.fromLocation, toLocation: formDate.toLocation, formattedDate }
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
        >
          <XStack className="items-center mt-12 mb-9 justify-center w-full">
            <Text className="text-[26px] font-qbold text-primary">Buscá </Text>
            <Text className="text-[26px] font-qsemibold text-black">tu próximo viaje</Text>
          </XStack>
          <YStack className=" items-center justify-between mb-10">
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

          </YStack>
          <YStack className="items-center">
            <View className="w-[92%]">
              <ButtonNext onPress={handleSubmit(handleViajoYo)} variant={"secondary"}>
                <Text className="text-2xl font-qsemibold text-white">Viajo yo</Text>
              </ButtonNext>
            </View>
            <View className="w-[92%] mb-2">
              <ButtonNext onPress={handleSubmit(handleEnviarPaquete)}>
                <Text className="text-2xl font-qsemibold text-white">Enviar un paquete</Text>
              </ButtonNext>
            </View>
            <Link href="/(tabs)/home">
              <Text className="text-base font-qsemibold text-red-500">Cancelar búsqueda</Text>
            </Link>
          </YStack>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>

  );
}