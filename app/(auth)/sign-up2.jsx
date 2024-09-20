import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, Button, XStack, YStack } from 'tamagui'
import CustomInput from '../../components/CustomInput'
import BlackButton from '../../components/BlackButton'
import { Link } from 'expo-router'
import icons from "../../constants/icons"

const SignUp2 = () => {
  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <YStack className="h-full justify-evenly">
        <YStack className="items-center">
          <Text className="text-black text-4xl font-qbold">Detalles</Text>
          <Text className="text-black text-3xl font-qsemibold">de 
            <Text className="text-secondary text-3xl font-qbold"> TU PERFIL</Text>
          </Text>
        </YStack>
        <YStack className="items-center">
          <Avatar circular size="$12" borderColor="$black" borderWidth={1}>
            <Avatar.Image
              accessibilityLabel="Cam"
              src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
            />
            <Avatar.Fallback backgroundColor="$gray5" />
          </Avatar>
          <Text className="text-sm text-gray-500 font-qsemibold mt-3">Agregá una foto de perfil</Text>
        </YStack>
        <YStack className="justify-center">
          <CustomInput title="E-mail"/>
          <CustomInput title="Número de teléfono (opcional)"/>
        </YStack>
        <XStack className="w-full items-center justify-evenly">
          <Link href="/(auth)/sign-up" asChild>
            <Button className="bg-primary">
              <Image source={icons.arrowleft} className="h-7 w-7" resizeMode='contain'/>
            </Button>
          </Link>
          <BlackButton href="/(tabs)/home">
            <Text className="text-primary text-xl font-qsemibold">Ir al Inicio</Text>
          </BlackButton>
        </XStack>
      </YStack>
    </SafeAreaView>
  )
}

export default SignUp2