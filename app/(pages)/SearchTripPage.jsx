import { SafeAreaView } from "react-native-safe-area-context";
import { YStack, XStack } from "tamagui";
import BlackButton from "../../components/BlackButton";
import { Text, View } from "react-native";
import DatePicker from '../../components/DatePicker';
import Header from '../../components/Header';
import { Link } from "expo-router";
import CustomInput from "../../components/CustomInput";
import { useState } from "react";
import AutocompleteCityInput from '../../components/AutocompleteCityInput';
import ButtonNext from "../../components/ButtonNext";
import { useRouter } from "expo-router";
import { format } from 'date-fns';




export default function SearchTripPage(){
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [date, setDate] = useState('');

    const router = useRouter();



    const handleViajoYo = async () => {
     
      try {
        const formattedDate = format(date, 'yyyy-MM-dd'); // YYYY-MM-DD
        router.push({
          
          pathname: "/(pages)/TripDetailsPage",
          params: { fromLocation, toLocation, formattedDate }
        });
      } catch (error) {
        console.error("Error: ", error);
      }
    };

  
  const handleEnviarPaquete = async () => {
    try {
    const formattedDate = format(date, 'yyyy-MM-dd'); // YYYY-MM-DD
      
      router.push({
        
        pathname: "/(pages)/SendPackagePage",
        params: { fromLocation, toLocation, formattedDate }
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  
    return (
        <SafeAreaView className="bg-background h-full">
            <Header />
            <YStack className="flex-1">
                <XStack className="items-center mt-12 mb-9 justify-center w-full">
                    <Text className="text-[26px] font-qbold text-secondary">Buscá </Text>
                    <Text className="text-[26px] font-qsemibold text-black">tu próximo viaje</Text>
                </XStack>
                <YStack className=" items-center justify-between mb-10">
                <AutocompleteCityInput
                    title="Desde"
                    placeholder="Seleccionar origen"
                    value={fromLocation}
                    onChangeText={setFromLocation}
                />
                <AutocompleteCityInput
                    title="Hasta"
                    placeholder="Seleccionar destino"
                    value={toLocation}
                    onChangeText={setToLocation}
                />
                    <View className="w-full items-flex-start justify-center px-10 pt-3">
                        <Text className="text-xs font-qbold text-gray-600 px-1.5 mb-2">Fecha</Text>
                        <DatePicker style={{backgroundColor:"#EEEEEE"}} placeholderTextColor="#bbb" value={date} onChangeDate={setDate}/>
                    </View>
                </YStack>
                <YStack className="items-center">
                    <ButtonNext width={"80%"} onPress={handleViajoYo}>
                        <Text className="text-2xl font-qsemibold text-white">Viajo yo</Text>
                    </ButtonNext>
                    <ButtonNext width={"80%"} onPress={handleEnviarPaquete} mb={15}>
                        <Text className="text-2xl font-qsemibold text-white">Enviar un paquete</Text>
                    </ButtonNext>
                    <Link href="/(tabs)/home">
                        <Text className="text-base font-qsemibold text-red-500">Cancelar búsqueda</Text>
                    </Link>
                </YStack>
            </YStack>
        </SafeAreaView>
    );
}