import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { View, Text, Image } from "react-native";
import { YStack,XStack, PortalProvider, Button } from "tamagui";
import BlackButton from "../../components/BlackButton";
import { Link } from "expo-router";
import SelectField from "../../components/SelectField";
import {  User } from "@tamagui/lucide-icons";
import Counter from "../../components/Counter";
import icons from "../../constants/icons";



export default function PostTripPage2(){
    return (
        <SafeAreaView className="h-full w-full bg-primary">
            <Header />
            <View className=" items-center mt-10 mb-12">
                <Text className="text-[27px] font-qsemibold text-black">Detalles de la publicación</Text>
            </View>
            <YStack className="items-start justify-center">
                <Text className="text-sm text-black font-qbold ml-10 mb-3">Seleccioná tu auto</Text>
                <PortalProvider>
                    <SelectField items={items} label="Seleccioná tu auto" renderItem={(item) => (
                        <Text>{item.value}, {item.key}</Text>
                    )} />
                </PortalProvider>
                <View className="mx-11 mb-2 mt-12">
                    <Text className='text-sm font-qbold text-black'
                    >Indicá los espacios disponibles en tu auto:</Text>
                </View>
                <YStack className="items-center mx-12">
                    <XStack className=" w-[250px] items-center justify-between mb-1 mx-10">
                        <User size="3" color="black"/>
                        <Counter maxCount={4}/>
                    </XStack>
                    <XStack className=" w-[250px] items-center justify-between mb-1">
                        <Image source={require('../../assets/icons/bag.png')} style={{height:40, width:40}} />
                        <Counter maxCount={4}/>
                    </XStack>
                    <XStack className=" w-[250px] items-center justify-between mb-12">
                        <Image source={require('../../assets/icons/suitcase.png')} style={{height:40, width:40}} />
                        <Counter maxCount={4}/>
                    </XStack>
                </YStack>

                <View className="items-center space-y-3 mx-12">
                    <XStack className="items-center space-x-5">
                        <Link href="/(pages)/PostTripPage" asChild>
                            <Button className="w-8 h-8 bg-primary">
                                <Image source={icons.arrowleft} className="w-8 h-8" resizeMode="contain" />
                            </Button>
                        </Link>
                        <BlackButton height={80} width={250}>
                            <Text className="text-2xl font-qsemibold text-primary">Publicar viaje</Text>
                        </BlackButton>
                    </XStack>
                    <Link href="/(tabs)/home" asChild>
                        <Text className="text-base font-qsemibold text-red-500">Cancelar publicación</Text>
                    </Link>
                </View>
            </YStack>
        </SafeAreaView>
    );
}

const items = [
    { key: 'AB-123-CD', value: 'Ford Focus' },
    { key: 'DE-456-FG', value: 'Toyota Corolla'},
    { key: 'HI-789-JK', value: 'Honda Civic' },
    { key: 'LM-000-AR', value: 'Audi A3' },
]
