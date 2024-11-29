import { Text, View } from "react-native";
import { YStack, XStack, SizableText, Separator, YGroup } from "tamagui";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { CustomListItem } from "../../components/CustomListItem";

export default function Trips() {
  const router = useRouter();

  const handleRiderPress = () => {
    router.push({
      pathname: "/(pages)/TripsPage",
      params: { category: "rider" },
    });
  };

  const handleDriverPress = () => {
    router.push({
      pathname: "/(pages)/TripsPage",
      params: { category: "driver" },
    });
  };

  return (
    <YStack className="h-full items-start justify-evenly bg-background">
      <View className="w-full pl-8">
        <SizableText className="text-3xl font-qbold text-black">
          Mis viajes
        </SizableText>
      </View>
      <YGroup alignSelf="center" width={"100%"} height={"60%"}>
        <Separator />
        <YGroup.Item>
          <CustomListItem
            icon={<MaterialIcons name="person" size={32} color="#666666" />}
            iconAfter={
              <MaterialIcons name="chevron-right" size={32} color="#666666" />
            }
            onPress={handleRiderPress}
          >
            <Text className="text-xl font-qbold text-black flex-1 ml-4">
              Como pasajero
            </Text>
          </CustomListItem>
        </YGroup.Item>
        <Separator />
        <YGroup.Item>
          <CustomListItem
            icon={<MaterialIcons name="drive-eta" size={32} color="#666666" />}
            iconAfter={
              <MaterialIcons name="chevron-right" size={32} color="#666666" />
            }
            onPress={handleDriverPress}
          >
            <Text className="text-xl font-qbold text-black flex-1 ml-4">
              Como conductor
            </Text>
          </CustomListItem>
        </YGroup.Item>
        <Separator />
      </YGroup>
    </YStack>
  );
}
