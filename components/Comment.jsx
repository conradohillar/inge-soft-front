import React from "react";
import { Text, View } from "react-native";
import { Avatar, XStack, YStack } from "tamagui";
import RatingStars from "./RatingStars";

const Comment = ({ photoUrl, username, date, body, rating }) => {
  return (
    <YStack className="w-full px-4">
      <XStack className="items-center ml-2 space-x-3 mb-4">
        <View className="justify-center items-center">
          <Avatar circular size="$6" borderColor="$black" borderWidth={1}>
            <Avatar.Image data-testid="user-picture" src={photoUrl} />
          </Avatar>
        </View>
        <Text className="text-black text-base font-qsemibold">{username}</Text>
      </XStack>
      <XStack className="items-center ml-2 space-x-3 mb-2">
        <RatingStars rating={rating} size={20} />
        <Text className="text-gray-500 text-xs font-qsemibold">{date}</Text>
      </XStack>
      <Text className="text-black text-sm font-qsemibold ml-2">{body}</Text>
    </YStack>
  );
};

export default Comment;
