import { useState } from 'react';
import { Input, YStack } from 'tamagui';
import { Pressable, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ChevronDown } from '@tamagui/lucide-icons';

export default function DatePicker({style, className, placeholderTextColor, value,onChangeDate, ...props}){
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
    <YStack>
      <Pressable onPress={showDatePicker}>
        <Input 
          style={style}
          className={className}
          placeholder={placeholderText}
          placeholderTextColor={placeholderColor}
          value={value}
          editable={false}  // Deshabilita la edición directa
          {...props} />
      </Pressable>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        value={value}
      />
    </YStack>
  );

}