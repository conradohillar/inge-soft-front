import { SafeAreaView } from "react-native-safe-area-context";
import { YStack, XStack } from "tamagui";
import BlackButton from "../../components/BlackButton";
import { Text, View } from "react-native";
import DatePicker from '../../components/DatePicker';
import Header from '../../components/Header';
import { Link } from "expo-router";
import CustomInput from "../../components/CustomInput";


export default function SearchTripPage(){

    return (
        <SafeAreaView className="bg-primary h-full">
            <Header />
            <YStack className="flex-1">
                <XStack className="items-center mt-12 mb-9 justify-center w-full">
                    <Text className="text-2xl font-qbold text-secondary">Buscá </Text>
                    <Text className="text-2xl font-qsemibold text-black">tu próximo viaje</Text>
                </XStack>
                <YStack className=" items-center justify-between mb-12">
                    <CustomInput title="Desde" placeholder="Seleccione origen" />
                    <CustomInput title="Hacia" placeholder="Seleccione destino" />
                    <View className="w-full items-flex-start justify-center px-10 pt-3">
                        <Text className="text-xs font-qbold text-gray-600 px-1.5 mb-2">Fecha</Text>
                        <DatePicker style={{backgroundColor:"#EEEEEE"}} placeholderTextColor="#bbb"/>
                    </View>
                </YStack>
                <YStack className="items-center">
                    <BlackButton height={80} width={300} href="/TripDetailsPage"> 
                        <Text className="text-[22px] font-qsemibold text-primary">Viajo yo</Text>
                    </BlackButton>
                    <BlackButton height={80} width={300} mb={35} href=""> 
                        <Text className="text-xl font-qsemibold text-primary">Enviar un paquete</Text>
                    </BlackButton>
                    <Link href="/(tabs)/home">
                        <Text className="text-base font-qsemibold text-red-500">Cancelar búsqueda</Text>
                    </Link>
                </YStack>
            </YStack>
        </SafeAreaView>
    );
}