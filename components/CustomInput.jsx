import { Input } from 'tamagui';
import { Text, View } from 'react-native';

export default function CustomInput({ title, placeholder, value, onChangeText }) {
  return (
    <View className="w-full items-flex-start justify-center py-3 px-10">
      <Text className="text-xs font-qsemibold text-gray-600 px-1.5 mb-2">{title}</Text>
      <Input
        placeholder={placeholder}
        placeholderTextColor="#bbb"
        style={{ backgroundColor: "#EEEEEE" }}
        value={value} // Asegúrate de pasar el valor actual
        onChangeText={onChangeText} // Asegúrate de pasar la función de actualización del estado
      />
    </View>
  );
}
