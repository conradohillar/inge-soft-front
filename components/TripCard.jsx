import { Image, View, Text, Pressable } from "react-native";
import { Avatar, XStack, YStack } from "tamagui";
import icons from "../constants/icons";
const getStateIcon = (state) => {
  const icons = {
    pending: {
      source: require("../assets/icons/alert.png"),
      color: "#ff6633",
    },
    accepted: {
      source: require("../assets/icons/accepted.png"),
      color: "#008000",
    },
    dismissed: {
      source: require("../assets/icons/dismissed.png"),
      color: "#FF0000",
    },
  };
  return icons[state];
};

export default function TripCard({
  from,
  to,
  driver,
  date,
  price,
  url,
  state,
  handleOpenDetail,
  ride_id,
}) {
  return (
    <Pressable
      onPress={() => handleOpenDetail(ride_id)}
      style={({ pressed }) => ({
        opacity: pressed ? 0.9 : 1,
        transform: [{ scale: pressed ? 0.995 : 1 }],
      })}
    >
      <View
        className="bg-white rounded-3xl p-6 w-full"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 3,
        }}
      >
        {/* Header: Conductor y Fecha */}
        <XStack className="items-start justify-between mb-5">
          <XStack className="items-center space-x-3">
            <Avatar circular size="$6" borderColor="$gray200" borderWidth={1}>
              <Avatar.Image src={url || icons.placeholder_profile} />
              <Avatar.Fallback backgroundColor="$gray8" />
            </Avatar>
            <YStack>
              <Text className="text-sm font-qsemibold text-gray-500">
                Conductor
              </Text>
              <Text className="text-xl font-qbold text-black">{driver}</Text>
            </YStack>
          </XStack>
          <XStack className="items-center">
            <Text className="text-sm font-qsemibold text-gray-400">
              {date}{" "}
            </Text>
          </XStack>
        </XStack>

        {/* Contenido: Ruta y Precio */}
        <YStack space="$3">
          <XStack className="items-center space-x-2">
            <Text className="text-2xl font-qbold text-primary">{from}</Text>
            <Image
              source={icons.arrowright}
              className="w-5 h-5 mx-1"
              tintColor="#59A58A"
              resizeMode="contain"
            />
            <Text className="text-2xl font-qbold text-primary">{to}</Text>
          </XStack>
          <XStack className="items-end justify-between">
            <Text className="text-2xl font-qbold text-black">${price}</Text>
            {state && (
              <Image
                source={getStateIcon(state).source}
                className="w-7 h-7 mr-2"
                resizeMode="contain"
                style={{
                  tintColor: getStateIcon(state).color,
                }}
              />
            )}
          </XStack>
        </YStack>
      </View>
    </Pressable>
  );
}
