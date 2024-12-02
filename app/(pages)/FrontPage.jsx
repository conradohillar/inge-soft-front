import { Image, Text, View } from "react-native";

export default function FrontPage() {
  return (
    <View className="flex-1 items-center justify-center space-y-10 bg-background">
      <Image
        source={require("../../assets/icons/logo.png")}
        style={{ height: 220, width: 220 }}
      />
      <Text className="text-8xl text-primary font-qsemibold">rydio</Text>
    </View>
  );
}
