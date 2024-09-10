import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { Button, XStack, YStack } from "tamagui";
import { User } from "@tamagui/lucide-icons";
import Counter from "../../components/Counter";
import {View, Text, Image} from 'react-native';
import CustomInput from "../../components/CustomInput";
import BlackButton from "../../components/BlackButton";
import {Link} from 'expo-router';
import icons from "../../constants/icons";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ButtonNext from "../../components/ButtonNext";
import { searchRides } from "../../services/searchPeopleRide";

export default function TripDetailsPage(){

    const { fromLocation, toLocation, formattedDate } = useLocalSearchParams();

    const [passengers, setPassengers] = useState(0);
    const [bags, setBags] = useState(0);
    const [suitcases, setSuitcases] = useState(0);
    // const [measurements, setMeasurments] = useState('');
    // const [comments, setComments] = useState('');
    const router = useRouter();
    
    const handleSearch = async () => {

      
        
     
        try {
            

          
            const vecRides = await searchRides(fromLocation, toLocation, formattedDate, passengers, bags, suitcases)

            const vecRidesString = JSON.stringify(vecRides);
          router.push({
            
            pathname: "/(pages)/SearchResultsPage",
            params: { vecRides : vecRidesString }
          });
        } catch (error) {
          console.error("Error: ", error);
        }
      };

    return (
        <SafeAreaView className="h-full w-full bg-primary">
            <Header />
            <YStack className="flex-1 items-center justify-evenly">
                <View className="items-center">
                    <Text className="text-2xl font-qbold text-black">Últimos detalles del viaje</Text>
                </View>
                <View className="items-center justify-evenly">
                    <YStack className="items-center">
                        <XStack className=" w-[250px] items-center justify-between ">
                            <User size="3" color="black"/>
                            <Counter maxCount={4} count={passengers} handleChangeCount={setPassengers}/>
                        </XStack>
                        <XStack className=" w-[250px] items-center justify-between ">
                            <Image source={require('../../assets/icons/bag.png')} style={{height:40, width:40}} />
                            <Counter maxCount={4} count={bags} handleChangeCount={setBags}/>
                        </XStack>
                        <XStack className=" w-[250px] items-center justify-between mb-5">
                            <Image source={require('../../assets/icons/suitcase.png')} style={{height:40, width:40}} />
                            <Counter maxCount={4} count={suitcases} handleChangeCount={setSuitcases}/>
                        </XStack>
                    </YStack>
                    <View className="px-8">
                        <Text className='text-sm text-gray-400 font-qsemibold' 
                        >Nota: te recordamos que podés llevar un bolso/mochila sin costo adicional.</Text>
                    </View>
                </View>
                <YStack className="w-full item-center justify-evenly">
                    <CustomInput title="Ingrese las medidas de su/s valija/s" placeholder="i.e: 40cm x 60cm x 30cm" />
                                {/* //  value={measurements} handleChangeText={setMeasurments} /> */}
                    <CustomInput title="Comentarios adicionales" placeholder="i.e: Contenido frágil" />
                                {/* //  value={comments} handleChangeText={setComments} /> */}
                </YStack>
                <XStack className="items-center mb-3">
                    <Link href="/(pages)/SearchTripPage" asChild>
                        <Button className="w-6 h-6 bg-primary">
                            <Image source={icons.arrowleft} className="w-7 h-7" resizeMode="contain" />
                        </Button>
                    </Link>
                    <ButtonNext height={90} width={270} onPress={handleSearch}>
                        <Text className="text-2xl font-qsemibold text-primary">Buscar viaje</Text>
                    </ButtonNext>
                </XStack>
            </YStack>
        </SafeAreaView>
    );
}