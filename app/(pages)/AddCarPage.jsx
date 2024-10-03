import { Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { YStack, XStack, ScrollView } from 'tamagui'
import CustomInput from '../../components/CustomInput'
import ButtonNext from '../../components/ButtonNext'
import { Link, useRouter } from 'expo-router'
import LoadingPage from '../(pages)/LoadingPage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ErrorPage from '../(pages)/ErrorPage'
import { icons } from '../../constants'
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { newCar } from '../../services/users'




export default function AddCarPage() {
  const queryClient = useQueryClient();
  const [model, setModel] = useState('')
  const [plate, setPlate] = useState('')
  const [color, setColor] = useState('')

  const mutation = useMutation({
    mutationFn: (carData) => newCar(carData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCars'] })
      queryClient.invalidateQueries({ queryKey: ['getRideData'] })
      router.push({
        pathname: "/(pages)/PostSuccessful",
        params: {
          title: "Agregaste tu auto!",
          section: "Mis autos",
          sectionSource: icons.car,
          returnTo: "Volver a Mis autos",
          returnToSource: icons.car,
          returnToRef: "/(pages)/MyCarsPage"
        }
      });
    }
  })


  const router = useRouter();

  const handleContinue = () => {
    const obj = {
      "model": model,
      "plate": plate,
      "color": color
    }

    mutation.mutate(obj);
  };


  if (mutation.isPending) {
    return <LoadingPage />;
  }

  if (mutation.isError) {
    return <ErrorPage />;
  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} // "padding" para iOS, "height" para Android
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} className={"h-full"}>
        <SafeAreaView className="bg-background h-full w-full">
          <ScrollView className="h-full">
          <YStack className="h-full justify-evenly">
            <YStack className="items-center justify-center">
              <Text className="text-black text-4xl font-qbold">Cargá los datos</Text>
              <Text className="text-black text-4xl font-qbold">de
                <Text className="text-primary text-4xl font-qbold"> tu auto</Text>
              </Text>
            </YStack>
            <YStack className="items-center justify-center">
              <CustomInput title="Modelo" value={model} handleChangeText={setModel} />
              <CustomInput title="Patente" value={plate} handleChangeText={setPlate} />
              <CustomInput title="Color" value={color} handleChangeText={setColor} />
            </YStack>
            <YStack className="items-center">
              <ButtonNext onPress={handleContinue}>
                <Text className="text-white text-xl font-qsemibold">Agregar auto</Text>
              </ButtonNext>
              <Link href="/(pages)/MyCarsPage" asChild>
                <Text className="text-base text-primary font-qsemibold underline">Volver</Text>
              </Link>
            </YStack>
          </YStack>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
