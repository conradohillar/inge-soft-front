import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { YStack } from 'tamagui'
import CustomInput from '../../components/CustomInput'
import BlackButton from '../../components/BlackButton'
import { Link } from 'expo-router'

export default function SignUp(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);

    // Comparar contraseñas
    if (password !== value) {
      // Handle error
    } else {
     // Continue
    }
  };

  const router = useRouter();
  const handleContinue = async () => {
    
    try {

      router.push({
        pathname: "/(auth)/sign-up2",
        params: { username, password}
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <YStack className="h-full justify-evenly">
        <YStack className="items-center">
          <Text className="text-black text-5xl font-qbold mb-3">Registrá</Text>
          <Text className="text-secondary text-5xl font-qbold">TU CUENTA</Text>
        </YStack>
        <YStack className="justify-center">
          <CustomInput title="Nombre de usuario" value={username} handleChangeText={setUsername}/>
          <CustomInput title="Ingresá tu contraseña" value={password} handleChangeText={setPassword}/>
          <CustomInput title="Confirmá tu contraseña" value={confirmPassword} handleChangeText={handleConfirmPasswordChange}/>
        </YStack>
        <YStack className="items-center">
          <BlackButton href="/(auth)/sign-up2" height={60} width={220}>
            <Text className="text-primary text-xl font-qsemibold">Continuar</Text>
          </BlackButton>
          <Link href="/(pages)/LandingPage" asChild>
            <Text className="text-base text-red-500 font-qsemibold underline">Cancelar</Text>
          </Link>
        </YStack>
      </YStack>
    </SafeAreaView>
  )
}
