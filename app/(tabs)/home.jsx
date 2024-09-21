import { View, Text, Image } from 'react-native';
import React from 'react';
import { XStack, YStack } from 'tamagui';
import BlackButton from '../../components/BlackButton';
import { Link } from 'expo-router';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = ({ userName }) => {
  return (
    <SafeAreaView className="bg-background flex-1">
      <Header />
      
      <YStack className="h-full items-center justify-evenly bg-background">
      
        <XStack className="items-center h-[15%]">
          <Text className="text-3xl text-black font-qsemibold"> Bienvenido,</Text>
          <Text className="text-3xl text-primary font-qbold"> {userName ? userName : 'USER'}</Text>
        </XStack>
        <View className="w-[90%] aspect-square bg-gray-400 rounded-2xl border-2 justify-center">
          <Text className="text-center text-2xl text-black font-qsemibold">Aca va el mapa</Text>
          {/* <Image
            source={require("../../assets/images/map.png")}
            className="w-full items-center justify-evenly rounded-2xl border-2 border-gray-400"
          /> */}
        </View>
        <XStack className="items-center justify-evenly w-[100%] h-[30%]">
          <BlackButton href="/(pages)/SearchTripPage">
            <Text className="text-[20px] font-qsemibold text-white">Buscar viaje</Text>
          </BlackButton>
          <BlackButton href="/(pages)/PostTripPage">
            <Text className="text-[20px] font-qsemibold text-white">Publicar viaje</Text>
          </BlackButton>
        </XStack>
      </YStack>
    </SafeAreaView>
  );
};

export default Home;