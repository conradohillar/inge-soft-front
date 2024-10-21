import React from "react";
import { Image, SafeAreaView, View } from "react-native";
import { Spinner, Text, YStack } from "tamagui";
import icons from "../../constants/icons";

export default function ErrorPage() {
  return (
    <YStack className="h-full items-center justify-evenly bg-background">
      <Text className="text-4xl text-red-600 font-qbold">
        {" "}
        Ups... Hubo un error
      </Text>
      <View className="items-center">
        <Text className="text-3xl text-black font-qbold">
          Estamos trabajando
        </Text>
        <Text className="text-3xl text-black font-qbold">para resolverlo</Text>
      </View>
      <Spinner size={50} color="red" />
      <Image source={icons.logo} style={{ height: 200, width: 200 }} />
    </YStack>
  );
}
