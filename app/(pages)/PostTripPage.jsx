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
import { Link } from "expo-router";

export default function PostTripPage() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [departureTime, setDepartureTime] = useState('');

  const router = useRouter();

  const handleContinue = async () => {
    const formattedDate = date.toISOString().split('T')[0]; // Formateo de la fecha (YYYY-MM-DD)
    try {
      router.push({
        pathname: "/(pages)/PostTripPage2",
        params: { fromLocation, toLocation, formattedDate, departureTime }
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
              <AutocompleteCityInput
                title="Desde"
                placeholder="i.e: Tigre"
                value={fromLocation}
                onChangeText={setFromLocation}
              />
              <AutocompleteCityInput
                title="Hasta"
                placeholder="i.e: Mar del Plata"
                value={toLocation}
                onChangeText={setToLocation}
              />
              <View className="w-full items-start justify-center mt-3">
                <DatePicker
                  style={{ backgroundColor: "#EEEEEE" }}
                  placeholderTextColor="#bbb"
                  value={date}
                  onChangeDate={setDate}
                  title={"Fecha de salida"}
                />
              </View>
              <View className="w-full items-start justify-center pt-3">
                <TimePicker
                  style={{ backgroundColor: "#EEEEEE" }}
                  placeholderTextColor="#bbb"
                  value={time}
                  onChangeTime={setTime}
                  minuteInterval={30}
                  title={"Hora de salida"}
                />
              </View>
              <XStack className="items-center mt-3 px-12">
                <Text className='text-sm text-gray-400 font-qsemibold'>
                  Nota: se asignará automáticamente una franja de
                  <Text className='text-sm text-primary font-qbold'> 1 hora.</Text>
                </Text>
              </XStack>
            </YStack>
            <View className="items-center space-y-2">
              <View className="w-[92%]">
                <ButtonNext onPress={handleContinue}>
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
