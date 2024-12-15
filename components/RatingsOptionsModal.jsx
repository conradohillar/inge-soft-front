// components/RatingsOptionsModal.jsx
import { Modal, TouchableOpacity, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const RatingsOptionsModal = ({ isVisible, onClose, user_id, isDriver }) => {
  const router = useRouter();

  const handleOptionPress = (category) => {
    onClose();
    router.push({
      pathname: "/(pages)/UserProfile",
      params: { user_id, category },
    });
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white w-[85%] rounded-3xl p-6">
          <View className="items-end mb-2">
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <Text className="text-xl font-qbold text-center mb-6 mt-4">
            Ver mis calificaciones
          </Text>

          <TouchableOpacity
            onPress={() => handleOptionPress("driver")}
            disabled={!isDriver}
            className={`bg-primary/10 p-4 rounded-2xl mb-3 ${
              !isDriver ? "opacity-50" : "active:bg-primary/20"
            }`}
          >
            <View className="flex-row items-center">
              <View className="bg-primary/20 p-2 rounded-xl">
                <MaterialIcons
                  name="directions-car"
                  size={24}
                  color="#59A58A"
                />
              </View>
              <View className="ml-4">
                <Text className="text-lg font-qbold text-gray-800">
                  Como conductor
                </Text>
                <Text className="text-sm font-qregular text-gray-500">
                  {isDriver
                    ? "Ver tus calificaciones como conductor"
                    : "Primero tenés que convertirte\nen conductor"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleOptionPress("rider")}
            className="bg-primary/10 p-4 rounded-2xl active:bg-primary/20 mb-6"
          >
            <View className="flex-row items-center">
              <View className="bg-primary/20 p-2 rounded-xl">
                <MaterialIcons name="person" size={24} color="#59A58A" />
              </View>
              <View className="ml-4">
                <Text className="text-lg font-qbold text-gray-800">
                  Como pasajero
                </Text>
                <Text className="text-sm font-qregular text-gray-500">
                  Ver tus calificaciones como pasajero
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default RatingsOptionsModal;
