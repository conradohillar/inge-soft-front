import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import { Spinner } from "tamagui";

export default function LoadingPage(){
    return (
        <>
        <SafeAreaView className="h-full w-full bg-background">
            <View className="flex-1 items-center justify-center space-y-20">
                <View className="items-center">
                    <Text className="text-4xl text-black font-qbold">Estamos cargando</Text>
                    <Text className="text-4xl text-primary font-qbold"> tus datos
                        <Text className="text-4xl text-black font-qsemibold"> ...</Text>
                    </Text>
                </View>
                <Image source={require('../../assets/icons/logo.png')} style={{height:220, width:220}} />
                <Spinner size="large" color="$green10" />
            </View>
        </SafeAreaView>
        <StatusBar style="dark"/>
        </>
    );
    
}