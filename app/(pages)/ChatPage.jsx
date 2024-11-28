import {
  View,
  FlatList,
  TextInput,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import { XStack, YStack, Text, Spacer } from "tamagui";
import { useEffect, useState } from "react";
import { Send, ArrowLeft, Trash, Copy } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  connect,
  disconnect,
  getMessages,
  sendMessage,
} from "../../services/chat";
import { useGlobalState } from "../_layout";
import LoadingPage from "./LoadingPage";

export default function ChatPage() {
  const chatId = "superchar123";
  const { globalState } = useGlobalState();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  const [before, setBefore] = useState(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ["getMessages", chatId],
    queryFn: () => getMessages(chatId),
  });

  useEffect(() => {
    connect(chatId);

    return () => {
      disconnect(chatId);
    };
  }, [chatId]);

  const handleSendMessage = async () => {
    await sendMessage(message);
    setMessage("");
  };

  const handleLongPress = (item) => {
    if (item.writer_id === globalState.userId) {
      setSelectedMessage(item.msg_id);
    }
  };

  const handleCopyMessage = () => {};

  const handleDeleteMessage = () => {};

  const handleUpdateMessage = () => {};

  const renderMessage = ({ item }) => (
    <Pressable onLongPress={() => handleLongPress(item)} delayLongPress={200}>
      <View
        className={`max-w-[80%] rounded-2xl px-4 py-2 mb-2 ${
          item.writer_id === globalState.userId
            ? "bg-primary self-end"
            : "bg-gray-200 self-start"
        }`}
      >
        <Text
          className={`text-base font-qregular ${
            item.writer_id === globalState.userId ? "text-white" : "text-black"
          }`}
        >
          {item.msg}
        </Text>
        <Text
          className={`text-xs font-qregular ${
            item.writer_id === globalState.userId
              ? "text-white"
              : "text-gray-500"
          }`}
        >
          {item.sent_at}
        </Text>
      </View>
    </Pressable>
  );

  if (isLoading) return <LoadingPage />;

  return (
    <View className="flex-1 bg-background">
      <YStack className="flex-1">
        <XStack className="items-center justify-between py-2 border-b border-gray-200 px-4">
          <Pressable onPress={() => router.back()}>
            <ArrowLeft size={24} color="black" />
          </Pressable>
          <Text className="text-xl font-qbold text-black flex-1 text-center">
            Juan Pérez
          </Text>
          <View style={{ width: 24 }} /> {/* Spacer for centering */}
        </XStack>

        <FlatList
          data={data}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          inverted={true}
          className="flex-1"
        />
        <Spacer />
        <XStack className="px-4 py-2 border-t border-gray-200">
          <TextInput
            className="flex-1 px-4 py-2 mr-2 text-base font-qregular border border-black rounded-full"
            placeholder="Escribí un mensaje..."
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <Pressable
            onPress={handleSendMessage}
            className="w-10 h-10 bg-primary rounded-full items-center justify-center"
          >
            <Send size={20} color="white" />
          </Pressable>
        </XStack>
      </YStack>

      <Modal
        visible={selectedMessage !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedMessage(null)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-center items-center"
          onPress={() => setSelectedMessage(null)}
        >
          <View className="bg-white rounded-lg w-64 overflow-hidden">
            <TouchableOpacity
              className="flex-row items-center p-4 border-b border-gray-200"
              onPress={handleCopyMessage}
            >
              <Copy size={20} color="#309090" />
              <Text className="ml-3 font-qmedium">Copiar mensaje</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center p-4"
              onPress={handleDeleteMessage}
            >
              <Trash size={20} color="#FF0000" />
              <Text className="ml-3 font-qmedium text-red-500">
                Eliminar mensaje
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
