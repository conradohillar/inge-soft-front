import { Image, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XStack, YStack } from "tamagui";
import BlackButton from '../../components/BlackButton';
import { StatusBar } from 'expo-status-bar';

export default function LandingPage(){
    return (
        <>
        <SafeAreaView className="bg-backgound h-full w-full flex-1">
            <YStack className="h-full items-center justify-evenly w-full">
                <View className="justify-end ml-2 flex">
                    <Text className="text-[90px] font-qsemibold text-secondary">
                        rydio
                    </Text>
                </View>
                <YStack className="items-center justify-center w-full h-[50%]">
                    <BlackButton href="/(tabs)/home" height={"20%"} width={"80%"}> 
                        <Text className="text-[22px] font-qsemibold text-white">Iniciar sesión</Text>
                    </BlackButton>
                    <BlackButton href="/(tabs)/home" height={"20%"} width={"80%"}>
                        <XStack className="items-center justify-center flex-row space-x-3">
                            <Text className="text-[18px] font-qsemibold text-white">Continuar con Google</Text>
                            <Image source={require('../../assets/icons/google-icon.png')} className="h-[30px] w-[30px]"/>
                        </XStack>
                    </BlackButton> 
                    <XStack className="w-full items-center mt-2">
                        <Text className="text-sm text-black font-qsemibold">No tenés cuenta?  </Text>
                        <Link href="/(auth)/sign-up" asChild>
                            <Text className="text-sm text-secondary font-qbold underline">Registrate</Text>
                        </Link>
                    </XStack>
                </YStack>
                <View className="justify-start">
                    <Image source={require('../../assets/icons/logo.png')} className="h-[150px] w-[150px]"/>
                </View>
            </YStack>
            <StatusBar style="dark"/>
        </SafeAreaView>
        <StatusBar style="dark"/>
        </>
    );
}