import { Menu } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { XStack, Button } from "tamagui";
import icons from "../constants/icons";
import React, { useState, useEffect } from "react";
import {
  getIndieNotificationInbox,
  deleteIndieNotificationInbox,
} from "native-notify";
import { useGlobalState } from "../app/_layout";
import * as Notifications from "expo-notifications";
import { MaterialIcons } from "@expo/vector-icons";
import NotificationsModal from "./NotificationsModal";

export default function Header() {
  const { globalState } = useGlobalState();
  const [notifications, setNotifications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const getNots = async () => {
    let noti = await getIndieNotificationInbox(
      globalState.userId,
      25312,
      "s6wtyVfup1RTspXItRRyqB"
    );
    setNotifications(noti);
  };

  useEffect(() => {
    getNots();

    const subscription = Notifications.addNotificationReceivedListener(() => {
      getNots();
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleDeleteNotification = async (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.notification_id !== notificationId
      )
    );

    /* let not = await deleteIndieNotificationInbox(
      globalState.userId,
      String(notificationId),
      25312,
      "s6wtyVfup1RTspXItRRyqB"
    ); */
  };

  return (
    <XStack
      className="min-h-[8%] w-full items-center justify-between px-4 bg-background2"
      style={{ borderBottomWidth: 2, borderBottomColor: "#ccc" }}
    >
      <View className="relative">
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="w-10 h-10 rounded-2xl bg-background2 items-center justify-center"
        >
          <MaterialIcons name="notifications" size={34} color="#555" />
          {notifications.length > 0 && (
            <View className="absolute -top-1 -right-1 bg-red-500 rounded-full h-4 w-4 items-center justify-center">
              <Text className="text-white text-xs font-qbold">
                {notifications.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Link href="/(tabs)/home" asChild>
        <Text className="text-5xl font-qbold text-primary mt-2">rydio</Text>
      </Link>

      <NotificationsModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        notifications={notifications}
        onDeleteNotification={handleDeleteNotification}
      />
    </XStack>
  );
}
