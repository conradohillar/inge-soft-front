import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header';
import { XStack, YStack } from 'tamagui';
import { Link } from 'expo-router';
import icons from '../../constants/icons';

export default function Trips(){
  return (
    <SafeAreaView className="h-full w-full bg-background">
      <Header />
      <YStack className="h-full items-center justify-evenly">
            <View className="w-full items-center justify-center">
              <Text className="text-3xl font-qbold"> MIS 
                <Text className="text-3xl font-qbold text-primary"> VIAJES</Text>
              </Text>
            </View>
            <YStack className='w-full h-[70%]'>
            <View className="w-full h-[20%] items-center justify-center" borderTopColor="#ddd" borderTopWidth={2}>
              <Link href={{pathname:"/(pages)/TripsPage", params: { category: "rider" }}} asChild>
                <XStack className="w-[80%] items-center justify-start space-x-5" >
                  <Image source={icons.profile2} className="h-6 w-6" tintColor="#aaa" resizeMode='contain'/> 
                  <Text className="text-xl text-black font-qbold">Como pasajero</Text>
                </XStack>
              </Link>
            </View>
            <View className="w-full h-[20%] items-center justify-center" borderTopColor="#ddd" borderTopWidth={2}>
              <Link href={{pathname:"/(pages)/TripsPage", params: { category: "driver" }}} asChild>
                <XStack className="w-[80%] items-center justify-start space-x-5" >
                  <Image source={icons.wheel} className="h-6 w-6" tintColor="#aaa" resizeMode='contain'/> 
                  <Text className="text-xl text-black font-qbold">Como conductor</Text>
                </XStack>
              </Link>
            </View>
            </YStack>
        </YStack>
    </SafeAreaView>
  )
}
