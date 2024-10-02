import { FlatList, SafeAreaView, Text, View, Image } from "react-native"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { LOCAL_IP } from "@env"
import { useEffect, useState } from "react"
import * as SecureStore from "expo-secure-store"
import TripCard from "./TripCard"
import LoadingPage from "../app/(pages)/LoadingPage"
import ErrorPage from "../app/(pages)/ErrorPage"
import TripCardForDriver from "./TripCardForDriver"
import { Button, XStack, YStack } from "tamagui"
import { Link } from "expo-router"
import icons from "../constants/icons"


const renderTripCard = ({ item }) => {
    const rounded = (item.price).toFixed(2);
    const sliced_from = (item.city_from).slice(0,3).toUpperCase();
    const sliced_to = (item.city_to).slice(0,3).toUpperCase();
    return ( 
        <TripCard from={sliced_from} to={sliced_to} driver={item.driver_name} date={item.date} price={rounded} 
                    state={getState(item.state)} />
    );

 }

 const renderTripCardForDriver = ({ item }) => {
    const rounded = (item.price).toFixed(2);
    const sliced_from = (item.city_from).slice(0,3).toUpperCase();
    const sliced_to = (item.city_to).slice(0,3).toUpperCase();
    return ( 
        <TripCardForDriver from={sliced_from} to={sliced_to} driver={item.driver_name} date={item.date} price={rounded}
                    passengers={4} packages={3} state={getState(item.state)} />
    );

 }

 const getState = (state) => {
    if (state === 'pending') {
        return require('../assets/icons/alert.png');
    } else if (state === 'accepted') {
        return require('../assets/icons/alert.png');
    } else if(state === 'dismissed') {
        return require('../assets/icons/alert.png');
    } else 
        return null;
 }

const queryClient = new QueryClient()

 export default function TripList({ type, category }) {
	return (
		<QueryClientProvider client={queryClient} >
			<Content type={type} category={category}/>
		</QueryClientProvider>
	)

}

const Content = ({ type, category }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
		const fetchToken = async () => {
			try {
				const storedToken = await SecureStore.getItemAsync('token');
				if (storedToken) {
					setToken(storedToken);
				}
			} catch (error) {
				console.error('Error fetching token from SecureStore', error);
			}
		};

		fetchToken();
	}, []);

	const headers = {
		Authorization: `Bearer ${token}`,
		'Content-Type': 'application/json'
	};

	const url = `http://${LOCAL_IP}:8000/rides/${type}/${category}`

    console.log(url);

	const { isPending, error, data } = useQuery({
		queryKey: ['fetchTrips'],
		queryFn: () =>
			fetch(url, { headers }).then((res) =>
				res.json(),
			),
		enabled: !!token,
	})

    if (isPending) {
		return <LoadingPage />;
	}

	if (error) {
		return <ErrorPage />;
	}

    console.log(data);

    return (
        <SafeAreaView className="w-full bg-background">
            <YStack className="h-[25%] justify-center mb-5">
                <Link href="/(tabs)/trips" asChild>
                    <Button className="w-7 h-7 bg-background ml-4 mt-5">
                        <Image source={icons.arrowleft} className="w-7 h-7" tintColor="#000" resizeMode="contain"/>
                    </Button>
                </Link>
                <Text className="text-2xl font-qbold text-black text-center">
                    {type === 'upcoming' ? (category === 'driver' ? 'PUBLICADOS' : 'RESERVADOS' ): 'HISTORIAL'}
                </Text>
            </YStack>
            <View className="items-center">
                <FlatList 
                    data={data}
                    keyExtractor={item => item.ride_id}
                    renderItem={category === 'rider' ? renderTripCard : renderTripCardForDriver }
                />
            </View>
        </SafeAreaView>
    );
};