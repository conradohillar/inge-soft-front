import { Pressable, Text, View } from "react-native";
import { Avatar, XStack, YStack } from "tamagui";
import RatingStars from "../../components/RatingStars";
import Comment from "../../components/Comment";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getProfileInfo } from "../../services/users";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import { FlatList } from "react-native";
import icons from "../../constants/icons";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

export default function UserProfile() {
  const { user_id, category } = useLocalSearchParams();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["userProfile", user_id, category],
    queryFn: () => getProfileInfo(user_id, category),
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <YStack className="h-full items-center justify-start w-full bg-background">
      <LinearGradient
        colors={["#59A58A", "#7AB5A0"]}
        style={{
          width: "100%",
          paddingHorizontal: 24,
          paddingTop: 48,
          paddingBottom: 56,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}
      >
        <XStack className="items-center">
          <Avatar circular size="$12" borderColor="white" borderWidth={2}>
            <Avatar.Image
              data-testid="profile-picture"
              accessibilityLabel={data.name}
              src={data.photo_url ? data.photo_url : icons.placeholder_profile}
            />
          </Avatar>

          <YStack className="flex-1 justify-center space-y-1 ml-3">
            <Text className="text-2xl font-qbold text-white" numberOfLines={2}>
              {data.name}
            </Text>
            <Text
              className="text-base font-qsemibold text-white/80"
              numberOfLines={2}
            >
              {data.email}
            </Text>
          </YStack>
        </XStack>
      </LinearGradient>

      <View className="w-[90%] -mt-8 bg-white rounded-2xl p-6 shadow-lg shadow-black/5">
        <Text className="text-sm font-qbold text-[#ccc] mb-4">
          Calificación
        </Text>
        <YStack className="items-center space-y-2">
          <Text className="text-4xl font-qbold text-primary mb-2">
            {data.avg_rating.toFixed(1)}
          </Text>
          <RatingStars rating={data.avg_rating} size={24} />
          <Text className="text-gray-500 text-sm font-qsemibold">
            de {data.comments.length}{" "}
            {data.comments.length === 1 ? "opinión" : "opiniones"}
          </Text>
        </YStack>
      </View>

      <View className="flex-1 w-full mt-6">
        <XStack className="px-6 py-4 space-x-3 items-center">
          <MaterialIcons name="chat" size={20} color="#ccc" />
          <Text className="text-sm font-qbold text-[#ccc]">Comentarios</Text>
          <View className="bg-gray-100 rounded-full px-3 py-1">
            <Text className="text-sm font-qbold text-gray-500">
              {data.comments.length}
            </Text>
          </View>
        </XStack>

        <FlatList
          data={data.comments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderComments}
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Pressable>
              <View className="flex-1" />
            </Pressable>
          }
        />
      </View>
    </YStack>
  );
}

const renderComments = ({ item }) => {
  return (
    <Pressable>
      <View className="w-full">
        <View className="pt-4 pb-6 px-2">
          <Comment
            photoUrl={
              item.photo_url ? item.photo_url : icons.placeholder_profile
            }
            username={item.name}
            date={item.date}
            body={item.comment}
            rating={item.rating}
          />
        </View>
        <View className="w-full h-[1px] bg-gray-100" />
      </View>
    </Pressable>
  );
};
