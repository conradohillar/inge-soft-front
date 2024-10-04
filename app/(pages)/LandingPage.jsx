import { Image, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XStack, YStack } from "tamagui";
import BlackButton from '../../components/BlackButton';
import { StatusBar } from 'expo-status-bar';

export default function LandingPage() {

    return (
        <>
            <SafeAreaView className="bg-backgound h-full w-full flex-1">
                <YStack className="h-full items-center justify-evenly w-full">
                    <View className="justify-end ml-2 flex">
                        <Text className="text-[95px] font-qsemibold text-primary">
                            rydio
                        </Text>
                    </View>
                    <YStack className="items-center justify-center w-full h-[50%] space-y-2">
                        <View className="w-[90%]">
                            <BlackButton href="/(auth)/sign-in">
                                <Text className="text-[22px] font-qsemibold text-white">Iniciar sesión</Text>
                            </BlackButton>
                        </View>
                        <View className="w-[90%]">
                            <BlackButton href="/(pages)/TripDetail" variant={"secondary"}>
                                <XStack className="items-center justify-center flex-row space-x-3">
                                    <Text className="text-[22px] font-qsemibold text-white">Continuar sin cuenta</Text>
                                </XStack>
                            </BlackButton>
                        </View>
                        <XStack className="w-full items-center justify-center mt-5">
                            <Text className="text-[18px] text-black font-qsemibold">No tenés cuenta?  </Text>
                            <Link href="/(auth)/sign-up" asChild>
                                <Text className="text-[18px] text-primary font-qbold underline">Registrate</Text>
                            </Link>
                        </XStack>
                    </YStack>
                    <View className="justify-start">
                        <Image source={require('../../assets/icons/logo.png')} className="h-[150px] w-[150px]" />
                    </View>
                </YStack>
            </SafeAreaView>
            <StatusBar style="dark" />
        </>
    );
}