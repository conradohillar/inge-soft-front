import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { View, Text } from "react-native";
import { YStack, PortalProvider, XStack } from "tamagui";
import BlackButton from "../../components/BlackButton";
import { Link } from "expo-router";
import DatePicker from "../../components/DatePicker";
import AutocompleteCityInput from '../../components/AutocompleteCityInput';
import React, { useState, useContext, useEffect } from 'react';
import { fetchRidePrices } from "../../services/getPrices";
import { useRideContext } from "../../context/RideContext";
import { SelectField } from '../../components/SelectField'


export default function PostTripPage() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const { rideDetails, updateRideDetails } = useRideContext();

  useEffect(() => {
    console.log("Updated rideDetails:", rideDetails);
  }, [rideDetails]);

  const handleContinue = async () => {
    console.log('La ciudad es:', fromLocation);
  
    try {
      // Actualiza cityFrom y cityTo primero
      await new Promise(resolve => { 
        updateRideDetails(prevData => {
          resolve(); // Resuelve la promesa justo después de actualizar el estado
          return {
            ...prevData,
            cityFrom: fromLocation,
            cityTo: toLocation,
          };
        });
      });
  
      const ridePrices = await fetchRidePrices(fromLocation, toLocation);
  
      // Luego actualiza priceDetails
      updateRideDetails(prevData => ({
        ...prevData,
        priceDetails: {
          pricePerson: ridePrices.price_person,
          priceSmallPackage: ridePrices.price_small_package,
          priceMediumPackage: ridePrices.price_medium_package,
          priceLargePackage: ridePrices.price_large_package,
        },
      }));
    } catch (error) {
      console.error("Error al intentar almacenar los datos", error);
    }
  };
  
  
  return (
    <SafeAreaView className="h-full w-full bg-primary">
      <Header />
      <XStack className=" items-center justify-center mt-12 mb-6">
        <Text className="text-[27px] font-qbold text-secondary">Publicá</Text>
        <Text className="text-[27px] font-qsemibold text-black"> tu viaje</Text>
      </XStack>
      <YStack className="mb-10">
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
        <View className="w-full items-flex-start justify-center px-10 py-3">
          <Text className="text-xs font-qbold text-black px-1.5 mb-2">Fecha</Text>
          <DatePicker style={{ backgroundColor: "#EEEEEE" }} placeholderTextColor="#bbb" />
        </View>
        {/* <View className="w-full items-flex-start justify-center py-3 px-10">
          <Text className="text-xs font-qbold text-black px-1.5">Hora de salida</Text>
        </View>
        <PortalProvider>
          <SelectField items={hours} label="Horario" renderItem={(hour) => (
            <Text>{hour.value}</Text>
          )} />
        </PortalProvider> */}
      </YStack>
      <View className="items-center space-y-4">
        <BlackButton height={90} width={270} href="/(pages)/PostTripPage2" onPress={handleContinue}>
          <Text className="text-2xl font-qsemibold text-primary">Continuar</Text>
        </BlackButton>
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
  // ... demás horas
];
