import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { FlatList, View, Text } from "react-native";
import TripCard from "../../components/TripCard";

export default function SearchResults(){
    const renderItem = ({ item }) => (
        <TripCard from={item.from} to={item.to} driver={item.driver} date={item.date} price={item.price} />

      );

    return (
        <SafeAreaView className="w-full h-full bg-primary">
            <Header />
            <View className="items-center mt-10 mb-7">
                <Text className="text-[22px] font-qbold text-black">Resultados de tu búsqueda</Text>
            </View>
            <FlatList 
                data={trips}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
}

const trips = [
    { id: '1', from:'BUE', to:'MDQ', driver:"Conrado Hillar", date:'10-09-2024', price:10000},
    { id: '2', from:'BUE', to:'MDQ', driver:"Conrado Hillar", date:'10-09-2024', price:10000},
    { id: '3', from:'BUE', to:'MDQ', driver:"Conrado Hillar", date:'10-09-2024', price:10000},
    { id: '4', from:'BUE', to:'MDQ', driver:"Conrado Hillar", date:'10-09-2024', price:10000},
    { id: '5', from:'BUE', to:'MDQ', driver:"Conrado Hillar", date:'10-09-2024', price:10000},
    // Agrega más datos aquí
  ];