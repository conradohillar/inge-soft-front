import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { YStack } from 'tamagui'
import CustomInput from '../../components/CustomInput'
import BlackButton from '../../components/BlackButton'

const SignUp = () => {
  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <YStack className="h-full justify-evenly">
        <YStack className="items-center">
          <Text className="text-black text-5xl font-qbold mb-3">Registrá</Text>
          <Text className="text-secondary text-5xl font-qbold">TU CUENTA</Text>
        </YStack>
        <YStack className="justify-center">
          <CustomInput title="Nombre de usuario"/>
          <CustomInput title="Ingresá tu contraseña"/>
          <CustomInput title="Confirmá tu contraseña"/>
        </YStack>
        <BlackButton href="/(auth)/sign-up2">
          <Text className="text-primary text-xl font-qsemibold">Continuar</Text>
        </BlackButton>
      </YStack>
    </SafeAreaView>
  )
}

export default SignUp