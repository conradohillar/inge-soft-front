import { View, Text, Image } from 'react-native'
import React from 'react'
import { Input, XStack, YStack } from 'tamagui'
import BlackButton from '../../components/BlackButton'
import { Link } from 'expo-router'
import Header from '../../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  return (
    <SafeAreaView className="h-full w-full bg-primary">
      <YStack className="flex-1 items-center justify-evenly">
          <Header />
          <XStack className="flex-1 items-center justify-between ">
            <Text className="text-[12px] font-qsemibold text-secondary">¿Querés publicar un viaje?</Text>
            <BlackButton height={52} width={160}>
              <Text className="text-[15px] font-qsemibold text-primary">Publicar viaje</Text>
            </BlackButton>
          </XStack>
          <YStack className="flex-4 items-center justify-center">
            <View className="flex-3 items-center justify-center py-5">
              <Image source={require("../../assets/images/map.png")} style={{height: 300 , width: 300, borderRadius:35}}/>
            </View>
            <Input className='px-4' placeholder="Buscar..." style={{backgroundColor:"#EEEEEE", width:300}} />
          </YStack>
          <View className="flex-1 items-center justify-center">
            <Link href="/SearchTripPage" asChild>
              <BlackButton height={70} width={250}>
                <Text className="text-[20px] font-qsemibold text-primary">Buscar viaje</Text>
              </BlackButton>
            </Link>
          </View>
      </YStack>
    </SafeAreaView>
  )
}

export default Home