import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { View, Text } from "react-native";
import { YStack, PortalProvider, XStack } from "tamagui";
import BlackButton from "../../components/BlackButton";
import { Link } from "expo-router";
import DatePicker from "../../components/DatePicker";
import AutocompleteCityInput from '../../components/AutocompleteCityInput';
import React, { useState, useContext, useEffect } from 'react';
import { fetchRidePartOne } from "../../services/fetchRide";
import SelectField  from '../../components/SelectField'
import { useRouter } from "expo-router";

import ButtonNext from "../../components/ButtonNext"
import TimePicker from "../../components/TimePicker";


export default function PostTripPage() {
 
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  
  
  const router = useRouter();
  const handleContinue = async () => {
    
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
    const formattedTime = new Date(time);
    formattedTime.setHours(formattedTime.getHours() - 3);
    const departureTime = formattedTime.toISOString().split('T')[1]; // HH:MM:SS.sssZ
    try {
      console.log("time", departureTime);
      router.push({
        
        pathname: "/(pages)/PostTripPage2",
        params: { fromLocation, toLocation, formattedDate, departureTime }
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };


    return (
        <SafeAreaView className="h-full w-full bg-background">
            <Header />
             <XStack className=" items-center justify-center mt-8 mb-3">
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
                    <DatePicker style={{backgroundColor:"#EEEEEE"}} placeholderTextColor="#bbb" value={date}
                     onChangeDate={setDate} title={"Fecha de salida"}/>
                </View>
                <View className="w-full items-flex-start justify-center pt-3">
                    <TimePicker style={{backgroundColor:"#EEEEEE"}} placeholderTextColor="#bbb" value={time}
                    onChangeTime={setTime} minuteInterval={30} title={"Hora de salida"}/>
                </View>
                <XStack className="items-center mt-3 px-12">
                    <Text className='text-sm text-gray-400 font-qsemibold' 
                    >Nota: se asignará automáticamente una franja de
                    <Text className='text-sm text-primary font-qbold' 
                    > 1 hora.</Text>
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
        </SafeAreaView>
    );
}
  
