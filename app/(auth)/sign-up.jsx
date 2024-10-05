import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { YStack } from 'tamagui'
import CustomInput from '../../components/CustomInput'
import ButtonNext from '../../components/ButtonNext'
import { Link, useRouter } from 'expo-router'
import AutocompleteCityInput from '../../components/AutocompleteCityInput';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'


export default function SignUp() {
  const [userName, setUserName] = useState('');
  const [dni, setDni] = useState('');
  const [address, setAddress] = useState('');


  const router = useRouter();

  const handleContinue = async () => {

    try {

      router.push({
        pathname: "/(auth)/sign-up2",
        params: { dni, userName, address }
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} // "padding" para iOS, "height" para Android
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="bg-background h-full w-full">
          <YStack className="h-full justify-evenly">
            <YStack className="items-center">
              <Text className="text-black text-5xl font-qbold mb-3">Registrá</Text>
              <Text className="text-primary text-5xl font-qbold">TU CUENTA</Text>
            </YStack>
            <YStack className="items-center justify-center">
              <CustomInput title="Nombre" value={userName} handleChangeText={setUserName} />
              <CustomInput title="DNI" value={dni} handleChangeText={setDni} />
              <AutocompleteCityInput
                title="Dirección"
                placeholder="i.e: Tigre"
                setValue={setAddress}
              />
            </YStack>
            <YStack className="items-center">
              <ButtonNext height={90} width={270} onPress={handleContinue}>
                <Text className="text-2xl font-qsemibold text-white">Continuar</Text>
              </ButtonNext>
              <Link href="/(pages)/LandingPage" asChild>
                <Text className="text-base text-red-500 font-qsemibold underline">Cancelar</Text>
              </Link>
            </YStack>
          </YStack>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
