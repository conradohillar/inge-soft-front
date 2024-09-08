import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoadingPage(){
    return (
        <SafeAreaView className="h-full w-full bg-primary">
            <View className="flex-1 items-center justify-center space-y-10">
                <Image source={require('../../assets/icons/logo.png')} style={{height:220, width:220}} />
                <Text className="text-8xl text-secondary font-qsemibold">rydio</Text>
            </View>
        </SafeAreaView>
    );
    
}