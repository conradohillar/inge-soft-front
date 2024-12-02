import { TouchableOpacity, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function PressableCard({
  onPress,
  disabled,
  icon,
  title,
  subtitle,
  ...props
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`${
        disabled ? "opacity-50" : ""
      } bg-white rounded-3xl p-4 mx-4 shadow-sm`}
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
      }}
      {...props}
    >
      <View className="flex-row items-center space-x-4">
        <View className="bg-primary/10 rounded-2xl p-3">
          <MaterialIcons name={icon} size={24} color="#59A58A" />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-qbold text-black">{title}</Text>
          <Text className="text-sm font-qregular text-gray-500">
            {subtitle}
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#59A58A" />
      </View>
    </TouchableOpacity>
  );
}
