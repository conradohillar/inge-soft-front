import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { Button, XStack, YStack } from "tamagui";
import { Package, User } from "@tamagui/lucide-icons";
import Counter from "../../components/Counter";
import { Text, Image} from 'react-native';
import CustomInput from "../../components/CustomInput";
import BlackButton from "../../components/BlackButton";
import {Link} from 'expo-router';
import icons from "../../constants/icons";

export default function SendPackagePage(){
    return (
        <SafeAreaView className="h-full w-full bg-primary">
            <Header />
            <XStack className="items-center mt-10 mb-8 justify-center w-full">
                    <Text className="text-3xl font-qsemibold text-black">Detalles de tu envío</Text>
            </XStack>
            <YStack className="items-start">
                <XStack className="items-center ml-12 mb-1">
                    <Text className="text-black text-base font-qbold underline">Paquetes </Text>
                    <Text className="text-secondary text-base font-qbold underline">chicos: </Text>
                </XStack>
                <XStack className=" w-[350px] items-center justify-evenly ml-10 mb-1">
                    <Package size="3" color="black"/>
                    <Counter maxCount={4}/>
                </XStack>
                <XStack className="w-full items-center justify-center mb-10">
                    <Text className="text-gray-400 text-xs font-qbold ">Medidas: hasta </Text>
                    <Text className="text-secondary text-xs font-qbold opacity-70">30cm</Text>
                </XStack>

                <XStack className="items-center ml-12 mb-3">
                    <Text className="text-black text-base font-qbold underline">Paquetes </Text>
                    <Text className="text-secondary text-base font-qbold underline">medianos: </Text>
                </XStack>
                <XStack className=" w-[350px]  items-center justify-evenly ml-10 mb-2">
                    <Package size="4.5" color="$gray6"/>
                    <Counter maxCount={4}/>
                </XStack>
                <XStack className="w-full items-center justify-center mb-10">
                    <Text className="text-gray-400 text-xs font-qbold ">Medidas: entre </Text>
                    <Text className="text-secondary text-xs font-qbold opacity-70">30cm y 60cm</Text>
                </XStack>

                <XStack className="items-center ml-12 mb-4">
                    <Text className="text-black text-base font-qbold underline">Paquetes </Text>
                    <Text className="text-secondary text-base font-qbold underline">grandes: </Text>
                </XStack>
                <XStack className=" w-[350px]  items-center justify-evenly ml-10 mb-3">
                    <Package size="6" color="$gray5"/>
                    <Counter maxCount={4}/>
                </XStack>
                <XStack className="w-full items-center justify-center mb-8">
                    <Text className="text-gray-400 text-xs font-qbold">Medidas: a partir de </Text>
                    <Text className="text-secondary text-xs font-qbold opacity-70">60cm</Text>
                </XStack>
                <XStack className="w-full items-center justify-center mb-8">
                    <Link href="/(pages)/SearchTripPage" asChild>
                        <Button className="w-7 h-7 bg-primary">
                            <Image source={icons.arrowleft} className="w-8 h-8" resizeMode="contain" />
                        </Button>
                    </Link>
                    <BlackButton height={90} width={230} href="/(pages)/SendPackagePage2">
                        <Text className="text-2xl text-primary font-qsemibold">Continuar</Text>
                    </BlackButton>
                </XStack>
            </YStack>
        </SafeAreaView>
    );
}