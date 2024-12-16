import { View, Text, Modal, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function NotificationsModal({
  isVisible,
  onClose,
  notifications,
  onDeleteNotification,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/30">
        <View
          className="m-4 mt-16 bg-white rounded-3xl pb-2"
          style={{
            maxHeight: "80%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 3,
          }}
        >
          {/* Header */}
          <View className="p-4 border-b border-gray-100">
            <View className="flex-row items-center justify-between">
              <Text className="text-xl font-qbold text-gray-900">
                Notificaciones
              </Text>
              <TouchableOpacity
                onPress={onClose}
                className="h-8 w-8 items-center justify-center rounded-full bg-gray-100"
              >
                <MaterialIcons name="close" size={20} color="#666666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Lista de Notificaciones */}
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.notification_id}
            renderItem={({ item }) => (
              <View className="px-4">
                <View className="bg-white rounded-xl my-2 p-4 border-l-4 border-l-primary border-y border-r border-y-gray-200 border-r-gray-200">
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1 mr-2">
                      <Text className="text-base font-qbold text-gray-900 mb-1">
                        {item.title}
                      </Text>
                      <Text className="text-sm font-qregular text-gray-500">
                        {item.message}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        console.log("Deleted", item.notification_id);
                        onDeleteNotification(item.notification_id);
                      }}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <MaterialIcons
                        name="delete-outline"
                        size={24}
                        color="#EF4444"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            ListEmptyComponent={() => (
              <View className="py-8 items-center">
                <MaterialIcons
                  name="notifications-off"
                  size={40}
                  color="#D1D5DB"
                />
                <Text className="text-base font-qsemibold text-gray-400 mt-2">
                  No hay notificaciones
                </Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              notifications.length === 0
                ? { flex: 1, justifyContent: "center" }
                : { paddingVertical: 10 }
            }
          />
        </View>
      </View>
    </Modal>
  );
}
