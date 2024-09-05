import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useColorScheme, Image } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Paragraph, ScrollView, Spacer, TamaguiProvider, Theme, YStack, Button } from "tamagui";
import config from "../tamagui.config";

import { images } from "../constants"

export default function App() {
    const colorScheme = useColorScheme();
    return (
        <TamaguiProvider config={config}>
            <Theme name={colorScheme === "dark" ? "dark" : "light"}>
                <SafeAreaView className={"bg-primary h-full justify-center items-center"}>
                        <Image source={images.logo} resizeMode="contain" className="w-[200px] h-[200px]"/>
                        <Button color="black" borderRadius={30} size="$5" width="85%" theme="active" className={"color-white font-qsemibold text-xl text-center"}>
                            continuar con email
                        </Button>
                        <Text className={"color-secondary font-qsemibold text-7xl py-10"}>
                            rydio
                        </Text>
                    
                </SafeAreaView>

                <StatusBar backgroundColor='#FFFFFF' style="dark"/>
            </Theme>
        </TamaguiProvider>
  );
}