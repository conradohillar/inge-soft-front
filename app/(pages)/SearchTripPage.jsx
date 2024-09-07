import { SafeAreaView } from "react-native-safe-area-context";
import { YStack, Input } from "tamagui";
import BlackButton from "../../components/BlackButton";
import React, { useState } from 'react';
import { Text, View, Pressable } from "react-native";
import DatePicker from '../../components/DatePicker';
import Header from '../../components/Header';
import { Link } from "expo-router";
import CustomInput from "../../components/CustomInput";



export default function SearchTripPage(){

    return (
        <SafeAreaView className="bg-primary h-full">
            <Header />
            <YStack className="flex-1 justify-around">
                <View className="items-center mt-5">
                    <Text className="text-2xl font-qsemibold text-black">Buscá tu próximo viaje</Text>
                </View>
                <YStack className=" items-center justify-between">
                    <CustomInput title="Desde" placeholder="Seleccione origen" />
                    <CustomInput title="Hacia" placeholder="Seleccione destino" />
                    <View className="w-full items-flex-start justify-center px-10 pt-3">
                        <Text className="text-xs font-qsemibold text-gray-600 px-1.5 mb-2">Fecha</Text>
                        <DatePicker style={{backgroundColor:"#EEEEEE"}} placeholderTextColor="#bbb"/>
                    </View>
                </YStack>
                <YStack className="justify-evenly items-center mb-5">
                    <Link href="/TripDetailsPage" asChild>
                    <BlackButton height={60} width={280}> 
                        <Text className="text-[22px] font-qsemibold text-primary"  >Viajo yo</Text>
                    </BlackButton>
                    </Link>
                    <BlackButton height={60} width={280}> 
                        <Text className="text-xl font-qsemibold text-primary">Enviar un paquete</Text>
                    </BlackButton>
                    <Link href="/(tabs)/home">
                        <Text className="text-sm font-qsemibold text-red-500 mt-3">Cancelar búsqueda</Text>
                    </Link>
                </YStack>
            </YStack>
        </SafeAreaView>
    );
}