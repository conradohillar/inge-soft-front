import { Image, View, Text, Pressable } from "react-native";
import { Button, XStack, YStack, Avatar } from "tamagui";
import icons from "../constants/icons";

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
              <Avatar.Image
                src={url === "" ? icons.placeholder_profile : url}
              />
              <Avatar.Fallback backgroundColor="$gray8" />
            </Avatar>
          </XStack>
          <YStack>
            <Text className="text-base font-qsemibold text-grey-100">
              Conductor: {driver}
            </Text>
            <Text className="text-basefont-qsemibold text-grey-100 mb-3">
              {date}
            </Text>
            <XStack className="items-center justify-between">
              <Text className="text-xl font-qbold text-grey-800">${price}</Text>
              {state && (
                <Image
                  source={getIcon(state)}
                  className="w-10 h-10 mr-4"
                  resizeMode="contain"
                  style={{
                    tintColor:
                      state === "pending"
                        ? "#ff6633"
                        : state === "accepted"
                        ? "#008000"
                        : "#FF0000",
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

const getIcon = (state) => {
  if (state === "pending") {
    return require("../assets/icons/alert.png");
  } else if (state === "accepted") {
    return require("../assets/icons/accepted.png");
  } else if (state === "dismissed") {
    return require("../assets/icons/dismissed.png");
  } else return null;
};
