import { XStack, YStack } from "tamagui";
import { Text, Image, View } from "react-native";
import icons from "../constants/icons";
import VarButton from "./VarButton";
import { useState } from "react";

const ActiveTripCard = ({
  from,
  to,
  passengers,
  packages,
  departure,
  handleStartTrip,
  handleEndTrip,
}) => {
  const [startOpacity, setStartOpacity] = useState(1);
  const [endOpacity, setEndOpacity] = useState(0.5);
  const [isActive, setIsActive] = useState(false);

  handleStart = () => {
    setEndOpacity(1);
    setStartOpacity(0.5);
    setIsActive(true);
    handleStartTrip();
  };

  handleEnd = () => {
    setEndOpacity(0.5);
    setStartOpacity(1);
    setIsActive(false);
    handleEndTrip();
  };

  return (
    <YStack className="items-center justify-center bg-background border-2 border-[#ddd] rounded-2xl py-3 mb-1">
      <XStack className="w-[98%] items-center justify-between px-3">
        <XStack className="w-[50%] items-center mx-1">
          <Text className="text-xl font-qbold text-black">{from} </Text>
          <Image
            source={icons.arrowright}
            className="w-4 h-4"
            tintColor="#000"
            resizeMode="contain"
          />
          <Text className="text-xl font-qbold text-black"> {to}</Text>
        </XStack>
        <XStack className="w-[50%] items-center justify-evenly">
          <XStack className="space-x-2 items-center">
            <Image
              source={icons.profile2}
              className="h-5 w-5"
              resizeMode="contain"
            />
            <Text className="font-qsemibold text-gray-600 text-base">
              {passengers}
            </Text>
          </XStack>
          <XStack className="space-x-2 items-center">
            <Image
              source={icons.mypackage}
              className="h-5 w-5"
              resizeMode="contain"
            />
            <Text className="font-qsemibold text-gray-600 text-base">
              {packages}
            </Text>
          </XStack>
        </XStack>
      </XStack>
      <XStack className="w-[98%] items-center justify-start px-3 ml-2 my-3">
        <Text className="text-lg font-qsemibold text-gray-500">
          Hora de salida:
        </Text>
        <Text className="text-lg font-qbold text-gray-500"> {departure}</Text>
      </XStack>
      <XStack className="w-[98%] items-center justify-evenly mr-3 ">
        <View className="w-[50%]">
          <VarButton
            onPress={handleStart}
            variant={"secondary"}
            opacity={startOpacity}
            disabled={startOpacity !== 1}
          >
            <Text className="text-lg font-qsemibold text-white mb-1">
              Comenzar
            </Text>
          </VarButton>
        </View>
        <View className="w-[50%]">
          <VarButton
            onPress={handleEnd}
            opacity={endOpacity}
            disabled={endOpacity !== 1}
          >
            <Text className="text-lg font-qsemibold text-white mb-1">
              Terminar
            </Text>
          </VarButton>
        </View>
      </XStack>
      {isActive && (
        <XStack className="w-[98%] items-center justify-center mt-2">
          <Text className="text-base font-qsemibold text-gray-500">
            Viaje en curso . . .
          </Text>
        </XStack>
      )}
    </YStack>
  );
};

export default ActiveTripCard;
