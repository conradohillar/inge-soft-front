import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { View, Text, Image, ScrollView } from "react-native";
import { YStack, XStack, PortalProvider, Button } from "tamagui";
import { Link } from "expo-router";
import SelectFieldCar from "../../components/SelectFieldCar";
import Counter from "../../components/Counter";
import icons from "../../constants/icons";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ButtonNext from "../../components/ButtonNext";
import { useRouter } from "expo-router";
import { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query'
import { LOCAL_IP } from '@env'
import CustomInput from "../../components/CustomInput";
import axios from 'axios';
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import * as SecureStore from 'expo-secure-store';
import { KeyboardAvoidingView, Platform } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

const queryClient = new QueryClient()

export default function PostTripPage2() {
	return (
		<QueryClientProvider client={queryClient} >
			<Content />
		</QueryClientProvider>
	)

}



function Content() {
	const { fromLocation, toLocation, formattedDate, departureTime } = useLocalSearchParams();

	const [car, setCar] = useState('');
	// const [carPlate, setCarPlate] = useState('');
	const [availableSeats, setAvailableSeats] = useState(0);
	const [spacesSmallPackage, setSmallPackage] = useState(0);
	const [spacesMediumPackage, setMediumPackage] = useState(0);
	const [spacesLargePackage, setLargePackage] = useState(0);
	const [pricePerson, setPricePerson] = useState(0);
	const [priceSmallPackage, setPriceSmallPackage] = useState(0);
	const [priceMediumPackage, setPriceMediumPackage] = useState(0);
	const [priceLargePackage, setPriceLargePackage] = useState(0);
	const [token, setToken] = useState(null);


	const mutation = useMutation({
		mutationFn: (tripData) => {

			const headers = {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			};

			return axios.post(`http://${LOCAL_IP}:8000/rides/create/detail?plate=${car}`, tripData, { headers })
		},
	})

	const router = useRouter();

	const handleContinue = async () => {


		const obj = {
			"ride": {
				"city_from": fromLocation,
				"city_to": toLocation,
				"ride_date": formattedDate,
				"start_minimum_time": "19:20:13.381Z",
				"start_maximum_time": "19:20:13.381Z",
				"available_space_people": availableSeats,
				"available_space_small_package": spacesSmallPackage,
				"available_space_medium_package": spacesMediumPackage,
				"available_space_large_package": spacesLargePackage
			},
			"price": {
				"price_person": pricePerson,
				"price_small_package": priceSmallPackage,
				"price_medium_package": priceMediumPackage,
				"price_large_package": priceLargePackage
			}
		}

		mutation.mutate(obj);

	};



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

	const url = `http://${LOCAL_IP}:8000/rides/create?location_from=${fromLocation}&location_to=${toLocation}`

	const { isPending, error, data } = useQuery({
		queryKey: ['fetchRide'],
		queryFn: () =>
			fetch(url, { headers }).then((res) =>
				res.json(),
			),
		enabled: !!token,
	})


	useEffect(() => {
		if (data) {

			setPricePerson(data.prices.price_person.toFixed(2));
			setPriceSmallPackage(data.prices.price_small_package.toFixed(2));
			setPriceMediumPackage(data.prices.price_medium_package.toFixed(2));
			setPriceLargePackage(data.prices.price_large_package.toFixed(2));
			setCar(data.cars[0].plate);
		}
	}, [data]);

	useEffect(() => {
		const handleSuccess = async () => {
			if (mutation.isSuccess) {

				const title = "Publicaste tu viaje"
				const section = "MIS VIAJES"
				const sectionSource = icons.car
				const returnTo = "Volver al Inicio"
				const returnToSource = icons.home
				const returnToRef = "/(tabs)/home"

				router.push({
					pathname: "/(pages)/PostSuccessful",
					params: { title, section, sectionSource, returnTo, returnToSource, returnToRef }
				});
			}
		};

		handleSuccess();
	}, [mutation.isSuccess]);

	if (mutation.isLoading || isPending) {
		return <LoadingPage />;
	}

	if (mutation.isError || error) {
		return <ErrorPage />;
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"} // "padding" para iOS, "height" para Android
			style={{ flex: 1 }}
		>
			<SafeAreaView className="h-full w-full bg-background">
				<Header />
				<View className=" items-center mt-10 mb-12">
					<Text className="text-[27px] font-qbold text-black">Detalles de la publicación</Text>
				</View>
				<ScrollView>
					<YStack className="items-start justify-center">
						<Text className="text-sm text-black font-qbold ml-10 mb-3">Seleccioná tu
							<Text className="text-sm text-primary font-qbold ml-10 mb-3"> auto</Text>
						</Text>
						<PortalProvider>
							<SelectFieldCar items={data.cars} label="Mis autos" value={car} handleChangeValue={setCar}
								renderItem={(item) => (<Text>{item.plate}, {item.model}</Text>)}
								renderSelected={(item) => renderSelectedCar(data.cars, item)} />
						</PortalProvider>
						<XStack className="mx-11 mb-5 mt-12">
							<Text className='text-sm font-qbold text-black'>Indicá tus
								<Text className='text-sm font-qbold text-primary'> precios
									<Text className='text-sm font-qbold text-black'> y
										<Text className='text-sm font-qbold text-primary'> espacios disponibles
											<Text className='text-sm font-qbold text-black'>:</Text>
										</Text>
									</Text>
								</Text>
							</Text>
						</XStack>
						<YStack className="items-start">
							<XStack className=" w-full items-end justify-evenly mb-2 pr-5">
								<View className="flex-row items-center justify-between w-[60%]">
									<CustomInput title="Precio por persona" value={pricePerson} handleChangeText={setPricePerson} />
								</View>
								<Counter maxCount={4} count={availableSeats} handleChangeCount={setAvailableSeats} />
							</XStack>
							<XStack className="w-full items-end justify-between mb-2 pr-5">
								<View className="flex-row items-center justify-between w-[60%]">
									<CustomInput title="Precio por paquete chico" value={priceSmallPackage} handleChangeText={setPriceSmallPackage} />
								</View>
								<Counter maxCount={4} count={spacesSmallPackage} handleChangeCount={setSmallPackage} />
							</XStack>
							<XStack className=" w-full items-end justify-evenly mb-2 pr-5">
								<View className="flex-row items-center justify-between w-[60%]">
									<CustomInput title="Precio por paquete mediano" value={priceMediumPackage} handleChangeText={setPriceMediumPackage} />
								</View>
								<Counter maxCount={4} count={spacesMediumPackage} handleChangeCount={setMediumPackage} />
							</XStack>
							<XStack className=" w-full items-end justify-evenly mb-8 pr-5">
								<View className="flex-row items-center justify-between w-[60%]">
									<CustomInput title="Precio por paquete grande" value={priceLargePackage} handleChangeText={setPriceLargePackage} />
								</View>
								<Counter maxCount={4} count={spacesLargePackage} handleChangeCount={setLargePackage} />
							</XStack>
						</YStack>
						<View className="items-center space-y-5 mx-12 mb-8">
							<XStack className="items-center">
								<Link href="/(pages)/PostTripPage" asChild>
									<Button className="w-8 h-8 bg-background">
										<Image source={icons.arrowleft} className="w-8 h-8" resizeMode="contain" />
									</Button>
								</Link>
								<ButtonNext height={90} width={270} onPress={handleContinue}>
									<Text className="text-2xl font-qsemibold text-white">Publicar Viaje</Text>
								</ButtonNext>
							</XStack>
							<Link href="/(tabs)/home" asChild>
								<Text className="text-base font-qsemibold text-red-500">Cancelar publicación</Text>
							</Link>
						</View>
					</YStack>
				</ScrollView>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);

}


const renderSelectedCar = (items, plate) => {
	const myItem = items.find((item) => item.plate === plate)
	return (<Text>{myItem.model}, {plate}</Text>);
}



