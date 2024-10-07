import React, { useState } from "react";
import { Image, View, Text, Pressable } from "react-native";
import { Button, XStack, YStack, Avatar } from "tamagui";
import icons from "../constants/icons";

export default function RequestCard({
  username,
  photo,
  people,
  smallPackages,
  mediumPackages,
  largePackages,
  userId,
  handleAccept,
  handleDismiss,
}) {
  return (
    <View className="py-3">
      <Pressable
        style={({ pressed }) => ({
          height: 270,
          width: 350,
          paddingVertical: 15,
          paddingHorizontal: 18,
          marginHorizontal: 6,
          borderWidth: 2,
          borderColor: "#ccc",
          borderRadius: 40,
          backgroundColor: "#eee",
        })}
      >
        <YStack className="w-full">
          <XStack className="w-full items-center justify-start ml-4 space-x-3 mb-6">
            <Avatar circular size="$7" borderColor="$black" borderWidth={1}>
              <Avatar.Image
                src={photo === "" ? icons.placeholder_profile : photo}
              />
              <Avatar.Fallback backgroundColor="$gray8" />
            </Avatar>
            <YStack>
              <Text className="font-qbold text-base mb-1 mt-2">{username}</Text>
              <Text className="font-qsemibold text-sm underline text-gray-500">
                Ver perfil del pasajero
              </Text>
            </YStack>
          </XStack>
          <YStack className="w-full items-start mb-8">
            <Text className="font-qsemibold text-gray-600 text-base mb-1 ml-3">
              Espacios reservados:
            </Text>
            <XStack className="w-full justify-evenly items-center">
              <XStack className="space-x-2 items-center">
                <Image
                  source={icons.profile2}
                  className="h-5 w-5"
                  resizeMode="contain"
                />
                <Text className="font-qsemibold text-gray-600 text-base">
                  {people}
                </Text>
              </XStack>
              <XStack className="space-x-2 items-center">
                <Image
                  source={icons.mypackage}
                  className="h-5 w-5"
                  resizeMode="contain"
                />
                <Text className="font-qsemibold text-gray-600 text-base">
                  {smallPackages}
                </Text>
              </XStack>
              <XStack className="space-x-2 items-center">
                <Image
                  source={icons.mypackage}
                  className="h-6 w-6"
                  resizeMode="contain"
                />
                <Text className="font-qsemibold text-gray-600 text-base">
                  {mediumPackages}
                </Text>
              </XStack>
              <XStack className="space-x-2 items-center">
                <Image
                  source={icons.mypackage}
                  className="h-7 w-7"
                  resizeMode="contain"
                />
                <Text className="font-qsemibold text-gray-600 text-base">
                  {largePackages}
                </Text>
              </XStack>
            </XStack>
          </YStack>
          <XStack className="w-full justify-evenly">
            <Button
              onPress={() => handleAccept(userId)}
              className="w-20 h-11 bg-green-400 rounded-3xl border-1 border-black"
            >
              <Image
                source={icons.tick}
                className="h-8 w-8"
                resizeMode="contain"
              />
            </Button>
            <Button
              onPress={() => handleDismiss(userId)}
              className="w-30 h-11 bg-red-400 rounded-3xl border-1 border-black"
            >
              <Image
                source={icons.cross}
                className="h-10 w-10"
                resizeMode="contain"
              />
            </Button>
          </XStack>
        </YStack>
      </Pressable>
    </View>
  );
}
