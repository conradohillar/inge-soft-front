import { Menu } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { View } from "react-native";
import { XStack, Text, YStack } from "tamagui";


export default function Header(){
    return (
        <XStack className="min-h-[10%] w-full items-center justify-between px-4" style={{borderBottomWidth: 2, borderBottomColor: '#ccc'}}>
            <Menu size="$2.5" color={"black"}/>
            <Link href="/(tabs)/home" asChild>
                <Text className="text-5xl font-qsemibold text-primary mt-2">rydio</Text>
            </Link>
        </XStack>
    );
}

