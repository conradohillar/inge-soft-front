import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { Button, XStack, YStack } from "tamagui";
import { User, Package } from "@tamagui/lucide-icons";
import Counter from "../../components/Counter";
import { View, Text, Image } from 'react-native';
import CustomInput from "../../components/CustomInput";
import BlackButton from "../../components/BlackButton";
import { Link } from 'expo-router';
import icons from "../../constants/icons";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ButtonNext from "../../components/ButtonNext";


export default function TripDetailsPage() {

    const { fromLocation, toLocation, formattedDate } = useLocalSearchParams();
    const [formData, setFormData] = useState({
        people: 0,
        smallPacks: 0,
        mediumPacks: 0,
        largePacks: 0,
    });

    const setPeople = (count) => {
        setFormData((prev) => ({ ...prev, people: count }));
    };

    const setMediumPacks = (count) => {
        setFormData((prev) => ({ ...prev, mediumPacks: count }));
    };

    const setLargePacks = (count) => {
        setFormData((prev) => ({ ...prev, largePacks: count }));
    };




    const router = useRouter();

    const handleSearch = async () => {

        try {
            router.push({

                pathname: "/(pages)/SearchResultsPage",
                params: { fromLocation, toLocation, formattedDate, people: formData.people, smallPacks: formData.smallPacks, mediumPacks: formData.mediumPacks, largePacks: formData.largePacks },
            });
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return (
        <SafeAreaView className="h-full w-full bg-background">
            <Header />
            <YStack className="flex-1 items-center justify-evenly">
                <View className="items-center">
                    <Text className="text-2xl font-qbold text-black">Últimos detalles del viaje</Text>
                </View>
                <View className="items-center justify-evenly">
                    <YStack className="items-center">
                        <XStack className=" w-[250px] items-center justify-between ">
                            <User size="3" color="black" />
                            <Counter maxCount={4} count={formData.people} handleChangeCount={setPeople} />
                        </XStack>
                        <XStack className="items-center ml-12 mb-3">
                            <Text className="text-black text-base font-qbold underline">Paquetes </Text>
                            <Text className="text-secondary text-base font-qbold underline">medianos: </Text>
                        </XStack>
                        <XStack className=" w-[350px]  items-center justify-evenly ml-10 mb-2">
                            <Package size="4.5" color="$gray6" />
                            <Counter maxCount={4} count={formData.mediumPacks} handleChangeCount={setMediumPacks} />
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
                            <Package size="6" color="$gray5" />
                            <Counter maxCount={4} count={formData.largePacks} handleChangeCount={setLargePacks} />
                        </XStack>
                        <XStack className="w-full items-center justify-center mb-8">
                            <Text className="text-gray-400 text-xs font-qbold">Medidas: a partir de </Text>
                            <Text className="text-secondary text-xs font-qbold opacity-70">60cm</Text>
                        </XStack>
                    </YStack>
                    <View className="px-8">
                        <Text className='text-sm text-gray-400 font-qsemibold'
                        >Nota: te recordamos que podés llevar un bolso/mochila sin costo adicional.</Text>
                    </View>
                </View>

                <XStack className="items-center mb-3">
                    <Link href="/(pages)/SearchTripPage" asChild>
                        <Button className="w-6 h-6 bg-background">
                            <Image source={icons.arrowleft} className="w-7 h-7" resizeMode="contain" />
                        </Button>
                    </Link>
                    <View className="w-3/4 items-center justify-center">
                        <ButtonNext onPress={handleSearch}>
                            <Text className="text-2xl font-qsemibold text-white">Buscar viaje</Text>
                        </ButtonNext>
                    </View>
                </XStack>
            </YStack>
        </SafeAreaView>
    );
}