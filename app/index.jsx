import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, Text, View, useColorScheme } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XStack, TamaguiProvider, Theme, YStack } from "tamagui";
import config from "../tamagui.config";
import BlackButton from '../components/BlackButton';

import { images } from "../constants"

export default function App() {
    const colorScheme = useColorScheme();
    return (
        <TamaguiProvider config={config}>
            <Theme name={colorScheme === "dark" ? "dark" : "light"}>
                <SafeAreaView className={"bg-primary h-full"}>
                    <YStack className="flex-1 items-center justify-evenly bg-background">
                        <View className="flex-1.3 justify-end ml-2">
                            <Text className="text-[90px] font-qsemibold text-secondary">
                                rydio
                            </Text>
                        </View>
                        <YStack className="flex-2 items-center justify-center bg-background">
                            <Link href="/home" asChild>
                                <BlackButton height={80} width={300}> 
                                    <Text className="text-[22px] font-qsemibold text-primary">Iniciar sesión</Text>
                                </BlackButton>
                            </Link>
                            <Link href="/home" className='mt-6' asChild>
                                <BlackButton  height={80} width={300}>
                                    <XStack className="items-center justify-center flex-row space-x-3">
                                        <Text className="text-[18px] font-qsemibold text-primary">Continuar con Google</Text>
                                        <Image source={require('../assets/icons/google-icon.png')} className="h-[30px] w-[30px]"/>
                                    </XStack>
                                </BlackButton> 
                            </Link>
                        </YStack>
                        <View className="flex-1.2 justify-start">
                            <Image source={require('../assets/icons/logo.png')} className="h-[150px] w-[150px]"/>
                        </View>
                    </YStack>
                </SafeAreaView>
                <StatusBar theme="dark"/>
            </Theme>
        </TamaguiProvider>
  );
}