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
      
      <YStack className="flex-1 items-center justify-evenly bg-primary">
      
        <XStack className="items-center my-10 ">
          <Text className="text-3xl text-black font-qsemibold"> Bienvenido, </Text>
          <Text className="text-3xl text-secondary font-qbold"> {userName ? userName : 'USER'}</Text>
        </XStack>
        {/* <View className="flex-1 items-center justify-center">
          <Image
            source={require("../../assets/images/map.png")}
            className=" rounded-2xl border-2 border-gray-400"
          />
        </View> */}
        <YStack className="items-center justify-center space-y-4 w-full px-4">
          <BlackButton href="/(pages)/SearchTripPage" className="w-full max-w-md">
            <Text className="text-[20px] font-qsemibold text-primary">Buscar viaje</Text>
          </BlackButton>
          <BlackButton href="/(pages)/PostTripPage" className="w-full max-w-md">
            <Text className="text-[20px] font-qsemibold text-primary">Publicar viaje</Text>
          </BlackButton>
        </YStack>
      </YStack>
    </SafeAreaView>
  );
};

export default Home;