import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { View, Text, Image, ScrollView } from "react-native";
import { YStack, XStack, PortalProvider, Button } from "tamagui";
import BlackButton from "../../components/BlackButton";
import { Link } from "expo-router";
import SelectFieldCar from "../../components/SelectFieldCar";
import { Package, User } from "@tamagui/lucide-icons";
import Counter from "../../components/Counter";
import icons from "../../constants/icons";
import React,{useEffect, useState} from "react";
import { useLocalSearchParams } from "expo-router";
import ButtonNext from "../../components/ButtonNext";
import { postRide } from "../../services/postRide";
import { useRouter } from "expo-router";
import { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query' 
import {LOCAL_IP} from '@env'
import CustomInput from "../../components/CustomInput";

const queryClient = new QueryClient()

export default function PostTripPage2(){
    return(
        <QueryClientProvider client={queryClient} >
          <Content />
        </QueryClientProvider>
    )
  
}



function Content(){
    const { fromLocation, toLocation, formattedDate, departureTime } = useLocalSearchParams(); 
    
    const [car, setCar] = useState('');
   // const [carPlate, setCarPlate] = useState('');
    const [availableSeats, setAvailableSeats] = useState(0);
    const [spacesSmallPackage, setSmallPackage] = useState(0);
    const [spacesMediumPackage, setMediumPackage] = useState(0);
    const [spacesLargePackage, setLargePackage] = useState(0);

        
    const mutation = useMutation({
        mutationFn: (tripData) => {
          return axios.post(`http://${LOCAL_IP}:8000/rides/create/detail?plate=${plate}`, tripData)
        },
      })

    const router = useRouter();
    const handleContinue = async () => {
        console.log("Tenes tanto espacio disponible", availableSeats, spacesLargePackage, spacesMediumPackage,spacesLargePackage)
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
              "price_person": price_person,
              "price_small_package": price_small_package,
              "price_medium_package": price_medium_package,
              "price_large_package": price_large_package
            }
          }

        try {
          const ans = await postRide(obj,car);
         
          router.push({
            
            pathname: "/(pages)/PostSuccessful",
           
          });
        } catch (error) {
          console.error("Error: ", error);
        }
      };

      const url = `http://${LOCAL_IP}:8000/rides/create?location_from=${fromLocation}&location_to=${toLocation}`

      const {isPending, error, data} = useQuery({
        queryKey: ['fetchRide'],
        queryFn: () =>
          fetch(url).then((res) =>
            res.json(),
          ),
      })
      if (isPending) return (
            <View className="items-center h-full justify-center">
                <Text className="text-3xl">Loading...</Text>
            </View>
    )
    
      if (error) return (<Text>An error ocurred: {error.message}</Text>)
    
    const ph1 = data.price_person.toFixed(2).toString()
    const ph2 = data.price_small_package.toFixed(2).toString()
    const ph3 = data.price_medium_package.toFixed(2).toString()
    const ph4 = data.price_large_package.toFixed(2).toString()


    return (
        <SafeAreaView className="h-full w-full bg-primary">
            <Header />
            <View className=" items-center mt-10 mb-12">
                <Text className="text-[27px] font-qbold text-black">Detalles de la publicación</Text>
            </View>
            <ScrollView>
                <YStack className="items-start justify-center">
                    <Text className="text-sm text-black font-qbold ml-10 mb-3">Seleccioná tu 
                        <Text className="text-sm text-secondary font-qbold ml-10 mb-3"> auto</Text>
                    </Text>
                    <PortalProvider>
                        <SelectFieldCar items={items} label="Mis autos" value={car} handleChangeValue={setCar}
                            renderItem={(item) => (<Text>{item.key}, {item.value}</Text>)} 
                            renderSelected={(item) => renderSelectedCar(item)}/>
                    </PortalProvider>
                        <XStack className="mx-11 mb-5 mt-12">
                            <Text className='text-sm font-qbold text-black'>Indicá tus
                                <Text className='text-sm font-qbold text-secondary'>  precios
                                    <Text className='text-sm font-qbold text-black'>  y
                                        <Text className='text-sm font-qbold text-secondary'>  espacios disponibles
                                            <Text className='text-sm font-qbold text-black'>:</Text>
                                        </Text> 
                                    </Text>
                                </Text>
                            </Text>
                        </XStack>
                        <YStack className="items-start">
                            <XStack className=" w-full items-end justify-evenly mb-5">
                                <CustomInput title="Precio por persona" value={data.price_person} placeholder={ph1}/>
                                <Counter maxCount={4} count={availableSeats} handleChangeCount={setAvailableSeats}/>
                            </XStack>
                            <XStack className="w-full items-end justify-evenly mb-5">
                                <CustomInput title="Precio por paquete chico" value={data.price_small_package} placeholder={ph2}/>
                                <Counter maxCount={4} count={spacesSmallPackage} handleChangeCount={setSmallPackage}/>
                            </XStack>
                            <XStack className=" w-full items-end justify-evenly mb-5">
                                <CustomInput title="Precio por paquete mediano" value={data.price_medium_package} placeholder={ph3}/>
                                <Counter maxCount={4} count={spacesMediumPackage} handleChangeCount={setMediumPackage}/>
                            </XStack>
                            <XStack className=" w-full items-end justify-evenly mb-10">
                                <CustomInput title="Precio por paquete grande" value={data.price_large_package} placeholder={ph4}/>
                                <Counter maxCount={4} count={spacesLargePackage} handleChangeCount={setLargePackage}/>
                            </XStack>
                        </YStack>
                    <View className="items-center space-y-5 mx-12 mb-8">
                        <XStack className="items-center">
                            <Link href="/(pages)/PostTripPage" asChild>
                                <Button className="w-8 h-8 bg-primary">
                                    <Image source={icons.arrowleft} className="w-8 h-8" resizeMode="contain" />
                                </Button>
                            </Link>
                            <ButtonNext height={90} width={270} onPress={handleContinue}>
                                <Text className="text-2xl font-qsemibold text-primary">Publicar Viaje</Text>
                            </ButtonNext>
                        </XStack>
                        <Link href="/(tabs)/home" asChild>
                            <Text className="text-base font-qsemibold text-red-500">Cancelar publicación</Text>
                        </Link>
                    </View>
                </YStack>
            </ScrollView>
        </SafeAreaView>
    );

}

const items = [
  { key: 'AB-123-CD', value: 'Ford Focus' },
  { key: 'DE-456-FG', value: 'Toyota Corolla' },
  { key: 'HI-789-JK', value: 'Honda Civic' },
  { key: 'LM-000-AR', value: 'Audi A3' },
];

const renderSelectedCar = (key) => {
    const myItem = items.find((item) => item.key === key)
    return (<Text>{myItem.value}, {key}</Text>);
}

  

