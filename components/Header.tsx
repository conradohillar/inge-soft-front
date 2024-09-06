import { Menu } from "@tamagui/lucide-icons";
import { XStack, Text, YStack } from "tamagui";


export default function Header(){
    return (
        <XStack className="min-h-[90px] w-full items-center justify-between px-4" style={{borderBottomWidth: 2, borderBottomColor: '#ccc'}}>
            <Menu size="$2.5" color={"black"}/>
            <Text className="text-6xl font-qsemibold text-secondary mt-2">rydio</Text>
        </XStack>
    );
}

