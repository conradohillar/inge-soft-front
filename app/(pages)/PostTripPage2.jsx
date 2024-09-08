import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { View, Text, Image } from "react-native";
import { YStack, XStack, PortalProvider, Button } from "tamagui";
import BlackButton from "../../components/BlackButton";
import { Link } from "expo-router";
import SelectField from "../../components/SelectField";
import { User } from "@tamagui/lucide-icons";
import Counter from "../../components/Counter";
import icons from "../../constants/icons";
import { useRideContext } from "../../context/RideContext";
import React, { useContext } from "react";

export default function PostTripPage2() {
  const { rideDetails, updateRideDetails } = useRideContext();

  const handleSubmit = async () => {
    const bodyForPostRide = {
      ride: {
        city_from: rideDetails.cityFrom,
        city_to: rideDetails.cityTo,
        ride_date: rideDetails.rideDate,
        start_minimum_time: rideDetails.startTime.minimum,
        start_maximum_time: rideDetails.startTime.maximum,
        available_space_people: rideDetails.availableSpacePeople,
        available_space_small_package: rideDetails.availableSpaceSmallPackage,
        available_space_medium_package: rideDetails.availableSpaceMediumPackage,
        available_space_large_package: rideDetails.availableSpaceLargePackage,
      },
      price: {
        price_person: rideDetails.priceDetails.pricePerson,
        price_small_package: rideDetails.priceDetails.priceSmallPackage,
        price_medium_package: rideDetails.priceDetails.priceMediumPackage,
        price_large_package: rideDetails.priceDetails.priceLargePackage,
      },
      plate: rideDetails.selectedCar,
    };

    // Aquí harías el llamado a la API para enviar el viaje
    console.log("Datos para publicar viaje: ", bodyForPostRide);
  };

  return (
    <SafeAreaView className="h-full w-full bg-primary">
      <Header />
      <View className=" items-center mt-10 mb-12">
        <Text className="text-[27px] font-qsemibold text-black">Detalles de la publicación</Text>
      </View>
      <YStack className="items-start justify-center">
        <Text className="text-sm text-black font-qbold ml-10 mb-3">Seleccioná tu auto</Text>
        <PortalProvider>
          <SelectField items={items} label="Seleccioná tu auto" renderItem={(item) => (
            <Text>{item.value}, {item.key}</Text>
          )} />
        </PortalProvider>
        <XStack className="mx-11 mb-2 mt-12">
          <Text className='text-sm font-qbold text-black'>Indicá los </Text>
          <Text className='text-sm font-qbold text-secondary'>espacios disponibles</Text>
          <Text className='text-sm font-qbold text-black'> en tu auto:</Text>
        </XStack>
        <YStack className="items-center mx-12">
          <XStack className=" w-[250px] items-center justify-between mb-1 mx-10">
            <User size="3" color="black" />
            <Counter maxCount={4} />
          </XStack>
          <XStack className=" w-[250px] items-center justify-between mb-1">
            <Image source={require('../../assets/icons/bag.png')} style={{ height: 40, width: 40 }} />
            <Counter maxCount={4} />
          </XStack>
          <XStack className=" w-[250px] items-center justify-between mb-12">
            <Image source={require('../../assets/icons/suitcase.png')} style={{ height: 40, width: 40 }} />
            <Counter maxCount={4} />
          </XStack>
        </YStack>

        <View className="items-center space-y-3 mx-12">
          <XStack className="items-center space-x-5">
            <Link href="/(pages)/PostTripPage" asChild>
              <Button className="w-8 h-8 bg-primary">
                <Image source={icons.arrowleft} className="w-8 h-8" resizeMode="contain" />
              </Button>
            </Link>
            <BlackButton height={80} width={250} href="" onPress={handleSubmit}>
              <Text className="text-2xl font-qsemibold text-primary">Publicar viaje</Text>
            </BlackButton>
          </XStack>
          <Link href="/(tabs)/home" asChild>
            <Text className="text-base font-qsemibold text-red-500">Cancelar publicación</Text>
          </Link>
        </View>
      </YStack>
    </SafeAreaView>
  );
}

const items = [
  { key: 'AB-123-CD', value: 'Ford Focus' },
  { key: 'DE-456-FG', value: 'Toyota Corolla' },
  { key: 'HI-789-JK', value: 'Honda Civic' },
  { key: 'LM-000-AR', value: 'Audi A3' },
];
