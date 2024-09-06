import { SafeAreaView } from "react-native-safe-area-context";
import { YStack, Input } from "tamagui";
import BlackButton from "../components/BlackButton";
import React, { useState } from 'react';
import { Text, View, Pressable } from "react-native";
import DatePicker from '../components/DatePicker';
<co></co>

export default function SearchTripPage(){

    return (
        <SafeAreaView className="bg-primary h-full">
            <YStack className="flex-1 justify-around">
                <View className="items-center">
                    <Text className="text-3xl font-qsemibold text-black">Buscá tu viaje</Text>
                </View>
                <YStack className=" items-center justify-between gap-6">
                    <View className="items-flex-start justify-center">
                        <Text className="text-xs font-qsemibold text-gray-600 px-2 mb-1.5">Desde</Text>
                        <Input className='px-4' placeholder="Seleccionar origen" placeholderTextColor="#bbb" style={{backgroundColor:"#EEEEEE", width:300}} />
                    </View>
                    <View className="items-flex-start justify-center mt-3">
                        <Text className="text-xs font-qsemibold text-gray-600 px-2 mb-1.5">Hacia</Text>
                        <Input className='px-4' placeholder="Seleccionar destino" placeholderTextColor="#bbb" style={{backgroundColor:"#EEEEEE", width:300}} />
                    </View>
                    <View className="items-flex-start justify-center mt-3">
                        <Text className="text-xs font-qsemibold text-gray-600 px-2 mb-1.5">Fecha</Text>
                        <DatePicker style={{backgroundColor:"#EEEEEE", width:300}} placeholderTextColor="#bbb"/>
                    </View>
                </YStack>
                <YStack className="justify-evenly items-center">
                    <BlackButton height={60} width={280}> 
                        <Text className="text-[22px] font-qsemibold text-primary">Viajo yo</Text>
                    </BlackButton>
                    <BlackButton height={60} width={280}> 
                        <Text className="text-xl font-qsemibold text-primary">Enviar un paquete</Text>
                    </BlackButton>
                    <Text className="text-sm font-qsemibold text-red-500 mt-3">Cancelar búsqueda</Text>
                </YStack>
            </YStack>
        </SafeAreaView>
    );
}