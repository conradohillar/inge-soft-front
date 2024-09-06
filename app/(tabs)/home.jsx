import { View, Text } from 'react-native'
import React from 'react'
import { Input, XStack, YStack } from 'tamagui'
import BlackButton from '../../components/BlackButton'

const Home = () => {
  return (
    <YStack className="flex-1 items-center justify-evenly bg-primary">
      <View className="flex-1 items-center justify-center">
        <Text className="text-[30px] font-qsemibold text-black">Buscá tu viaje</Text>
      </View>
      <XStack className="flex-1 items-center justify-center">
        <Input className='px-4 font-qsemibold w-[300px]' placeholder="Buscar..." style={{backgroundColor:"#EEEEEE"}} />
      </XStack>
      <YStack className="flex-2 items-center justify-evenly">
        <BlackButton height={55} width={250}>
          <Text className="text-[22px] font-qsemibold text-primary">Publicar viaje</Text>
        </BlackButton>
        <Text className="text-[15px] font-qsemibold text-secondary">¿Querés publicar un viaje?</Text>
      </YStack>
    </YStack>
  )
}

export default Home