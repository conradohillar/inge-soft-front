import { Image, View, Text, Pressable,  } from "react-native";
import { XStack, YStack, Avatar , Button} from "tamagui";
import icons from '../constants/icons';
import { useState } from "react";

export default function CarCard({model, plate}){
    

    const handleDelete = () => {
        //implementaaar
    }

    return (
        <View className="w-full items-center my-3">
            <Pressable 
                    style={({ pressed }) => ({ 
                        width:"85%", height:150, paddingTop:20, paddingHorizontal: 30,
                        borderWidth:2, borderColor:"#aaa", borderRadius:40,
                        backgroundColor: "#eee"
                    })}
                    >
                <YStack>
                    <XStack className="items-start justify-between">
                        <YStack className="space-y-3">
                            <XStack className="space-x-5 items-center">
                                <Text className="text-black text-2xl font-qbold">{model}</Text>
                                <Image source={icons.car} className="h-10 w-10" tintColor="#bbb" resizeMode="contain"/>
                            </XStack>
                            <Text className="text-base font-qsemibold text-grey-500">Patente: {plate}</Text>
                        </YStack>
                    </XStack>
                    <View className="items-end mb-3">
                        <Pressable onPress={handleDelete} style={({ pressed }) => ({backgroundColor: pressed ? "#fdcdcd":"#eee"})}>
                            <Image source={icons.trash} className="h-7 w-7" tintColor="#c00" resizeMode="contain"/>
                        </Pressable>
                    </View>
                </YStack>
            </Pressable>
        </View>
    );
}