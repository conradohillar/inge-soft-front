import { Image, View, Text, Pressable } from "react-native";
import { YStack, XStack } from "tamagui";
import icons from "../constants/icons";

export default function TripCardForDriver({
  from,
  to,
  date,
  price,
  passengers,
  packages,
  state,
  ride_id,
  handleOpenDetail,
}) {
  return (
    <View className="py-3">
      <Pressable
        style={({ pressed }) => ({
          height: 210,
          width: 350,
          paddingVertical: 15,
          paddingHorizontal: 18,
          marginHorizontal: 6,
          borderWidth: 2,
          borderColor: "#ccc",
          borderRadius: 40,
          opacity: pressed ? 0.7 : 1,
          backgroundColor: pressed ? "#cdddcd" : "#eee",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        })}
        onPress={() => handleOpenDetail(ride_id)}
      >
        <YStack>
          <XStack className="w-full items-center justify-between px-2 mt-2 mb-4">
            <Text className="text-sm font-qsemibold text-gray-500">{date}</Text>
            <Text className="text-xl font-qsemibold text-green-700">
              ${price}
            </Text>
          </XStack>

          <XStack className="w-full items-center justify-center mb-4">
            <Text className="text-2xl font-qbold text-black">{from} </Text>
            <Image
              source={icons.arrowright}
              className="w-4 h-4"
              tintColor="#000"
              resizeMode="contain"
            />
            <Text className="text-2xl font-qbold text-black"> {to}</Text>
          </XStack>

          <YStack className="items-start">
            <Text className="text-base font-qsemibold text-gray-500">
              Pasajeros: {passengers}
            </Text>
            <XStack className="w-full items-center justify-between">
              <Text className="text-base font-qsemibold text-gray-500">
                Paquetes: {packages}
              </Text>
              {state && (
                <Image
                  source={icons.alert}
                  className="w-10 h-10 mr-5"
                  tintColor="#ff6633"
                  resizeMode="contain"
                />
              )}
            </XStack>
          </YStack>
        </YStack>
      </Pressable>
    </View>
  );
}
