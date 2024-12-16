import { View, Text, Pressable, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Modal } from "react-native";
import { useRouter } from "expo-router";

export default function NotificationsModal({
  isVisible,
  onClose,
  notifications,
  onDeleteNotification,
}) {
  const router = useRouter();

  const handleNotificationPress = (notification) => {
    onClose();
    // Aquí manejas la navegación según el tipo de notificación
    if (notification.type === "request") {
      router.push({
        pathname: "/(pages)/ReservationRequest",
        params: { ride_id: notification.ride_id },
      });
    }
    // Agregar más casos según los tipos de notificaciones
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/30" onPress={onClose}>
        <Pressable
          className="absolute top-16 right-4 w-[90%] max-w-[400px] bg-white rounded-3xl"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 3,
            maxHeight: "80%",
          }}
        >
          <View className="p-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-xl font-qbold text-gray-900">
                Notificaciones
              </Text>
              <Pressable
                onPress={onClose}
                className="h-8 w-8 items-center justify-center rounded-full bg-gray-100"
              >
                <MaterialIcons name="close" size={20} color="#666666" />
              </Pressable>
            </View>

            <ScrollView
              className="max-h-[600px]"
              showsVerticalScrollIndicator={false}
            >
              {notifications && notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <Pressable
                    key={index}
                    onPress={() => handleNotificationPress(notification)}
                    className={`p-4 border-l-4 bg-white rounded-xl mb-4 ${
                      notification.read ? "border-gray-200" : "border-primary"
                    }`}
                    style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.05,
                      shadowRadius: 8,
                      elevation: 2,
                    }}
                  >
                    <View className="flex-row items-start justify-between space-x-3">
                      <View className="flex-row flex-1 items-start space-x-3">
                        <View
                          className={`p-2 rounded-full ${
                            notification.read ? "bg-gray-100" : "bg-primary/10"
                          }`}
                        >
                          <MaterialIcons
                            name={notification.icon || "notifications"}
                            size={20}
                            color={notification.read ? "#666666" : "#59A58A"}
                          />
                        </View>
                        <View className="flex-1">
                          <Text className="text-base font-qbold text-gray-900 mb-1">
                            {notification.title}
                          </Text>
                          <Text className="text-sm font-qregular text-gray-500">
                            {notification.message}
                          </Text>
                          <Text className="text-xs font-qregular text-gray-400 mt-2">
                            {notification.time}
                          </Text>
                        </View>
                      </View>
                      <Pressable
                        onPress={() => onDeleteNotification(notification.id)}
                        className="p-2 ml-2"
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <MaterialIcons
                          name="delete-outline"
                          size={24}
                          color="#EF4444"
                        />
                      </Pressable>
                    </View>
                  </Pressable>
                ))
              ) : (
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
            </ScrollView>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
