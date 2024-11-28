import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  FlatList,
  TextInput,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import { XStack, YStack, Text } from "tamagui";
import { useState } from "react";
import { Send, ArrowLeft, Trash, Copy } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";

export default function ChatPage(chatId) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hola! ¿A qué hora salimos?",
      sender: "user",
      timestamp: "10:30",
    },
    {
      id: "2",
      text: "Hola! Salimos a las 15hs",
      sender: "other",
      timestamp: "10:31",
    },
  ]);

  const sendMessage = () => {
    if (message.trim().length > 0) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          text: message,
          sender: "user",
          timestamp: new Date().toLocaleTimeString().slice(0, 5),
        },
      ]);
      setMessage("");
    }
  };

  const handleLongPress = (message) => {
    if (message.sender === "user") {
      setSelectedMessage(message);
    }
  };

  const handleCopyMessage = () => {
    if (selectedMessage) {
      // Here you would implement the copy functionality
      setSelectedMessage(null);
    }
  };

  const handleDeleteMessage = () => {
    if (selectedMessage) {
      setMessages(messages.filter((msg) => msg.id !== selectedMessage.id));
      setSelectedMessage(null);
    }
  };

  const renderMessage = ({ item }) => (
    <Pressable onLongPress={() => handleLongPress(item)} delayLongPress={200}>
      <View
        className={`max-w-[80%] rounded-2xl px-4 py-2 mb-2 ${
          item.sender === "user"
            ? "bg-primary self-end"
            : "bg-gray-200 self-start"
        }`}
      >
        <Text
          className={`text-base font-qregular ${
            item.sender === "user" ? "text-white" : "text-black"
          }`}
        >
          {item.text}
        </Text>
        <Text
          className={`text-xs font-qregular ${
            item.sender === "user" ? "text-white" : "text-gray-500"
          }`}
        >
          {item.timestamp}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
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
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          inverted={false}
          className="flex-1"
        />

        <XStack className="px-4 pt-2 border-t border-gray-200">
          <TextInput
            className="flex-1 px-4 py-2 mr-2 text-base font-qregular border border-black rounded-full"
            placeholder="Escribí un mensaje..."
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <Pressable
            onPress={sendMessage}
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
    </SafeAreaView>
  );
}
