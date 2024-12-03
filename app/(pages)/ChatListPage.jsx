import { View, Text, Image, Pressable, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "@tanstack/react-query";
import { getUserChats } from "../../services/chat";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import LoadingPage from "./LoadingPage";
import icons from "../../constants/icons";
import { MaterialIcons } from "@expo/vector-icons";
import ErrorPage from "./ErrorPage";
import { useRouter } from "expo-router";
import { XStack } from "tamagui";

export default function ChatListPage() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["chats"],
    queryFn: () => getUserChats(),
  });

  const router = useRouter();

  if (isLoading) return <LoadingPage />;

  if (error) return <ErrorPage />;

  const renderChatItem = ({ item }) => (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/(pages)/ChatPage",
          params: {
            chatId: item.chat_id,
          },
        });
      }}
      className="px-6 py-4 flex-row items-center space-x-4 border-b border-gray-100"
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
        backgroundColor: pressed ? "#f5f5f5" : "white",
      })}
    >
      {/* Avatar */}
      <Image
        source={
          item.photo_url_other_user
            ? { uri: item.photo_url_other_user }
            : icons.placeholder_profile
        }
        className="h-14 w-14 rounded-full"
        resizeMode="cover"
      />

      {/* Chat info */}
      <View className="flex-1">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-base font-qbold text-gray-900">
            {item.name_other_user}
          </Text>
          {item.last_msg && (
            <Text className="text-xs font-qregular text-gray-500">
              {formatDistanceToNow(new Date(item.last_msg_time), {
                addSuffix: true,
                locale: es,
              })}
            </Text>
          )}
        </View>

        {item.last_msg ? (
          <Text
            numberOfLines={1}
            className="text-sm font-qregular text-gray-600"
          >
            {item.last_msg}
          </Text>
        ) : (
          <Text className="text-sm font-qregular text-gray-300 italic">
            Chat vacío
          </Text>
        )}
      </View>
    </Pressable>
  );

  const EmptyState = () => (
    <View className="flex-1 items-center justify-center px-6">
      <MaterialIcons
        name="chat-bubble-outline"
        size={80}
        color="#9CA3AF"
        className="mb-6"
      />
      <Text className="text-xl font-qbold text-gray-900 text-center my-2">
        No tenés chats abiertos
      </Text>
      <Text className="text-base font-qregular text-gray-500 text-center">
        Cuando inicies una conversación{"\n"}aparecerá en esta lista
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <LinearGradient
        colors={["#59A58A", "#7AB5A0"]}
        style={{
          width: "100%",
          paddingTop: 50,
          paddingBottom: 55,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}
      >
        <XStack className="px-6">
          {/* Botón flotante para volver */}
          <Pressable
            onPress={() => router.push("/(tabs)/profile")}
            className="bg-white/20 rounded-full p-2 mr-6"
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            })}
          >
            <MaterialIcons name="arrow-back" size={28} color="white" />
          </Pressable>

          <Text className="text-4xl font-qbold text-white">Tus chats</Text>
        </XStack>
      </LinearGradient>

      {/* Lista de chats */}
      <FlatList
        data={data}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.chat_id}
        ListEmptyComponent={EmptyState}
        contentContainerStyle={data?.length === 0 ? { flex: 1 } : null}
        className="bg-white -mt-8 rounded-t-3xl"
      />
    </View>
  );
}
