import { useState } from 'react';
import { Input, YStack } from 'tamagui';
import { Pressable, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ChevronDown } from '@tamagui/lucide-icons';

export default function DatePicker({style, className,value,onChangeDate, ...props}){
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    onChangeDate(selectedDate);
    hideDatePicker();
  };

  return (
    <YStack>
      <Pressable onPress={showDatePicker}>
        <Input 
          style={style}
          className={className}
          placeholder="Seleccionar fecha" 
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