import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';

export default function FrontPage(){
    return (
        <>
        <SafeAreaView className="h-full w-full bg-background">
            <View className="flex-1 items-center justify-center space-y-10">
                <Image source={require('../../assets/icons/logo.png')} style={{height:220, width:220}} />
                <Text className="text-8xl text-primary font-qsemibold">rydio</Text>
            </View>
        </SafeAreaView>
        <StatusBar style="dark"/>
        </>
    );
    
}