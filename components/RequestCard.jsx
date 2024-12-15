import React from "react";
import { Image, View, Text, Pressable, ActivityIndicator } from "react-native";
import { Button, XStack, YStack, Avatar } from "tamagui";
import icons from "../constants/icons";
import { Link } from "expo-router";

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
  isLoading,
}) {
  return (
    <View className="py-3">
      <Pressable
        style={({ pressed }) => ({
          transform: [{ scale: pressed ? 0.98 : 1 }],
        })}
      >
        <View
          className="w-full rounded-[32px] bg-white overflow-hidden"
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
          <View className="p-6">
            <XStack className="items-center space-x-3 mb-6">
              <Avatar circular size="$8" borderColor="$gray5" borderWidth={1}>
                <Avatar.Image
                  src={photo === "" ? icons.placeholder_profile : photo}
                />
                <Avatar.Fallback backgroundColor="$gray8" />
              </Avatar>
              <YStack space="$1">
                <Text className="font-qbold text-lg text-black">
                  {username}
                </Text>
                <Link
                  href={{
                    pathname: "/(pages)/UserProfile",
                    params: { user_id: userId, category: "rider" },
                  }}
                  asChild
                >
                  <Text className="font-qsemibold text-sm text-primary underline">
                    Ver perfil del pasajero
                  </Text>
                </Link>
              </YStack>
            </XStack>

            <View className="h-[2px] bg-gray-100 w-full mb-4" />

            <YStack className="w-full items-start mb-8">
              <Text className="font-qsemibold text-gray-600 text-base mb-3">
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
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Image
                    source={icons.tick}
                    className="h-6 w-6"
                    resizeMode="contain"
                  />
                )}
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
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#EF4444" />
                ) : (
                  <Image
                    source={icons.cross}
                    className="h-7 w-7"
                    resizeMode="contain"
                  />
                )}
              </Button>
            </XStack>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
