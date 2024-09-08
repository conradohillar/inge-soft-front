import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { View, Text } from 'react-native';
import { YStack, PortalProvider } from 'tamagui';
import BlackButton from '../../components/BlackButton';
import { Link } from 'expo-router';
import { fetchRidePrices } from './../../services/getPrices';
import DatePicker from '../../components/DatePicker';
import SelectField from '../../components/SelectField';
import AutocompleteCityInput from '../../components/AutocompleteCityInput';





export default function PostTripPage() {
  // Estados para los campos de entrada
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');


  // Manejador de clic en el botón
  const handleContinue = async () => {
    try {
      await fetchRidePrices(fromLocation, toLocation);
    } catch (error) {
      console.error('Error al obtener los precios del viaje:', error);
    }
  };
  return (
    <SafeAreaView className="h-full w-full bg-primary">
      <Header />
      <View className=" items-center mt-12 mb-6">
        <Text className="text-[27px] font-qsemibold text-black">Publicá tu viaje</Text>
      </View>
      <YStack className="mb-10">
        <AutocompleteCityInput
          title="Desde"
          placeholder="i.e: Tigre"
          value={fromLocation}
          onChangeText={setFromLocation} // Actualiza el estado cuando cambia el texto
        />
        <AutocompleteCityInput
          title="Hasta"
          placeholder="i.e: Mar del Plata"
          value={toLocation}
          onChangeText={setToLocation} // Actualiza el estado cuando cambia el texto
        />
        <View className="w-full items-flex-start justify-center px-10 py-3">
          <Text className="text-xs font-qsemibold text-gray-600 px-1.5 mb-2">Fecha</Text>
          <DatePicker style={{ backgroundColor: "#EEEEEE" }} placeholderTextColor="#bbb" />
        </View>
        <View className="w-full items-flex-start justify-center py-3 px-10">
          <Text className="text-xs font-qsemibold text-gray-600 px-1.5">Hora de salida</Text>
        </View>
        <PortalProvider>
          <SelectField items={hours} label="Horario" renderItem={(hour) => (
            <Text>{hour.value}</Text>
          )} />
        </PortalProvider>
      </YStack>
      <View className="items-center space-y-4">
        <Link href="/(pages)/PostTripPage2" asChild>
          <BlackButton height={80} width={250} onPress={handleContinue}>
            <Text className="text-2xl font-qsemibold text-primary">Continuar</Text>
          </BlackButton>
        </Link>
        <Link href="/(tabs)/home" asChild>
          <Text className="text-base font-qsemibold text-red-500">Cancelar publicación</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const hours = [
  { key: 0, value: '00:00' },
  { key: 1, value: '01:00' },
  { key: 2, value: '02:00' },
  { key: 3, value: '03:00' },
  { key: 4, value: '04:00' },
  { key: 5, value: '05:00' },
  { key: 6, value: '06:00' },
  { key: 7, value: '07:00' },
  { key: 8, value: '08:00' },
  { key: 9, value: '09:00' },
  { key: 10, value: '10:00' },
  { key: 11, value: '11:00' },
  { key: 12, value: '12:00' },
  { key: 13, value: '13:00' },
  { key: 14, value: '14:00' },
  { key: 15, value: '15:00' },
  { key: 16, value: '16:00' },
  { key: 17, value: '17:00' },
  { key: 18, value: '18:00' },
  { key: 19, value: '19:00' },
  { key: 20, value: '20:00' },
  { key: 21, value: '21:00' },
  { key: 22, value: '22:00' },
  { key: 23, value: '23:00' },
]

const renderItemFc = (index) => {
  if (index < 0 || index >= hours.length) {
    return 'Invalid index';
  }

  const start = hours[index].value;
  // Manejar el caso en el que el índice es el último en el array
  const end = index === hours.length - 1 ? hours[0].value : hours[index + 1].value;

  return `${start} - ${end}`;
};

