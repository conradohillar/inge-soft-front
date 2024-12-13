import { useState } from "react";
import { XStack, YStack } from "tamagui";
import { Pressable, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ChevronDown } from "@tamagui/lucide-icons";

export default function DatePicker({
  style,
  className,
  value,
  onChangeDate,
  title,
  hint,
  borderColor,
  ...props
}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [placeholderText, setPlaceholderText] = useState("Seleccionar fecha");
  const [placeholderColor, setPlaceholderColor] = useState("#999");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    onChangeDate(selectedDate);
    const formatDate = selectedDate.toLocaleDateString("es-ES"); // Formato en español (España)
    setPlaceholderText(formatDate);
    setPlaceholderColor("#000");
    hideDatePicker();
  };

  return (
    <View className="w-full items-center">
      <YStack className="items-start justify-center w-[85%]">
        <View className="w-full items-center">
          <View className="w-[95%]">
            <Text className="text-m font-qbold text-gray-600 mb-2">
              {title}
            </Text>
          </View>
        </View>
        <Pressable
          onPress={showDatePicker}
          style={{ backgroundColor: "#F5F5F5" }}
          className={`justify-center items-center rounded-lg ${
            borderColor
              ? borderColor
              : isDatePickerVisible
              ? "border-2 border-primary"
              : "border border-gray-900"
          } h-[55px] w-full ${className}`}
        >
          <XStack className="items-center w-[93%] justify-between">
            <Text
              className="text-sm font-qsemibold"
              style={{ color: placeholderColor }}
            >
              {placeholderText}
            </Text>
            <ChevronDown size={20} color="#999" />
          </XStack>
        </Pressable>
        {hint && (
          <Text className="text-red-500 text-sm font-qsemibold pt-2 px-4 self-start">
            {hint}
          </Text>
        )}
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
