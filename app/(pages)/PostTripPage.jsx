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
  const [departureTime, setDepartureTime] = useState('');
  
  const router = useRouter();
  const handleContinue = async () => {
    
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
   
    
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

const hours = [
    { key: 0, value: '00:00'},
    { key: 1, value: '01:00'},
    { key: 2, value: '02:00'},
    { key: 3, value: '03:00'},
    { key: 4, value: '04:00'},
    { key: 5, value: '05:00'},
    { key: 6, value: '06:00'},
    { key: 7, value: '07:00'},
    { key: 8, value: '08:00'},
    { key: 9, value: '09:00'},
    { key: 10, value: '10:00'},
    { key: 11, value: '11:00'},
    { key: 12, value: '12:00'},
    { key: 13, value: '13:00'},
    { key: 14, value: '14:00'},
    { key: 15, value: '15:00'},
    { key: 16, value: '16:00'},
    { key: 17, value: '17:00'},
    { key: 18, value: '18:00'},
    { key: 19, value: '19:00'},
    { key: 20, value: '20:00'},
    { key: 21, value: '21:00'},
    { key: 22, value: '22:00'},
    { key: 23, value: '23:00'},
]

const renderSelect = (value) => {
    const index = hours.findIndex(h => h.value === value)
    // Verifica que el índice esté dentro de los límites
    if (index < 0 || index >= hours.length || hours.length === 0) {
      return 'Invalid index';
    }

    const myHour = hours[index];
    // Si el índice es el último, considera un ciclo (vuelve al primero)
    const nextHour = index === hours.length - 1 ? hours[0] : hours[index + 1];
    
    return (
        <Text className="text-black text-2xl font-qsemibold">{myHour.value} - {nextHour.value}</Text> 
    );
};
  
