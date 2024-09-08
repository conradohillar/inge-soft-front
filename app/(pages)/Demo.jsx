import { Text, View } from "react-native";

export default function Demo(){
    return (
        <View className="h-full w-full bg-primary items-center justify-center">
            {renderSelect('21:00')}
        </View>
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

const renderSelect = (value) => {
    const index = hours.findIndex(h => h.value === value)
    // Verifica que el índice esté dentro de los límites
    if (index < 0 || index >= hours.length || hours.length === 0) {
      return 'Invalid index';
    }

    const myHour = hours[index];
    // Si el índice es el último, considera un ciclo (vuelve al primero)
    const nextHour = index === hours.length - 1 ? hours[0] : hours[index + 1];
    
    return (
        <Text className="text-black text-2xl font-qsemibold">{myHour.value} - {nextHour.value}</Text> 
    );
  };
  