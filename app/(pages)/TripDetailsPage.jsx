import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { XStack, YStack, Input } from "tamagui";
import { Backpack, Luggage, User } from "@tamagui/lucide-icons";
import Counter from "../../components/Counter";
import {View, Text, Image} from 'react-native';
import CustomInput from "../../components/CustomInput";
import BlackButton from "../../components/BlackButton";
import {Link} from 'expo-router';

export default function TripDetailsPage(){
    return (
        <SafeAreaView className="h-full w-full bg-primary">
            <Header />
            <YStack className="flex-1 items-center justify-evenly">
                <View className="items-center">
                    <Text className="text-2xl font-qsemibold text-black">Últimos detalles del viaje</Text>
                </View>
                <View className="items-center justify-evenly">
                    <YStack className="items-center">
                        <XStack className=" w-[250px] items-center justify-between mb-2">
                            <User size="3" color="black"/>
                            <Counter maxCount={4}/>
                        </XStack>
                        <XStack className=" w-[250px] items-center justify-between mb-2">
                            <Image source={require('../../assets/icons/bag.png')} style={{height:40, width:40}} />
                            <Counter maxCount={4}/>
                        </XStack>
                        <XStack className=" w-[250px] items-center justify-between mb-5">
                            <Image source={require('../../assets/icons/suitcase.png')} style={{height:40, width:40}} />
                            <Counter maxCount={4}/>
                        </XStack>
                    </YStack>
                    <View className="px-8">
                        <Text className='text-sm font-qsemibold' style={{color:"#aaaaaa"}}
                        >Nota: te recordamos que podés llevar un bolso/mochila sin costo adicional.</Text>
                    </View>
                </View>
                <YStack className="w-full item-center justify-evenly">
                    <CustomInput title="Ingrese las medidas de su/s valija/s" placeholder="i.e: 40cm x 60cm x 30cm"/>
                    <CustomInput title="Comentarios adicionales" placeholder="i.e: Contenido frágil"/>
                </YStack>
                <Link href="/SearchResultsPage" asChild>
                <BlackButton height={70} width={200}>
                    <Text className="text-lg font-qsemibold text-primary">Buscar viaje</Text>
                </BlackButton>
                </Link>
            </YStack>
        </SafeAreaView>
    );
}