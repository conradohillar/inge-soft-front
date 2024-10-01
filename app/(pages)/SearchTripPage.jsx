import { useState } from "react";
import { format } from 'date-fns';
import { useRouter } from "expo-router";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { KeyboardAvoidingView, Platform, SafeAreaView, Text, View } from "react-native";
import { YStack, XStack, ScrollView } from "tamagui";
import AutocompleteCityInput from '../../components/AutocompleteCityInput';
import ButtonNext from "../../components/ButtonNext";
import DatePicker from '../../components/DatePicker';
import Header from '../../components/Header';
import { Link } from "expo-router";




export default function SearchTripPage() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [date, setDate] = useState('');

  const router = useRouter();



  const handleViajoYo = async () => {

    try {
      const formattedDate = format(date, 'yyyy-MM-dd'); // YYYY-MM-DD
      router.push({

        pathname: "/(pages)/SearchTripPerson",
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

        pathname: "/(pages)/SearchTripPackage",
        params: { fromLocation, toLocation, formattedDate }
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="h-full">
      <SafeAreaView className="h-full bg-background">
        <Header />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"} // "padding" para iOS, "height" para Android
          style={{ flex: 1 }}
        >
          <ScrollView className="h-full">

            <YStack className="flex-1">
              <XStack className="items-center mt-12 mb-9 justify-center w-full">
                <Text className="text-[26px] font-qbold text-primary">Buscá </Text>
                <Text className="text-[26px] font-qsemibold text-black">tu próximo viaje</Text>
              </XStack>
              <YStack className=" items-center justify-between mb-10">
                <AutocompleteCityInput
                  title="Desde"
                  placeholder="Seleccionar origen"
                  value={fromLocation}
                  onChangeText={setFromLocation}
                  className={"bg-black"}
                />
                <AutocompleteCityInput
                  title="Hasta"
                  placeholder="Seleccionar destino"
                  value={toLocation}
                  onChangeText={setToLocation}
                />
                <View className="w-full items-flex-start justify-center pt-3">
                  <DatePicker className={'bg-[#EEE]'} placeholderTextColor="#888" value={date} onChangeDate={setDate} title={"Fecha de salida"} />
                </View>
              </YStack>
              <YStack className="items-center">
                <View className="w-[92%]">
                  <ButtonNext onPress={handleViajoYo} variant={"secondary"}>
                    <Text className="text-2xl font-qsemibold text-white">Viajo yo</Text>
                  </ButtonNext>
                </View>
                <View className="w-[92%] mb-2">
                  <ButtonNext onPress={handleEnviarPaquete}>
                    <Text className="text-2xl font-qsemibold text-white">Enviar un paquete</Text>
                  </ButtonNext>
                </View>
                <Link href="/(tabs)/home">
                  <Text className="text-base font-qsemibold text-red-500">Cancelar búsqueda</Text>
                </Link>
              </YStack>
            </YStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>

  );
}