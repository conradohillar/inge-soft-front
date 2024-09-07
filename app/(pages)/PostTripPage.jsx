import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { View, Text, Button } from 'react-native';
import { YStack } from 'tamagui';
import BlackButton from '../../components/BlackButton';
import CustomInput from '../../components/CustomInput';
import { Link } from 'expo-router';
import { fetchRidePrices } from './../../services/getPrices';

export default function PostTripPage() {
  // Estados para los campos de entrada
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

  // Manejador de clic en el botón
  const  handleContinue = async () => {
    try {
      await fetchRidePrices(fromLocation, toLocation);
    } catch (error) {
      console.error('Error al obtener los precios del viaje:', error);
    }
  };

  return (
    <SafeAreaView className="h-full w-full bg-primary">
      <Header />
      <View className="items-center mt-16 mb-16">
        <Text className="text-[27px] font-qsemibold text-black">Publicá tu viaje</Text>
      </View>
      <YStack className="flex-1">
        <CustomInput
          title="Desde"
          placeholder="i.e: Tigre"
          value={fromLocation}
          onChangeText={setFromLocation} // Actualiza el estado cuando cambia el texto
        />
        <CustomInput
          title="Hasta"
          placeholder="i.e: Mar del Plata"
          value={toLocation}
          onChangeText={setToLocation} // Actualiza el estado cuando cambia el texto
        />
      </YStack>
      <View className="flex-1 items-center space-y-4">
        <BlackButton height={80} width={250} onPress={handleContinue}>
          <Text className="text-2xl font-qsemibold text-primary">Continuar</Text>
        </BlackButton>
        <Link href="/(tabs)/home" asChild>
          <Text className="text-base font-qsemibold text-red-500">Cancelar propuesta</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
