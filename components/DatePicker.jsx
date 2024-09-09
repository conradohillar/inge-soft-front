import { useState } from 'react';
import { Input, YStack } from 'tamagui';
import { Pressable, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function DatePicker({style, className, ...props}){
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  return (
    <YStack>
      <Pressable onPress={showDatePicker}>
        <Input 
          style={style}
          className={className}
          placeholder="Seleccionar fecha" 
          editable={false}  // Deshabilita la edición directa
          {...props}
        />
      </Pressable>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={date}
      />
    </YStack>
  );

}