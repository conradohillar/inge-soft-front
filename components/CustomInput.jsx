import { Input, YStack } from 'tamagui';
import { Text, View } from 'react-native';
import { useState } from 'react';




export default function CustomInput({title, placeholder, width, height, value, handleChangeText, editable = true}){
    const [isFocused, setIsFocused] = useState(false);

    return (
        <YStack className="items-start justify-center w-full m-2">
            <View className="w-full items-center">
                <View className="w-[85%]">
                    <Text className="text-xs font-qbold text-gray-600 px-1.5 mb-2">{title}</Text>
                </View>
            </View>
            <View className="w-full items-center">
                <Input placeholder={placeholder} 
                       placeholderTextColor="#888" 
                       backgroundColor="#EEE"
                       color="black"
                       textAlignVertical="top"
                       className="w-[85%]"
                       multiline={true}
                       p={15}
                       scrollEnabled={true}
                       value={value}
                       onChangeText={handleChangeText}
                       editable={editable}
                       onFocus={() => setIsFocused(true)}
                       onBlur={() => setIsFocused(false)}
                       style={{
                           borderColor: isFocused ? '#59A58A' : '#aaa',
                           borderWidth: isFocused ? 3 : 1
                       }}
                       />
            </View>
        </YStack>
    );
}
