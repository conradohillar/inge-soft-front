import React, { useState } from "react";
import { Image, View, Text, Pressable } from "react-native";
import { Button, XStack, YStack, Avatar } from "tamagui";
import icons from "../constants/icons";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

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
          transform: [{ scale: pressed ? 0.98 : 1 }],
        })}
      >
        <View
          className="h-[300px] w-[350px] mx-1.5 rounded-[32px] bg-[#fafafa] border border-gray-100 overflow-hidden"
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <LinearGradient
            colors={["#59A58A", "#7AB5A0"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              paddingVertical: 15,
              paddingHorizontal: 18,
            }}
          >
            <XStack className="items-center space-x-3">
              <Avatar circular size="$8" borderColor="white" borderWidth={2}>
                <Avatar.Image
                  src={photo === "" ? icons.placeholder_profile : photo}
                />
                <Avatar.Fallback backgroundColor="$gray8" />
              </Avatar>
              <YStack space="$1">
                <Text className="font-qbold text-lg text-white">
                  {username}
                </Text>
                <Link
                  href={{
                    pathname: "/(pages)/UserProfile",
                    params: { user_id: userId, category: "rider" },
                  }}
                  asChild
                >
                  <Text className="font-qsemibold text-sm text-white/80 underline">
                    Ver perfil del pasajero
                  </Text>
                </Link>
              </YStack>
            </XStack>
          </LinearGradient>
          <YStack className="w-full items-start mb-8 bg-[#fafafa]">
            <Text className="font-qsemibold text-gray-600 text-base my-3 ml-3">
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
          <XStack className="w-full justify-evenly bg-[#fafafa]">
            <Button
              onPress={() => handleAccept(userId)}
              className="w-20 h-11 bg-green-400 rounded-3xl"
              pressStyle={{ opacity: 0.8 }}
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <Image
                source={icons.tick}
                className="h-6 w-6"
                resizeMode="contain"
              />
            </Button>
            <Button
              onPress={() => handleDismiss(userId)}
              className="w-20 h-11 bg-red-400 rounded-3xl"
              pressStyle={{ opacity: 0.8 }}
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <Image
                source={icons.cross}
                className="h-7 w-7"
                resizeMode="contain"
              />
            </Button>
          </XStack>
        </View>
      </Pressable>
    </View>
  );
}
