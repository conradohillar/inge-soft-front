import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { YStack, XStack } from 'tamagui'
import CustomInput from '../../components/CustomInput'
import BlackButton from '../../components/BlackButton'
import { Link } from 'expo-router'

const SignIn = () => {
  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <YStack className="h-full justify-evenly">
        <YStack className="items-center justify-center">
          <Text className="text-black text-5xl font-qbold">Iniciá sesión</Text>
          <Text className="text-black text-4xl font-qbold">con
            <Text className="text-secondary text-4xl font-qbold"> tu cuenta</Text>
          </Text>
        </YStack>
        <YStack className="justify-center">
          <CustomInput title="Nombre de usuario"/>
          <CustomInput title="Contraseña"/>
        </YStack>
        <YStack className="items-center">
          <BlackButton href="/(tabs)/home" height={60} width={220}>
            <Text className="text-primary text-xl font-qsemibold">Ir al Inicio</Text>
          </BlackButton>
          <Link href="/(pages)/LandingPage" asChild>
            <Text className="text-base text-secondary font-qsemibold underline">Volver</Text>
          </Link>
        </YStack>
      </YStack>
    </SafeAreaView>
  )
}

export default SignIn