import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header';
import { Avatar, Button, XStack, YStack } from 'tamagui';
import icons from "../../constants/icons"
import { History } from '@tamagui/lucide-icons';

export default function Profile(){
  return (
    <SafeAreaView className="bg-background">
        <Header />
        <YStack className="h-full items-center justify-evenly">
          <YStack className="h-[15%] items-center justify-evenly">
            <XStack className="w-[90%] items-center justify-start">
              <Avatar circular size="$12" borderColor="$black" borderWidth={1}>
                <Avatar.Image
                  accessibilityLabel="Cam"
                  src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                />
              <Avatar.Fallback backgroundColor="$gray5" />
              </Avatar>
              <YStack className="items-start justify-evenly ml-5">
                <XStack className="items-center">
                  <Text className="text-black text-lg font-qbold">Camila Lee</Text>
                  <Button className="h-5 w-5 bg-background ml-2">
                    <Image source={icons.pencil} className="h-4 w-4" tintColor="#aaa" resizeMode='contain'/> 
                  </Button>
                </XStack>     
                <Text className="text-gray-600 text-base font-qsemibold">camilee@gmail.com</Text>     
              </YStack>
            </XStack>
          </YStack>
          <YStack className="w-full">
            <View className="w-full h-[17%] items-center justify-center" borderTopColor="#ddd" borderTopWidth={2}>
              <XStack className="w-[80%] items-center justify-start space-x-5" >
                <Image source={icons.car} className="h-6 w-6" tintColor="#aaa" resizeMode='contain'/> 
                <Text className="text-xl text-black font-qbold">Mis autos</Text>
              </XStack>
            </View>
            <View className="w-full h-[17%] items-center justify-center" borderTopColor="#ddd" borderTopWidth={2}>
              <XStack className="w-[80%] items-center justify-start space-x-5" >
                <Image source={icons.history} className="h-6 w-6" tintColor="#aaa" resizeMode='contain'/> 
                <Text className="text-xl text-black font-qbold">Historial</Text>
              </XStack>
            </View>
            <View className="w-full h-[17%] items-center justify-center" borderTopColor="#ddd" borderTopWidth={2}>
              <XStack className="w-[80%] items-center justify-start space-x-5" >
                <Image source={icons.map} className="h-6 w-6" tintColor="#aaa" resizeMode='contain'/> 
                <Text className="text-xl text-black font-qbold">Próximos viajes</Text>
              </XStack>
            </View>
            <View className="w-full h-[17%] items-center justify-center" borderTopColor="#ddd" borderTopWidth={2}>
              <XStack className="w-[80%] items-center justify-start space-x-5" >
                <Image source={icons.id_card} className="h-6 w-6" tintColor="#aaa" resizeMode='contain'/> 
                <Text className="text-xl text-black font-qbold">Credenciales</Text>
              </XStack>
            </View>
          </YStack>
        </YStack>
    </SafeAreaView>
  )
}