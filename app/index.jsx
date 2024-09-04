import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Paragraph, Spacer, TamaguiProvider, Theme, YStack } from "tamagui";
import config from "../tamagui.config";

export default function App() {
    const colorScheme = useColorScheme();
    return (
        <TamaguiProvider config={config}>
            <Theme name={colorScheme === "dark" ? "dark" : "light"}>
                <SafeAreaView className={"bg-primary h-full"}>
                    <Link href="/home" style={{ color: 'blue'}}>Go to home</Link>
                </SafeAreaView>
            </Theme>
        </TamaguiProvider>
  );
}