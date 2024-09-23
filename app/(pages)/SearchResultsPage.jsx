import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { FlatList, View, Text } from "react-native";
import TripCard from "../../components/TripCard";
import { XStack } from "tamagui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query'
import { LOCAL_IP } from '@env'
import axios from 'axios';
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

const queryClient = new QueryClient();

export default function SearchResults(){
    return (
        <QueryClientProvider client={queryClient}>
            <Content />
        </QueryClientProvider>
    );
}

function Content(){
    const { fromLocation, toLocation, formattedDate, people, smallPacks, mediumPacks, largePacks } = useLocalSearchParams();
    


    const url = `http://${LOCAL_IP}:8000/rides/search?city_from=${fromLocation}&city_to=${toLocation}&date=${formattedDate}&people=${people}&small_packages=${smallPacks}&medium_packages=${mediumPacks}&large_packages=${largePacks}`;

    const { isPending, error, data } = useQuery({
        queryKey: ['fetchRide'],
        queryFn: () =>
            fetch(url).then((res) =>
                res.json(),
            ),
    })
    
      if (isPending) {
        return <LoadingPage />;
      }
    
      if (error) {
        console.log(error.message);
        return <ErrorPage />;
      }



    const renderItem = ({ item }) => {
        const rounded = (item.price).toFixed(2);
        const sliced_from = (item.city_from).slice(0,3).toUpperCase();
        const sliced_to = (item.city_to).slice(0,3).toUpperCase();
        return ( 
            <TripCard from={sliced_from} to={sliced_to} driver={item.driver_name} date={item.date} price={rounded} />
        );

     }
     
     if (data.length === 0) {
        return (
            <SafeAreaView className="w-full h-full bg-background">
                <Header />
                <XStack className="items-center justify-center mt-10 mb-7">
                    <Text className="text-[22px] font-qbold text-secondary">No hay resultados </Text>
                    <Text className="text-[22px] font-qbold text-black">para tu búsqueda</Text>
                </XStack>
            </SafeAreaView>
        );
    }
    return (
        
        <SafeAreaView className="w-full h-full bg-background">
            <Header />
            <XStack className="items-center justify-center mt-10 mb-7">
                <Text className="text-[22px] font-qbold text-secondary">Resultados </Text>
                <Text className="text-[22px] font-qbold text-black">de tu búsqueda</Text>
            </XStack>
            <View className="items-center">
                <FlatList 
                    data={data}
                    keyExtractor={item => item.ride_id}
                    renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    );
}