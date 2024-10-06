import React, { useState } from "react";
import { Image, View, Text, Pressable } from "react-native";
import { Button, XStack, YStack, Avatar } from "tamagui";
import icons from '../constants/icons';

export default function RequestCard({ username, photo, people, smallPackages, mediumPackages, largePackages, userId, handleAccept, handleDismiss }) {
    return (
        <View className="py-3">
            <Pressable 
                     style={({ pressed }) => ({ 
                        height:210, width:350, paddingVertical:15, paddingHorizontal:18, marginHorizontal:6,
                        borderWidth:2, borderColor:"#ccc", borderRadius:40,
                        opacity: pressed ? 0.7 : 1,
                        backgroundColor: pressed ? "#cdddcd":"#eee"
                     })}
                     onPress={() => handleOpenDetail(ride_id) }>
                <YStack>
                    <Text className="">{username}, {people} </Text>
                    <Avatar source={photo === '' ? icons.placeholder_profile : photo} className="h-12 w-12" />
                    <XStack className="w-full justify-between">
                        
                        <Button onPress={() => handleAccept(userId)} className="bg-green-500">
                            <Image source={icons.accepted} className="h-10 w-10" resizeMode="contain" />
                        </Button>
                        <Button onPress={() => handleDismiss(userId)} className="bg-red-500">
                            <Image source={icons.dismissed} className="h-10 w-10" resizeMode="contain" />
                        </Button>
                    </XStack>

                </YStack>
            </Pressable>
        </View>
    );
}