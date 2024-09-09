import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { View, Text, Image } from "react-native";
import { YStack, XStack, PortalProvider, Button } from "tamagui";
import BlackButton from "../../components/BlackButton";
import { Link } from "expo-router";
import SelectFieldCar from "../../components/SelectFieldCar";
import { User } from "@tamagui/lucide-icons";
import Counter from "../../components/Counter";
import icons from "../../constants/icons";
import React,{useEffect, useState} from "react";
import { useLocalSearchParams } from "expo-router";
import ButtonNext from "../../components/ButtonNext";
import { postRide } from "../../services/postRide";
import { useRouter } from "expo-router";





export default function PostTripPage2(){
    const { fromLocation, toLocation, date, departureTime ,price_person, price_small_package, price_medium_package,price_large_package } = useLocalSearchParams();
    
    
    const [car, setCar] = useState('');
   // const [carPlate, setCarPlate] = useState('');
    const [availableSeats, setAvailableSeats] = useState(0);
    const [spacesSmallPackage, setSmallPackage] = useState(0);
    const [spacesMediumPackage, setMediumPackage] = useState(0);
    const [spacesLargePackage, setLargePackage] = useState(0);
    const router = useRouter();
    const handleContinue = async () => {
        
        const obj = {
            "ride": {
                "city_from":fromLocation,
                "city_to":toLocation,
                "ride_date":date,
                "start_minimum_time":'21:15:00',        //esto hay que poner el que sale del form!!!!!!!!!!!!!!!!!
                "start_maximum_time":'21:15:00',
                "available_space_people":availableSeats,
                "available_space_small_package":spacesSmallPackage,
                "available_space_medium_package":spacesMediumPackage,
                "available_space_large_package":spacesLargePackage,
            },
            "price":{
                "price_person":price_person,
                "price_small_package":price_small_package,
                "price_medium_package":price_medium_package,
                "price_large_package":price_large_package,
            }
        }
        console.log(obj)
        console.log(car)
        // try {
        //   const ans = await postRide(obj,car);
         
        //   router.push({
            
        //     pathname: "/(pages)/PostTripPage2",
        //     params: { fromLocation, toLocation, date, departureTime ,price_person, price_small_package, price_medium_package,price_large_package}
        //   });
        // } catch (error) {
        //   console.error("Error: ", error);
        // }
      };
    
    return (
        <SafeAreaView className="h-full w-full bg-primary">
            <Header />
            <View className=" items-center mt-10 mb-12">
                <Text className="text-[27px] font-qbold text-black">Detalles de la publicación</Text>
            </View>
            <YStack className="items-start justify-center">
                <Text className="text-sm text-black font-qbold ml-10 mb-3">Seleccioná tu 
                    <Text className="text-sm text-secondary font-qbold ml-10 mb-3"> auto</Text>
                </Text>
                <PortalProvider>
                    <SelectFieldCar items={items} label="Mis autos" value={car} handleChangeValue={setCar}
                        renderItem={(item) => (<Text>{item.key}, {item.value}</Text>)} 
                        renderSelected={(item) => renderSelectedCar(item)}/>
                </PortalProvider>
                <XStack className="mx-11 mb-2 mt-12">
                    <Text className='text-sm font-qbold text-black'
                    >Indicá los </Text>
                    <Text className='text-sm font-qbold text-secondary'
                    >espacios disponibles</Text>
                    <Text className='text-sm font-qbold text-black'
                    > en tu auto:</Text>
                </XStack>
                <YStack className="items-center mx-12">
                    <XStack className=" w-[250px] items-center justify-between mb-1 mx-10">
                        <User size="3" color="black"/>
                        <Counter maxCount={4} count={availableSeats} handleChangeCount={setAvailableSeats}/>
                    </XStack>
                    <XStack className=" w-[250px] items-center justify-between mb-1">
                        <Image source={require('../../assets/icons/bag.png')} style={{height:40, width:40}} />
                        <Counter maxCount={4} count={spacesSmallPackage} handleChangeCount={setSmallPackage}/>
                    </XStack>
                    <XStack className=" w-[250px] items-center justify-between mb-10">
                        <Image source={require('../../assets/icons/suitcase.png')} style={{height:40, width:40}} />
                        <Counter maxCount={4} count={spacesMediumPackage} handleChangeCount={setMediumPackage}/>
                    </XStack>
                    <XStack className=" w-[250px] items-center justify-between mb-10">
                        <Image source={require('../../assets/icons/suitcase.png')} style={{height:40, width:40}} />
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

  

