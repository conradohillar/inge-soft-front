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
          <View className="flex-1 items-center justify-center py-5">
              <Image source={require("../../assets/images/map.png")} style={{flex: 1}}/>
          </View>
          <View className="flex-1 items-center justify-center">
            <Link href="/SearchTripPage" asChild>
              <BlackButton height={70} width={250}>
                <Text className="text-[20px] font-qsemibold text-primary">Buscar viaje</Text>
              </BlackButton>
            </Link>
            <Link href="" asChild>
              <BlackButton height={70} width={250}>
                <Text className="text-[20px] font-qsemibold text-primary">Publicar viaje</Text>
              </BlackButton>
            </Link>
          </View>
      </YStack>
    </SafeAreaView>
  )
}

export default Home