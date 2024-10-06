import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { XStack, YStack, Avatar, Button } from 'tamagui';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getRideDetail } from '../../services/rides';
import LoadingPage from './LoadingPage'
import {Link} from 'expo-router';
import ErrorPage from './ErrorPage';
import icons from '../../constants/icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ButtonNext from '../../components/ButtonNext';




export default function TripUpcomingDetailForDriver() {

    const { ride_id } = useLocalSearchParams();

    const { data, isError, isLoading } = useQuery({
        queryKey: ['rideDetail', ride_id],
        queryFn: () => getRideDetail(ride_id),
    });

    const router = useRouter();

    const handleRequests = () => {
        router.push({
            pathname: "/(pages)/ReservationRequest",
            params: { ride_id }
        });
    }


    if (isLoading) {
        return <LoadingPage />
    }

    if (isError) {
        return <ErrorPage />
    }



    return (
        <SafeAreaView className="bg-background flex-1">
            <Header />
                <YStack className="h-full items-start justify-start bg-background mb-12">
                    <View className="w-full h-[10%] items-center justify-center">
                        <XStack className="w-full items-start justify-center ml-12">
                            <Link href={{pathname:"/(pages)/TripsPage", params: { category: "driver" }}} asChild>
                                <Button className="h-9 w-9 bg-background rounded-xl ml-12">
                                    <Image source={icons.arrowleft} className="h-7 w-7" resizeMode="contain" />
                                </Button>
                            </Link>
                            <View className="w-full items-start ml-8">
                                <Text className="text-3xl font-qbold text-primary">Detalle
                                    <Text className="text-3xl font-qbold text-black"> del viaje</Text>
                                </Text>
                            </View>
                        </XStack>
                    </View>
    { data.state && <XStack className='w-[95%] items-center justify-center space-x-2 mb-4'>
                        <Image source={icons.alert} className="h-6 w-6" resizeMode="contain" tintColor="#ff6633"/>
                        <Text className="text-sm font-qbold text-gray-600">Tenés solicitudes nuevas sin resolver</Text>
                    </XStack> }
                    <ScrollView className="h-full w-full">
                        <YStack className="items-start justify-between w-full px-4 pb-8 pt-2 mb-1 border-2 border-[#eee]">
                            <Text className="text-sm font-qbold text-[#ccc] mb-5">Logísticos</Text>
                            <Text className="text-base font-qsemibold text-gray-500">Punto de 
                                <Text className="text-base font-qbold text-primary"> partida:</Text>
                            </Text>
                            <Text className="text-base font-qbold text-black mb-5">{data.city_from}</Text>
                            <Text className="text-base font-qsemibold text-gray-500">Punto de 
                                <Text className="text-base font-qbold text-primary"> llegada:</Text>
                            </Text>
                            <Text className="text-base font-qbold text-black mb-5">{data.city_to}</Text>
                            <Text className="text-base font-qbold text-primary mb-3">Fecha:
                                <Text className="text-base font-qbold text-black"> {data.date}</Text>
                            </Text>
                            <Text className="text-base font-qsemibold text-gray-500 mb-6">Hora de
                                <Text className="text-base font-qbold text-primary"> salida:
                                    <Text className="text-base font-qbold text-black"> {data.start_minimum_time.split(':').slice(0, 2).join(':')} - {data.start_maximum_time.split(':').slice(0, 2).join(':')}</Text>
                                </Text>
                            </Text>
                            <Text className=" w-full pt-5 text-base font-qsemibold text-gray-500 mb-1 border-t-2 border-t-[#eee]">Espacios 
                                <Text className="text-base font-qbold text-primary"> disponibles:</Text>
                            </Text>
                            <Text className="text-base font-qbold text-black mb-1">Personas:
                                <Text className="text-base font-qbold text-black"> {data.available_space_persons}</Text>
                            </Text>
                            <Text className="text-base font-qbold text-black mb-1">Paquetes
                                <Text className="text-base font-qbold text-primary"> chicos:
                                    <Text className="text-base font-qbold text-black"> {data.available_space_small_package}</Text>
                                </Text>
                            </Text>
                            <Text className="text-base font-qbold text-black mb-1">Paquetes
                                <Text className="text-base font-qbold text-primary"> medianos:
                                    <Text className="text-base font-qbold text-black"> {data.available_space_medium_package}</Text>
                                </Text>
                            </Text>
                            <Text className="text-base font-qbold text-black">Paquetes
                                <Text className="text-base font-qbold text-primary"> grandes:
                                    <Text className="text-base font-qbold text-black"> {data.available_space_large_package}</Text>
                                </Text>
                            </Text>
                        </YStack>
                        <YStack className="items-start justify-between w-full px-4 pb-8 pt-3 mb-12 border-t-2 border-t-[#eee]">
                            <Text className="text-sm font-qbold text-[#ccc] mb-5">Manejá las solicitudes de tus pasajeros</Text>
                            <ButtonNext onPress={handleRequests} >
                                <Text className="text-2xl font-qsemibold text-white">Ver solicitudes</Text>
                            </ButtonNext>
                        </YStack>
                    </ScrollView>
                </YStack>
        </SafeAreaView>
    );
}
