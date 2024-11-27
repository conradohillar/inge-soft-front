import { Input, YStack, Label, XStack } from "tamagui";
import { useState } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import icons from "../constants/icons";

export default function CustomInput({
  title,
  placeholder,
  height,
  width,
  value,
  handleChangeText,
  keyboardType = "default",
  editable = true,
  secureTextEntry = false,
  autoComplete,
  inputMode,
  multiline = true,
  hint,
  borderColor,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <YStack className={`w-[${width ? width : "85%"}] m-2 items-center`}>
      <Label className="text-m font-qbold text-gray-600 px-2 self-start">
        {title}
      </Label>
      <XStack width="100%" alignItems="center" position="relative">
        <Input
          keyboardType={keyboardType}
          inputMode={inputMode}
          placeholder={placeholder}
          autoComplete={autoComplete}
          secureTextEntry={secureTextEntry && !showPassword}
          multiline={multiline}
          height={height ? height : 55}
          value={value}
          onChangeText={handleChangeText}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          backgroundColor="#F5F5F5"
          borderWidth={isFocused ? 2 : 1}
          color="#000"
          fontFamily="Quicksand-Semibold"
          placeholderTextColor="#999"
          width="100%"
          className={`${
            borderColor
              ? borderColor
              : isFocused
              ? "border-primary"
              : "border-gray-900"
          }`}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: 10,
              padding: 5,
            }}
          >
            <Image
              source={showPassword ? icons.eyeOff : icons.eye}
              className="w-6 h-6"
              style={{ tintColor: "#888" }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </XStack>
      {hint && (
        <Text className="text-red-500 text-sm font-qsemibold pt-2 px-5 self-start">
          {hint}
        </Text>
      )}
    </YStack>
  );
}
