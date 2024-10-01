import { useState } from 'react';
import { YStack, XStack } from 'tamagui';
import { Pressable, Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ChevronDown } from '@tamagui/lucide-icons';
import CustomInput from './CustomInput';

export default function TimePicker({style, className, placeholderTextColor, value, onChangeTime, minuteInterval, title, ...props}){
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [placeholderText, setPlaceholderText] = useState("Seleccionar hora");
  const [placeholderColor, setPlaceholderColor] = useState(placeholderTextColor);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (selectedTime) => {
    onChangeTime(selectedTime);
    const formatTime = selectedTime.toLocaleTimeString('es-ES', { // Formato en español (España)
      hour: '2-digit',
      minute: '2-digit',
      second: undefined // Esto es para evitar mostrar los segundos
    });  
    setPlaceholderText(formatTime)
    setPlaceholderColor("#000")
    hideTimePicker();
  };

  return (
    <View className="w-full items-center">
      <YStack className="items-start justify-center w-[85%] m-2">
            <View className="w-full items-center">
                <View className="w-[95%]">
                    <Text className="text-m font-qbold text-gray-600 mb-2">{title}</Text>
                </View>
            </View>
            <Pressable onPress={showTimePicker} style={style} className={`justify-center items-center rounded-xl border-x border-y border-black h-[50px] w-full ${className}` }>
              <XStack className="items-center w-[90%] pr-2 justify-between">
                <Text className="text-sm font-qsemibold text-gray-500 ">{placeholderText}</Text>
                <ChevronDown size={16} color="#000" />
              </XStack>
            </Pressable>
      </YStack>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time" // Change mode to "time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
        value={value}
        minuteInterval={minuteInterval}
      />
    </View>
  );
}
