import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { YStack, XStack } from 'tamagui'
import CustomInput from '../../components/CustomInput'
import ButtonNext from '../../components/ButtonNext'
import { Link, useRouter } from 'expo-router'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query' 
import LoadingPage from '../(pages)/LoadingPage'

const queryClient = new QueryClient()

export default function AddCarPage(){
  return (
    <QueryClientProvider client={queryClient} >
      <Content />
    </QueryClientProvider>
  )
  
}

const Content = () => {
  const [model, setModel] = useState('')
  const [plate, setPlate] = useState('')

  const router = useRouter();

  const handleContinue = async () => {
    
    try {

      router.push({
        pathname: "/(tabs)/home",
        params: { model, plate}
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const {isPending, error, data} = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then((res) =>
        res.json(),
      ),
  })

  if (isPending) return (<LoadingPage/>)

  if (error) return (<Text>An error ocurred: {error.message}</Text>)  

  return (
      <SafeAreaView className="bg-background h-full w-full">
        <YStack className="h-full justify-evenly">
          <YStack className="items-center justify-center">
            <Text className="text-black text-4xl font-qbold">Cargá los datos</Text>
            <Text className="text-black text-4xl font-qbold">de
              <Text className="text-primary text-4xl font-qbold"> tu auto</Text>
            </Text>
          </YStack>
          <YStack className="items-center justify-center">
            <CustomInput title="Modelo" value={model} handleChangeText={setModel}/>
            <CustomInput title="Patente" value={plate} handleChangeText={setPlate}/>
          </YStack>
          <YStack className="items-center space-y-5">
            <ButtonNext height={60} width={220} onPress={handleContinue}>
              <Text className="text-white text-xl font-qsemibold">Agregar auto</Text>
            </ButtonNext>
            <Link href="/(pages)/MyCarsPage" asChild>
              <Text className="text-base text-primary font-qsemibold underline">Volver</Text>
            </Link>
          </YStack>
        </YStack>
      </SafeAreaView>
    )
  }
