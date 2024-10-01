import { Input, YStack } from 'tamagui';
import { Text, View, TextInput } from 'react-native';
import { useState } from 'react';




export default function CustomInput({ title, placeholder, height, value, handleChangeText, editable = true, secureTextEntry = false, autoComplete, inputMode, multiline=true }) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <YStack className="items-start justify-center w-full m-2">
            <View className="w-full items-center">
                <View className="w-[85%]">
                    <Text className="text-m font-qbold text-gray-600 px-1.5 mb-2">{title}</Text>
                </View>
            </View>
            <View className="w-full items-center">
                <TextInput
                    inputMode={inputMode}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor="#888"
                    backgroundColor="#EEE"
                    color="black"
                    textAlignVertical="top"
                    className={`w-[85%] bg-[#EEE] rounded-lg text-black p-4 ${isFocused ? 'border-2 border-primary' : 'border border-gray-900'}`}
                    multiline={multiline}
                    height={height}
                    p={15}
                    scrollEnabled={true}
                    value={value}
                    onChangeText={handleChangeText}
                    editable={editable}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </View>
        </YStack>
    );
}
