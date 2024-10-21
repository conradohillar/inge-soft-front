import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
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
    <YStack className="h-full items-center justify-start w-full">
      <YStack className="h-[25%] items-center justify-evenly">
        <XStack className="w-[90%] items-center justify-start">
          <View className="flex-1 justify-center items-center">
            <Avatar circular size="$12" borderColor="$black" borderWidth={1}>
              <Avatar.Image
                data-testid="profile-picture"
                accessibilityLabel={data.name}
                src={
                  data.photo_url ? data.photo_url : icons.placeholder_profile
                }
              />
            </Avatar>
          </View>
          <YStack className="items-start justify-evenly ml-3 mr-2">
            <XStack className="items-center">
              <Text className="text-black text-lg font-qbold">{data.name}</Text>
            </XStack>
            <Text className="text-gray-600 text-base font-qsemibold">
              {data.email}
            </Text>
          </YStack>
        </XStack>
      </YStack>
      <YStack className="items-start justify-between w-full px-4 pb-8 pt-2 mb-1 border-2 border-[#eee]">
        <Text className="text-sm font-qbold text-[#ccc] mb-5">
          Calificación
        </Text>
        <YStack className="self-center items-center space-y-2">
          <RatingStars rating={avgRating(data.comments)} />
          <Text className="text-gray-500 text-sm font-qsemibold">
            de {data.comments.length} opiniones
          </Text>
        </YStack>
      </YStack>
      <YStack className="flex-1 items-start justify-between w-full pb-8 pt-2 mb-1 border-t-2 border-t-[#eee]">
        <XStack className="items-center w-full px-4 mb-5 mt-2 space-x-3">
          <Text className="text-sm font-qbold text-[#ccc] ">Comentarios</Text>
          <Text className="text-sm font-qbold text-[#999]">
            {`(${data.comments.length})`}
          </Text>
        </XStack>
        <View className="w-full">
          <FlatList
            data={data.comments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderComments}
            contentContainerStyle={{
              paddingBottom: 150,
              alignItems: "start",
              width: "100%",
            }}
          />
        </View>
      </YStack>
    </YStack>
  );
}

const renderComments = ({ item }) => {
  return (
    <View className="w-full pt-4 pb-6 mb-1 border-b-2 border-b-[#eee]">
      <Comment
        photoUrl={item.photo_url}
        username={item.name}
        date={item.date}
        body={item.comment}
        rating={item.rating}
      />
    </View>
  );
};

const avgRating = (comments) => {
  const sum = comments.reduce((acc, comment) => acc + comment.rating, 0);
  return Math.round(sum / comments.length);
};
