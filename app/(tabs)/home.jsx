import { View, Text, Image } from 'react-native'
import React from 'react'
import { Input, XStack, YStack } from 'tamagui'
import BlackButton from '../../components/BlackButton'
import { Link } from 'expo-router'
import Header from '../../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = ({userName}) => {
  return (
    <SafeAreaView className="h-full w-full bg-primary">
      <YStack className="flex-1 items-center justify-evenly">
          <Header />
          <XStack className='items-center my-10'>
              <Text className="text-3xl text-black font-qsemibold">¡Bienvenido </Text>
              <Text className="text-3xl text-secondary font-qbold">{userName ? userName : 'USER!'}</Text>
          </XStack>
          <View className="flex-1 items-center justify-center py-5">
              <Image source={require("../../assets/images/map.png")} 
                     style={{height:300, width:370, borderColor:"#888", borderWidth:2, borderRadius:40}} />
          </View>
          <View className="flex-1 items-center justify-center">
            <BlackButton height={70} width={250} href="/(pages)/SearchTripPage">
              <Text className="text-[20px] font-qsemibold text-primary">Buscar viaje</Text>
            </BlackButton>
            <BlackButton height={70} width={250} href="/(pages)/PostTripPage">
              <Text className="text-[20px] font-qsemibold text-primary">Publicar viaje</Text>
            </BlackButton>
          </View>
      </YStack>
    </SafeAreaView>
  )
}

export default Home