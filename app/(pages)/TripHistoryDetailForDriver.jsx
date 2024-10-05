import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useState } from 'react';
import { XStack, YStack, Avatar, Button } from 'tamagui';
import BlackButton from '../../components/BlackButton';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { getRideDetail } from '../../services/rides';
import LoadingPage from './LoadingPage'
import {Link} from 'expo-router';
import ErrorPage from './ErrorPage';
import Counter from '../../components/Counter';
import icons from '../../constants/icons';



export default function TripDetail() {

    const [pressed, setPressed] = useState(false)

    const id = '21635d30-a3c2-4bed-b467-3dc4125760bc';

    const { data, isError, isLoading } = useQuery({
        queryKey: ['rideDetail', id],
        queryFn: () => getRideDetail(id),
    });

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
                            <Link href={"/(pages)/SearchResultsPage"} asChild>
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
                    <ScrollView className="h-full">
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
                            <Text className="text-base font-qbold text-primary mb-3">Fecha
                                <Text className="text-base font-qbold text-black">: {data.date}</Text>
                            </Text>
                            <Text className="text-base font-qsemibold text-gray-500 mb-6">Hora de
                                <Text className="text-base font-qbold text-primary"> salida
                                    <Text className="text-base font-qbold text-black">: {data.start_minimum_time.split(':').slice(0, 2).join(':')} - {data.start_maximum_time.split(':').slice(0, 2).join(':')}</Text>
                                </Text>
                            </Text>
                            <Text className=" w-full pt-5 text-base font-qsemibold text-gray-500 mb-1 border-t-2 border-t-[#eee]">Trasladaste:</Text>
                            <Text className="text-base font-qbold text-black mb-1">Personas:
                                <Text className="text-base font-qbold text-black"> {data.available_space_persons}</Text>
                            </Text>
                            <Text className="text-base font-qbold text-black mb-1">Paquetes
                                <Text className="text-base font-qbold text-primary"> chicos
                                    <Text className="text-base font-qbold text-black">: {data.available_space_small_package}</Text>
                                </Text>
                            </Text>
                            <Text className="text-base font-qbold text-black mb-1">Paquetes
                                <Text className="text-base font-qbold text-primary"> medianos
                                    <Text className="text-base font-qbold text-black">: {data.available_space_medium_package}</Text>
                                </Text>
                            </Text>
                            <Text className="text-base font-qbold text-black">Paquetes
                                <Text className="text-base font-qbold text-primary"> grandes
                                    <Text className="text-base font-qbold text-black">: {data.available_space_large_package}</Text>
                                </Text>
                            </Text>
                            <View className="w-full items-start border-t-2 border-t-[#eee] mt-6 pt-4">
                                <Text className="text-xl font-qbold text-grey-800 mb-3">
                                    Costo: ${data.price}
                                </Text>
                            </View>
                        </YStack>
                        <YStack className="items-start justify-between w-full px-4 pb-6 pt-3 mb-12 border-2 border-[#eee]">
                            <Text className="text-sm font-qbold text-[#ccc] mb-5">Sobre el conductor</Text>
                            <XStack className="items-center justify-start w-full mb-5">
                                <Avatar circular size="$10" borderColor="$black" borderWidth={1}>
                                    <Avatar.Image src={{ uri: data.driver_photo }} />
                                    <Avatar.Fallback backgroundColor="$gray8" />
                                </Avatar>
                                <YStack className="items-start justify-start">
                                    <Text className="text-xl font-qbold text-black ml-3 mb-1">{data.driver_name}</Text>
                                    <Text className="text-sm font-qbold text-gray-500 ml-3">Vehículo: {data.car_model}, {data.car_plate}</Text>
                                </YStack>
                            </XStack>
                            <View className="w-full items-center mb-4">
                                <Link href={`/driver/${data.driver_id}`} asChild>
                                    <Pressable  onPressIn={() => setPressed(true)} onPressOut={() => setPressed(false)}
                                                style={{ 
                                                    backgroundColor: '#59A58A',
                                                    opacity: pressed ? 0.7 : 1,
                                                    alignItems: 'center',
                                                    paddingVertical: 8,
                                                    borderRadius: 8,
                                                    width: '60%',
                                                 }}>
                                        <Text className="text-sm font-qsemibold text-white">Ver perfil del conductor</Text>
                                    </Pressable>
                                </Link>
                            </View>
                        </YStack>
                    </ScrollView>
                </YStack>
        </SafeAreaView>
    );
}