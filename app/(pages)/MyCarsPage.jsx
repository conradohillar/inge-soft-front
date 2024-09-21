import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { FlatList, View, Text, ScrollView, Image } from "react-native";
import CarCard from "../../components/CarCard";
import { Button, XStack } from "tamagui";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import icons from "../../constants/icons"
export default function SearchResults(){

    // const { vecRides } = useLocalSearchParams();
    // const parsedRides = JSON.parse(vecRides);
    // console.log('vecRides:', parsedRides);
    
    const renderItem = ({ item }) => {
        return ( 
            <CarCard model={item.value} plate={item.key}/>
        );
    
     }

    return (
        <SafeAreaView className="w-full h-full bg-background">
            <Header />
            <View className="items-start mt-5 ml-4">
                <Link href="/(tabs)/profile" asChild>
                    <Button className="h-9 w-9 bg-background rounded-xl">
                            <Image source={icons.arrowleft} className="h-7 w-7" resizeMode="contain" />
                    </Button>
                </Link>
            </View>
            <XStack className="items-center justify-center mb-7">
                <Text className="text-4xl font-qbold text-black">MIS AUTOS</Text>
            </XStack>
            <FlatList 
                className="w-full"
                data={cars}
                keyExtractor={item => item.key}
                renderItem={renderItem}
            />
            <XStack className="items-center justify-center my-10">
                <Text className="text-lg text-gray-600 font-qsemibold">Agregá un auto nuevo</Text>
                <Button className="h-8 w-8 bg-background rounded-xl ml-3 mt-1">
                    <Image source={icons.add} className="h-6 w-6" resizeMode="contain" />
                </Button>
            </XStack>
        </SafeAreaView>
    );
}

const cars = [
    { key: 'AB-123-CD', value: 'Ford Focus' },
    { key: 'DE-456-FG', value: 'Toyota Corolla' },
    { key: 'HI-789-JK', value: 'Honda Civic' },
    { key: 'LM-000-AR', value: 'Audi A3' },
    { key: 'OM-224-YE', value: 'Chevrolet Camaro' },
    { key: 'KI-777-GG', value: 'Nissan Sentra' },
  ];