import { Input } from 'tamagui';
import { Text, View } from 'react-native';




export default function CustomInput({title, placeholder, width, height, value, handleChangeText}){
    return (
        <View>
            <Text className="text-xs font-qbold text-gray-600 px-1.5 mb-2">{title}</Text>
            <Input placeholder={placeholder} 
                   placeholderTextColor="#bbb" 
                   height={height ? height:50}
                   width={width ? width:200}
                   backgroundColor="#EEEEEE"
                   color="black"
                   textAlignVertical="top"
                   multiline={true}
                   p={15}
                   scrollEnabled={true}
                   value={value}
                   onChangeText={handleChangeText}

                   />
        </View>
    );
}
