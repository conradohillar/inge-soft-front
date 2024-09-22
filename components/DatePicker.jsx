import { useState } from 'react';
import { Input, XStack, YStack } from 'tamagui';
import { Pressable, Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ChevronDown } from '@tamagui/lucide-icons';
import CustomInput from './CustomInput';

export default function DatePicker({style, className, placeholderTextColor, value, onChangeDate, title, ...props}){
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [placeholderText, setPlaceholderText] = useState("Seleccionar fecha");
  const [placeholderColor, setPlaceholderColor] = useState(placeholderTextColor);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    onChangeDate(selectedDate);
    const formatDate = selectedDate.toLocaleDateString('es-ES');  // Formato en español (España)
    setPlaceholderText(formatDate)
    setPlaceholderColor("#000")
    hideDatePicker();
  };

  return (
    <View className="w-full items-center">
      <YStack className="items-start justify-center w-[85%] m-2">
            <View className="w-full items-center">
                <View className="w-[95%]">
                    <Text className="text-xs font-qbold text-gray-600 mb-2">{title}</Text>
                </View>
            </View>
            <Pressable onPress={showDatePicker} style={style} className={`justify-center items-center rounded-xl border-x border-y border-black h-[50px] w-full ${className}` }>
              <XStack className="items-center w-[90%] pr-2 justify-between">
                <Text className="text-sm font-qsemibold text-gray-500 ">{placeholderText}</Text>
                <ChevronDown size={16} color="#000" />
              </XStack>
            </Pressable>
      </YStack>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        value={value}
      />
    </View>
  );

}
