import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { Text, View, Image } from "react-native";
import { YStack, XStack, Button } from "tamagui";
import CustomInput from "../../components/CustomInput";
import { Link } from "expo-router";
import BlackButton from "../../components/BlackButton";
import icons from "../../constants/icons"

export default function SendPackagePage2(){
    return (
        <SafeAreaView className="bg-primary h-full w-full">
            <Header />
            <YStack className="h-full justify-center space-y-10">
                <YStack className="items-center space-y-2">
                    <Text className="text-black text-3xl font-qbold">¿Querés dejar algún</Text>
                    <Text className="text-secondary text-4xl font-qbold">comentario</Text>
                    <Text className="text-black text-3xl font-qbold">sobre tus paquetes?</Text>
                </YStack>
                <View className="items-start mb-10">
                    <CustomInput title="Comentarios adicionales" 
                                 placeholder="i.e: Contenido frágil " 
                                 height={180}/> 
                </View>
                <XStack className="w-full items-center justify-center mb-8">
                    <Link href="/(pages)/SearchTripPage" asChild>
                        <Button className="w-7 h-7 bg-primary">
                            <Image source={icons.arrowleft} className="w-8 h-8" resizeMode="contain" />
                        </Button>
                    </Link>
                    <BlackButton height={90} width={250} href="/(pages)/SearchResultsPage">
                        <Text className="text-2xl text-primary font-qsemibold">Buscar viaje</Text>
                    </BlackButton>
                </XStack>
            </YStack>
        </SafeAreaView>
    );
}