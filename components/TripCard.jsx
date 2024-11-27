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
    <View className="py-3">
      <Pressable
        style={({ pressed }) => ({
          height: 218,
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
          <XStack className="items-center justify-between mb-2">
            <XStack className="items-center">
              <Text className="text-2xl font-qbold text-black">{from} </Text>
              <Image
                source={icons.arrowright}
                className="w-4 h-4"
                tintColor="#000"
                resizeMode="contain"
              />
              <Text className="text-2xl font-qbold text-black"> {to}</Text>
            </XStack>
            <Avatar circular size="$7" borderColor="$black" borderWidth={1}>
              <Avatar.Image src={url || icons.placeholder_profile} />
              <Avatar.Fallback backgroundColor="$gray8" />
            </Avatar>
          </XStack>

          <YStack>
            <Text className="text-base font-qsemibold text-grey-100">
              Conductor: {driver}
            </Text>
            <Text className="text-base font-qsemibold text-grey-100 mb-3">
              {date}
            </Text>
            <XStack className="items-center justify-between">
              <Text className="text-xl font-qbold text-grey-800">${price}</Text>
              {state && (
                <Image
                  source={getStateIcon(state).source}
                  className="w-10 h-10 mr-4"
                  resizeMode="contain"
                  style={{
                    tintColor: getStateIcon(state).color,
                  }}
                />
              )}
            </XStack>
          </YStack>
        </YStack>
      </Pressable>
    </View>
  );
}
