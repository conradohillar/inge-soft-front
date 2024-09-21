import { Menu } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { Image, View } from "react-native";
import { XStack, Text, YStack, Button } from "tamagui";
import icons from "../constants/icons"


export default function Header(){
    return (
        <XStack className="min-h-[10%] w-full items-center justify-between px-4" style={{borderBottomWidth: 2, borderBottomColor: '#ccc'}}>
            <Button className="w-10 h-10 rounded-2xl bg-background">
                <Image source={icons.settings} className="h-8 w-8" resizeMode="contain" />
            </Button>
            <Link href="/(tabs)/home" asChild>
                <Text className="text-5xl font-qsemibold text-primary mt-2">rydio</Text>
            </Link>
        </XStack>
    );
}

