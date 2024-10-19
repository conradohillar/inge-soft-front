import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { Avatar, XStack, YStack } from "tamagui";
import RatingStars from "../../components/RatingStars";
import Comment from "../../components/Comment";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";

export default function UserProfile() {
  const { user_id } = useLocalSearchParams();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["userProfile", user_id],
    queryFn: () => getProfileInfo(user_id),
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <SafeAreaView className="bg-background">
      <Header />
      <YStack className="h-full items-center justify-evenly">
        <YStack className="h-[25%] items-center justify-evenly">
          <XStack className="w-[90%] items-center justify-start">
            <View className="flex-1 justify-center items-center">
              <Avatar circular size="$12" borderColor="$black" borderWidth={1}>
                <Avatar.Image
                  data-testid="profile-picture"
                  accessibilityLabel={data.name}
                  src={data.photo_url}
                />
              </Avatar>
            </View>
            <YStack className="items-start justify-evenly ml-3 mr-2">
              <XStack className="items-center">
                <Text className="text-black text-lg font-qbold">
                  {data.name}
                </Text>
              </XStack>
              <Text className="text-gray-600 text-base font-qsemibold">
                {data.email}
              </Text>
            </YStack>
          </XStack>
        </YStack>
        <ScrollView className="h-full w-full">
          <YStack className="items-start justify-between w-full px-4 pb-8 pt-2 mb-1 border-2 border-[#eee]">
            <Text className="text-sm font-qbold text-[#ccc] mb-5">
              Calificación
            </Text>
            <YStack className="self-center items-center space-y-2">
              <RatingStars rating={4} />
              <Text className="text-gray-500 text-sm font-qsemibold">
                de 1.261 opiniones
              </Text>
            </YStack>
          </YStack>
          <YStack className="items-start justify-between w-full pb-8 pt-2 mb-1 border-t-2 border-t-[#eee]">
            <XStack className="items-center w-full px-4 mb-5 mt-2 space-x-3">
              <Text className="text-sm font-qbold text-[#ccc] ">
                Comentarios
              </Text>
              <Text className="text-sm font-qbold text-[#999]">
                {"(1.928)"}
              </Text>
            </XStack>
            <View className="w-full pt-4 pb-6 mb-1 border-b-2 border-b-[#eee]">
              <Comment
                photoUrl={data.photo_url}
                username={data.name}
                date="Hace 2 días"
                body="Excelente conductor, muy amable y puntual."
                rating={5}
              />
            </View>
          </YStack>
        </ScrollView>
      </YStack>
    </SafeAreaView>
  );
}
