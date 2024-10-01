import { Menu } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { Image, View, Text } from "react-native";
import { XStack, YStack, Button } from "tamagui";
import icons from "../constants/icons"


export default function Header(){
    return (
        <XStack className="min-h-[8%] w-full items-center justify-between px-4 bg-background" style={{borderBottomWidth: 2, borderBottomColor: '#ccc'}}>
            <Link href="/(tabs)/home" asChild>
                <Text className="text-4xl font-qbold text-primary mt-2">rydio</Text>
            </Link>
            <Button className="w-10 h-10 rounded-2xl bg-background">
                <Image source={icons.settings} className="h-8 w-8" resizeMode="contain" />
            </Button>
        </XStack>
    );
}

