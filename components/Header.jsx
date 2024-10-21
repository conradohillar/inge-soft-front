import { Menu } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { Image, View, Text, Modal, FlatList, TouchableOpacity } from "react-native";
import { XStack, YStack, Button } from "tamagui";
import icons from "../constants/icons"
import React, { useState, useEffect } from "react";
import { getIndieNotificationInbox, deleteIndieNotificationInbox } from 'native-notify';
import { useGlobalState } from "../app/_layout";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function Header() {

    const { globalState } = useGlobalState();
    const [notifications, setNotifications] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);


    const getNots = async () => {
        let not = await getIndieNotificationInbox(globalState.userId, 24233, 'SX3XOZEi4N2YNO4U2RkCfD');
        setNotifications(not);
    };

    useEffect(() => {

        getNots();

        document.addEventListener('onNotificationReceived', (e) => {
            getNots();
        });

        return () => {
            document.removeEventListener('onNotificationReceived', handleNotificationReceived);
        };
    }, []);



    const handleDeleteNotification = async (notificationId) => {
        let not = await deleteIndieNotificationInbox(globalState.userId, notificationId, 24233, 'SX3XOZEi4N2YNO4U2RkCfD');
        setNotifications(not);
    }

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <XStack className="min-h-[8%] w-full items-center justify-between px-4 bg-background" style={{ borderBottomWidth: 2, borderBottomColor: '#ccc' }}>
            <View className="relative">

                <TouchableOpacity onPress={toggleModal} asChild>
                    <Button className="w-10 h-10 rounded-2xl bg-background">
                        <Image source={icons.notification} className="h-8 w-8" resizeMode="contain" />
                    </Button>

                    {notifications.length > 0 && (
                        <View className="absolute top-0 right-0 bg-red-500 rounded-full h-4 w-4 flex items-center justify-center">
                            <Text className="text-white text-xs">{notifications.length}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <Link href="/(tabs)/home" asChild>
                <Text className="text-5xl font-qbold text-primary mt-2">rydio</Text>
            </Link>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
                        <Text style={{ fontSize: 20, marginBottom: 10 }}>Notificaciones</Text>


                        <FlatList
                            data={notifications}
                            keyExtractor={(item) => item.notification_id}
                            renderItem={({ item }) => (
                                <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                                    <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                                    <Text>{item.message}</Text>
                                    <Button onPress={() => { handleDeleteNotification(item.notification_id) }} style={{ marginTop: 10 }}>
                                        Eliminar
                                    </Button>
                                </View>
                            )}
                        />


                        <Button onPress={toggleModal} style={{ marginTop: 20 }}>
                            Cerrar
                        </Button>
                    </View>
                </View>
            </Modal>
        </XStack>
    );
}
