import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { View, Text } from "react-native";
import { YStack, PortalProvider, XStack } from "tamagui";
import BlackButton from "../../components/BlackButton";
import CustomInput from "../../components/CustomInput";
import { Link } from "expo-router";
import DatePicker from "../../components/DatePicker";
import SelectField from "../../components/SelectField";



export default function PostTripPage(){
    return (
        <SafeAreaView className="h-full w-full bg-primary">
            <Header />
            <XStack className=" items-center justify-center mt-12 mb-6">
                <Text className="text-[27px] font-qbold text-secondary">Publicá</Text>
                <Text className="text-[27px] font-qsemibold text-black"> tu viaje</Text>
            </XStack>
            <YStack className="mb-10">
                <CustomInput title="Desde" placeholder="i.e: Tigre" />
                <CustomInput title="Hasta" placeholder="i.e: Mar del Plata" />
                <View className="w-full items-flex-start justify-center px-10 py-3">
                    <Text className="text-xs font-qbold text-black px-1.5 mb-2">Fecha</Text>
                    <DatePicker style={{backgroundColor:"#EEEEEE"}} placeholderTextColor="#bbb"/>
                </View>
                <View className="w-full items-flex-start justify-center py-3 px-10">
                    <Text className="text-xs font-qbold text-black px-1.5">Hora de salida</Text>
                </View>
                <PortalProvider>
                    <SelectField items={hours} label="Horario" renderItem={(hour) => (
                        <Text>{hour.value}</Text>
                    )}/>
                </PortalProvider>
            </YStack>
            <View className="items-center space-y-4">
                <BlackButton height={90} width={270} href="/(pages)/PostTripPage2">
                    <Text className="text-2xl font-qsemibold text-primary">Continuar</Text>
                </BlackButton>
                <Link href="/(tabs)/home" asChild>
                    <Text className="text-base font-qsemibold text-red-500">Cancelar publicación</Text>
                </Link>
            </View>
        </SafeAreaView>
    );
}

const hours = [
    { key: 0, value: '00:00'},
    { key: 1, value: '01:00'},
    { key: 2, value: '02:00'},
    { key: 3, value: '03:00'},
    { key: 4, value: '04:00'},
    { key: 5, value: '05:00'},
    { key: 6, value: '06:00'},
    { key: 7, value: '07:00'},
    { key: 8, value: '08:00'},
    { key: 9, value: '09:00'},
    { key: 10, value: '10:00'},
    { key: 11, value: '11:00'},
    { key: 12, value: '12:00'},
    { key: 13, value: '13:00'},
    { key: 14, value: '14:00'},
    { key: 15, value: '15:00'},
    { key: 16, value: '16:00'},
    { key: 17, value: '17:00'},
    { key: 18, value: '18:00'},
    { key: 19, value: '19:00'},
    { key: 20, value: '20:00'},
    { key: 21, value: '21:00'},
    { key: 22, value: '22:00'},
    { key: 23, value: '23:00'},
]

const renderItemFc = (index) => {
    if (index < 0 || index >= hours.length) {
        return 'Invalid index';
      }
      
      const start = hours[index].value;
      // Manejar el caso en el que el índice es el último en el array
      const end = index === hours.length - 1 ? hours[0].value : hours[index + 1].value;
      
      return `${start} - ${end}`;
    };

  