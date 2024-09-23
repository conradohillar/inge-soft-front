import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";
import icons from "../../constants/icons";
import { Link, useLocalSearchParams } from "expo-router";

export default function PostSuccessful(){
    const {title, section, sectionSource, returnTo, returnToSource, returnToRef } = useLocalSearchParams();
    return (
        <SafeAreaView className="h-full w-full bg-background">
            <YStack className="h-full items-center justify-center">
            <Text className="text-6xl text-primary font-qbold">Genial!</Text>
                <View className="mb-12 mt-12">
                    <Image source={icons.logo} style={{height:250, width:250}} />
                </View>
                <YStack className="items-center space-y-10">
                    <Text className="text-3xl text-black font-qbold">{title}</Text>
                    <Text className="text-xl text-gray-400 font-qbold">Ya podés encontrarlo en la</Text>
                    <XStack className="items-center space-x-3 mb-12">
                        <Text className="text-xl text-gray-400 font-qbold">sección 
                            <Text className="text-xl text-primary font-qbold">  {section}</Text>
                        </Text>
                        <Image source={sectionSource} className="w-8 h-8" tintColor="#59A58A" resizeMode="contain" />
                    </XStack>
                    <Link href={returnToRef} asChild>
                        <XStack className="items-center justify-center space-x-4 mt-5">
                            <Text className="text-black text-2xl font-qbold underline" >{returnTo}</Text>
                            <Image source={returnToSource} className="w-10 h-10" resizeMode="contain" />
                        </XStack>
                    </Link>
                </YStack>
            </YStack>
        </SafeAreaView>
    );
    
}