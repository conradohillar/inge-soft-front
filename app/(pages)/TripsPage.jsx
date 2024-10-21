import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { YStack } from "tamagui";
import HorizontalTabs from "../../components/HorizontalTabs";

import { useLocalSearchParams } from "expo-router";

export default function TripsPage() {
  const { category } = useLocalSearchParams();
  return (
    <YStack className="h-full items-center justify-evenly bg-background">
      <HorizontalTabs category={category} />
    </YStack>
  );
}
