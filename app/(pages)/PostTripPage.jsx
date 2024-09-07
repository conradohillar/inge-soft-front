import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { View, Text } from "react-native";
import { YStack } from "tamagui";
import BlackButton from "../../components/BlackButton";
import CustomInput from "../../components/CustomInput";
import { Link } from "expo-router";


export default function PostTripPage(){
    return (
        <SafeAreaView className="h-full w-full bg-primary">
            <Header />
            <View className=" items-center mt-16 mb-16">
                <Text className="text-[27px] font-qsemibold text-black">Publicá tu viaje</Text>
            </View>
            <YStack className="flex-1">
                <CustomInput title="Desde" placeholder="i.e: Tigre" />
                <CustomInput title="Hasta" placeholder="i.e: Mar del Plata" />
            </YStack>
            <View className="flex-1 items-center space-y-4">
                <BlackButton height={80} width={250}>
                    <Text className="text-2xl font-qsemibold text-primary">Continuar</Text>
                </BlackButton>
                <Link href="/(tabs)/home" asChild>
                    <Text className="text-base font-qsemibold text-red-500">Cancelar propuesta</Text>
                </Link>
            </View>
        </SafeAreaView>
    );
}