import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import { XStack, YStack, Avatar } from 'tamagui';
import BlackButton from '../../components/BlackButton';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { getRideDetail } from '../../services/rides';
import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';



export default function TripDetail() {
    const id = '21635d30-a3c2-4bed-b467-3dc4125760bc';

    const { data, isError, isLoading } = useQuery({
        queryKey: ['rideDetail', id],
        queryFn: () => getRideDetail(id),
    });
    console.log(data)
    if (isLoading) {
        return <LoadingPage />
    }

    if (isError) {
        return <ErrorPage />
    }


    return (
        <SafeAreaView className="bg-background flex-1">
            <Header />
            <ScrollView className="h-full">
                <YStack className="h-full items-center justify-evenly bg-background p-4">
                    <XStack className="items-center justify-between w-full mb-4">
                        <Text className="text-2xl font-qbold text-black">{data.city_from}</Text>
                        <Text className="text-2xl font-qbold text-black">{data.city_to}</Text>
                    </XStack>
                    <Avatar circular size="$7" borderColor="$black" borderWidth={1}>
                        <Avatar.Image src={{ uri: data.driver_photo }} />
                        <Avatar.Fallback backgroundColor="$gray8" />
                    </Avatar>
                    <Text className="text-xl font-qbold text-black mt-2">{data.driver_name}</Text>
                    <Text className="text-base font-qsemibold text-grey-100 mb-3">{data.date}</Text>
                    <Text className="text-xl font-qbold text-grey-800 mb-3">${data.price}</Text>
                    <Text className="text-base font-qsemibold text-grey-100 mb-3">Estado: {data.state}</Text>
                    <Text className="text-base font-qsemibold text-grey-100 mb-3">Espacios disponibles:</Text>
                    <Text className="text-base font-qsemibold text-grey-100 mb-3">Personas: {data.available_space_persons}</Text>
                    <Text className="text-base font-qsemibold text-grey-100 mb-3">Paquetes pequeños: {data.available_space_small_package}</Text>
                    <Text className="text-base font-qsemibold text-grey-100 mb-3">Paquetes medianos: {data.available_space_medium_package}</Text>
                    <Text className="text-base font-qsemibold text-grey-100 mb-3">Paquetes grandes: {data.available_space_large_package}</Text>
                    <Text className="text-base font-qsemibold text-grey-100 mb-3">Modelo del auto: {data.car_model}</Text>
                    <Text className="text-base font-qsemibold text-grey-100 mb-3">Patente del auto: {data.car_plate}</Text>
                    <Text className="text-base font-qsemibold text-grey-100 mb-3">Precio por persona: ${data.price_person}</Text>
                    <Text className="text-base font-qsemibold text-grey-100 mb-3">Precio por paquete pequeño: ${data.price_small_package}</Text>
                    <Text className="text-base font-qsemibold text-grey-100 mb-3">Precio por paquete mediano: ${data.price_medium_package}</Text>
                    <Text className="text-base font-qsemibold text-grey-100 mb-3">Precio por paquete grande: ${data.price_large_package}</Text>
                    <Text className="text-base font-qsemibold text-grey-100 mb-3">Hora de inicio máxima: {data.start_maximum_time}</Text>
                    <Text className="text-base font-qsemibold text-grey-100 mb-3">Hora de inicio mínima: {data.start_minimum_time}</Text>
                    <BlackButton href={`/driver/${data.driver_id}`}>
                        <Text className="text-[20px] font-qsemibold text-white">Ver perfil del conductor</Text>
                    </BlackButton>
                </YStack>
            </ScrollView>
        </SafeAreaView>
    );
}