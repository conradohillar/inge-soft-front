import React, { useState } from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function DropdownComponent({
  data,
  placeholder,
  value,
  setValue,
}) {
  const [isFocused, setIsFocused] = useState(false);

  const renderItem = (item) => {
    return (
      <View className="p-4 flex-row justify-between items-center">
        <Text className="flex-1 text-lg">{item.label}</Text>
        {item.value === value && (
          <AntDesign className="mr-2" color="black" name="Safety" size={20} />
        )}
      </View>
    );
  };

  return (
    <Dropdown
      className={`w-[98%] bg-[#EEE] rounded-lg text-black p-4 ${
        isFocused ? "border-2 border-primary" : "border border-gray-900"
      }`}
      placeholderStyle="text-lg"
      selectedTextStyle="text-lg"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      inputSearchStyle="h-10 text-lg"
      iconStyle="w-5 h-5"
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      searchPlaceholder="Buscar..."
      value={value}
      onChange={(item) => setValue(item.value)}
      renderItem={renderItem}
    />
  );
}
