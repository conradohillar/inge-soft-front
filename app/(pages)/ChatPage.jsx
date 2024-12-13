import {
  View,
  FlatList,
  TextInput,
  Pressable,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { XStack, YStack, Text, Spinner, Spacer } from "tamagui";
import { useEffect, useState } from "react";
import {
  Send,
  ArrowLeft,
  Trash,
  Copy,
  Pencil,
  Key,
} from "@tamagui/lucide-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  connect,
  disconnect,
  getMessages,
  getOtherUser,
  removeMessage,
  sendMessage,
  updateMessage,
} from "../../services/chat";
import { useGlobalState } from "../_layout";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import { queryClient } from "../_layout";

export default function ChatPage() {
  const { chatId } = useLocalSearchParams();
  const { globalState } = useGlobalState();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [editingMessage, setEditingMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [limit, setLimit] = useState(20);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["getMessages", chatId],
    queryFn: () => getMessages(chatId, limit),
  });

  const {
    isLoading: loadingOtherUser,
    error: errorOtherUser,
    data: dataOtherUser,
  } = useQuery({
    queryKey: ["getOtherUser", chatId],
    queryFn: () => getOtherUser(chatId),
  });

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries(["chats"]);
      // queryClient.setQueryData(["chats"], (oldData) => {
      //   return oldData.map((chat) => {
      //     if (chat.chat_id === chatId) {
      //       return {
      //         ...chat,
      //         last_msg: data[0].msg,
      //         last_msg_time: data[0].sent_at,
      //       };
      //     }
      //     return chat;
      //   });
      // });
    };
  }, []);

  useEffect(() => {
    connect(chatId, globalState.userId);

    return () => {
      disconnect(chatId);
    };
  }, [chatId]);

  const handleSendMessage = async () => {
    if (!message) return;
    queryClient.setQueryData(["getMessages", chatId], (oldData) => [
      {
        id: "",
        Key: "random",
        msg: message,
        writer_id: globalState.userId,
        sent_at: new Date().toISOString(),
      },
      ...oldData,
    ]);
    setMessage("");
    await sendMessage(message);
  };

  const handleLongPress = (item) => {
    if (item.writer_id === globalState.userId) {
      setSelectedMessage(item);
    }
  };

  const handleCopyMessage = async () => {
    if (selectedMessage) {
      await navigator.clipboard.writeText(selectedMessage.msg);
      setSelectedMessage(null);
    }
  };

  const handleDeleteMessage = async () => {
    queryClient.setQueryData(["getMessages", chatId], (previousMessages) => {
      return previousMessages.filter(
        (message) => message.msg_id !== selectedMessage.msg_id
      );
    });
    const aux = selectedMessage.msg_id;
    setSelectedMessage(null);
    await removeMessage(aux);
  };

  const handleUpdateMessage = async (newMessage) => {
    queryClient.setQueryData(["getMessages", chatId], (previousMessages) => {
      return previousMessages.map((message) => {
        if (message.msg_id === selectedMessage.msg_id) {
          return {
            ...message,
            msg: newMessage,
            edited: true,
          };
        }
        return message;
      });
    });
    const aux = selectedMessage.msg_id;
    setSelectedMessage(null);
    await updateMessage(aux, newMessage);
  };

  const getMessageDate = (sent_at) => {
    if (!sent_at) return null;
    const date = new Date(sent_at);

    date.setHours(date.getHours() - 3);
    return date.toISOString().slice(0, 10);
  };

  const getMessageTime = (sent_at) => {
    if (!sent_at) return null;
    return new Date(sent_at).toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Argentina/Buenos_Aires",
    });
  };

  const renderDateSeparator = (date) => (
    <View className="flex items-center my-4">
      <View className="w-full h-[1px] bg-gray-300" />
      <Text className="text-xs font-qmedium text-gray-500 bg-background px-2 -mt-2.5">
        {date}
      </Text>
    </View>
  );
  const MessageBubble = ({ message, time, isOwnMessage, children, edited }) => (
    <View
      className={`max-w-[80%] rounded-2xl px-4 py-2 mb-2 ${
        isOwnMessage ? "bg-primary self-end" : "bg-gray-200 self-start"
      }`}
    >
      <Text
        className={`text-base font-qsemibold ${
          isOwnMessage ? "text-white" : "text-black"
        }`}
      >
        {message}
      </Text>
      <XStack className="justify-between items-center">
        <Text
          className={`text-xs font-qregular ${
            isOwnMessage ? "text-white" : "text-gray-500"
          }`}
        >
          {time ? (
            time
          ) : (
            <Send size={12} color={isOwnMessage ? "white" : "gray"} />
          )}
        </Text>
        {edited && (
          <Text
            className={`text-xs italic ml-2 ${
              isOwnMessage ? "text-white" : "text-gray-500"
            }`}
          >
            editado
          </Text>
        )}
      </XStack>
      {children}
    </View>
  );
  const renderMessage = ({ item, index }) => {
    const currentDate = getMessageDate(item.sent_at);
    const prevDate =
      index < data.length - 1 ? getMessageDate(data[index + 1].sent_at) : null;
    const showDateSeparator = currentDate !== prevDate && currentDate;

    return (
      <View>
        {showDateSeparator && renderDateSeparator(currentDate)}
        <Pressable
          onLongPress={() => handleLongPress(item)}
          delayLongPress={200}
        >
          <MessageBubble
            message={item.msg}
            time={getMessageTime(item.sent_at)}
            isOwnMessage={item.writer_id === globalState.userId}
            edited={item.edited}
          />
        </Pressable>
      </View>
    );
  };

  if (loadingOtherUser) return <LoadingPage />;

  if (error || errorOtherUser) return <ErrorPage />;

  const isRecentMessage = (sent_at) => {
    console.log(sent_at);
    if (!sent_at) return false;
    const messageTime = new Date(sent_at).getTime();
    const currentTime = new Date().getTime();
    return currentTime - messageTime <= 10 * 60 * 1000; // 10 minutes in milliseconds
  };

  return (
    <View className="flex-1 bg-background">
      <YStack className="flex-1">
        <XStack className="items-center justify-between py-2 border-b border-gray-200 px-4">
          <Pressable onPress={() => router.back()}>
            <ArrowLeft size={24} color="black" />
          </Pressable>
          <Text className="text-xl font-qbold text-black flex-1 text-center">
            {dataOtherUser.username}
          </Text>

          <View style={{ width: 24 }} />
        </XStack>
        {loading && (
          <View>
            <Spacer size={30} />
            <Spinner size="medium" />
            <Spacer size={30} />
          </View>
        )}
        <FlatList
          data={data}
          renderItem={renderMessage}
          keyExtractor={(item) => item.msg_id}
          contentContainerStyle={{ padding: 16 }}
          inverted={true}
          className="flex-1"
          onEndReached={async () => {
            if (data.length > 0) {
              setLoading(true);
              setLimit(limit + 20);
              await refetch();
              setLoading(false);
            }
          }}
        />
        <XStack className="px-4 py-2 border-t border-gray-200">
          <TextInput
            className="flex-1 px-4 py-2 mr-2 text-base font-qsemibold border border-black rounded-xl"
            placeholder="Escribí un mensaje..."
            placeholderTextColor="gray"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <Pressable
            onPress={handleSendMessage}
            className="w-10 h-10 bg-primary rounded-full items-center justify-center"
          >
            {<Send size={20} color="white" />}
          </Pressable>
        </XStack>
      </YStack>

      <Modal
        visible={selectedMessage !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          setSelectedMessage(null);
          setIsEditing(false);
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <Pressable
            className="flex-1 bg-black/50 justify-center items-center"
            onPress={() => {
              setSelectedMessage(null);
              setIsEditing(false);
            }}
          >
            <YStack className="bg-white rounded-lg w-[80%] overflow-hidden">
              {selectedMessage && (
                <View className="p-4 border-b border-gray-200">
                  <MessageBubble
                    message={selectedMessage.msg}
                    time={getMessageTime(selectedMessage.sent_at)}
                    isOwnMessage={true}
                  />
                </View>
              )}
              {isEditing ? (
                <View className="p-4">
                  <TextInput
                    className="border border-gray-300 p-2 mb-2 rounded-xl font-qsemibold"
                    value={editingMessage}
                    onChangeText={setEditingMessage}
                    multiline
                    autoFocus
                    style={{
                      maxHeight: 100,
                      textAlignVertical: "top",
                    }}
                  />
                  <XStack gap={8}>
                    <TouchableOpacity
                      className="flex-1 bg-gray-300 p-2 rounded-full"
                      onPress={() => {
                        setIsEditing(false);
                        setSelectedMessage(null);
                      }}
                    >
                      <Text className="text-black text-center">Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="flex-1 bg-primary p-2 rounded-full"
                      onPress={() => {
                        handleUpdateMessage(editingMessage);
                        setIsEditing(false);
                      }}
                    >
                      <Text className="text-white text-center">Guardar</Text>
                    </TouchableOpacity>
                  </XStack>
                </View>
              ) : (
                <>
                  <TouchableOpacity
                    className="flex-row items-center p-4 border-b border-gray-200"
                    onPress={handleCopyMessage}
                  >
                    <Copy size={20} color="black" />
                    <Text className="text-black ml-3 font-qmedium">
                      Copiar mensaje
                    </Text>
                  </TouchableOpacity>
                  {selectedMessage !== null &&
                    isRecentMessage(selectedMessage.sent_at) && (
                      <>
                        <TouchableOpacity
                          className="flex-row items-center p-4"
                          onPress={handleDeleteMessage}
                        >
                          <Trash size={20} color="#FF0000" />
                          <Text className="ml-3 font-qmedium text-red-500">
                            Eliminar mensaje
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          className="flex-row items-center p-4"
                          onPress={() => {
                            setEditingMessage(selectedMessage.msg);
                            setIsEditing(true);
                          }}
                        >
                          <Pencil size={20} color="#309090" />
                          <Text className="ml-3 font-qmedium" color="#309090">
                            Editar mensaje
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                </>
              )}
            </YStack>
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
