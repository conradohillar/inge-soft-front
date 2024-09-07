import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { View, Text } from "react-native";
import { YStack } from "tamagui";
import BlackButton from "../../components/BlackButton";
import CustomInput from "../../components/CustomInput";
import { Link } from "expo-router";
import DatePicker from "../../components/DatePicker";


export default function PostTripPage(){
    return (
        <SafeAreaView className="h-full w-full bg-primary">
            <Header />
            <View className=" items-center mt-16 mb-12">
                <Text className="text-[27px] font-qsemibold text-black">Publicá tu viaje</Text>
            </View>
            <YStack className="flex-1 mb-12">
                <CustomInput title="Desde" placeholder="i.e: Tigre" />
                <CustomInput title="Hasta" placeholder="i.e: Mar del Plata" />
                <View className="w-full items-flex-start justify-center px-10 pt-3">
                    <Text className="text-xs font-qsemibold text-gray-600 px-1.5 mb-2">Fecha</Text>
                    <DatePicker style={{backgroundColor:"#EEEEEE"}} placeholderTextColor="#bbb"/>
                </View>
            </YStack>
            <View className="flex-1 items-center space-y-4">
                <Link href="/(pages)/PostTripPage2" asChild>
                <BlackButton height={80} width={250}>
                    <Text className="text-2xl font-qsemibold text-primary">Continuar</Text>
                </BlackButton>
                </Link>
                <Link href="/(tabs)/home" asChild>
                    <Text className="text-base font-qsemibold text-red-500">Cancelar publicación</Text>
                </Link>
            </View>
        </SafeAreaView>
    );
}