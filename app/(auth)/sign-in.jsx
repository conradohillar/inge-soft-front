import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { YStack, XStack } from 'tamagui'
import CustomInput from '../../components/CustomInput'
import { Link } from 'expo-router'
import ButtonNext from '../../components/ButtonNext'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query' 

const queryClient = new QueryClient()

export default function SignIn(){
  return (
    <QueryClientProvider client={queryClient} >
      <Content />
    </QueryClientProvider>
  )
  
}

const Content = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const handleContinue = async () => {
    
    try {

      router.push({
        pathname: "/(tabs)/home",
        params: { username, password}
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

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message  

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
          <CustomInput title="Nombre de usuario" value={username} handleChangeText={setUsername}/>
          <CustomInput title="Contraseña" value={password} handleChangeText={setPassword}/>
        </YStack>
        <YStack className="items-center">
          <ButtonNext height={60} width={220} onPress={handleContinue}>
            <Text className="text-primary text-xl font-qsemibold">Ir al Inicio</Text>
          </ButtonNext>
          <Link href="/(pages)/LandingPage" asChild>
            <Text className="text-base text-secondary font-qsemibold underline">Volver</Text>
          </Link>
        </YStack>
      </YStack>
    </SafeAreaView>
  )
}
