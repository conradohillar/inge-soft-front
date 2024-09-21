import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { YStack } from 'tamagui'
import CustomInput from '../../components/CustomInput'
import ButtonNext from '../../components/ButtonNext'
import { Link, useRouter } from 'expo-router'
import AutocompleteCityInput from '../../components/AutocompleteCityInput'

export default function SignUp(){
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  
    
  const router = useRouter();
  
  const handleContinue = async () => {
    
    try {

      router.push({
        pathname: "/(auth)/sign-up2",
        params: { email, userName, address }
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  return (
    <SafeAreaView className="bg-background h-full w-full">
      <YStack className="h-full justify-evenly">
        <YStack className="items-center">
          <Text className="text-black text-5xl font-qbold mb-3">Registrá</Text>
          <Text className="text-primary text-5xl font-qbold">TU CUENTA</Text>
        </YStack>
        <YStack className="items-center justify-center">
          <CustomInput title="Nombre" value={userName} handleChangeText={setUserName}/>
          <AutocompleteCityInput title="Dirección" placeholder="i.e: Tigre" value={address} onChangeText={setAddress}/>
          <CustomInput title="E-mail" value={email} handleChangeText={setEmail}/>
          
          
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
  )
}
