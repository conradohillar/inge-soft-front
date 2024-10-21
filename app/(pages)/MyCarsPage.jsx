import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { FlatList, View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import CarCard from "../../components/CarCard";
import { Button, XStack } from "tamagui";
import { Link } from "expo-router";
import icons from "../../constants/icons";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../(pages)/LoadingPage";
import ErrorPage from "./ErrorPage";
import { getMyCars } from "../../services/users";
import AddCarModal from "../../components/AddCarModal";

export default function MyCarsPage() {
  const [isAddCarModalVisible, setIsAddCarModalVisible] = useState(false);
  const toggleAddCarModal = () => {
    setIsAddCarModalVisible(!isAddCarModalVisible);
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ["getCars"],
    queryFn: getMyCars,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  const renderItem = ({ item }) => {
    return <CarCard model={item.model} plate={item.plate} />;
  };
  return (
    <View className="bg-background h-full w-full">
      <View className="items-start mt-5 ml-4">
        <Link href="/(tabs)/profile" asChild>
          <Button className="h-9 w-9 bg-background rounded-xl">
            <Image
              source={icons.arrowleft}
              className="h-7 w-7"
              resizeMode="contain"
            />
          </Button>
        </Link>
      </View>
      <XStack className="items-center justify-center mb-7">
        <Text className="text-4xl font-qbold text-black">MIS AUTOS</Text>
      </XStack>
      {data != undefined && (
        <FlatList
          className="w-full"
          data={data}
          keyExtractor={(item) => item.plate}
          renderItem={renderItem}
        />
      )}
      <XStack className="items-center justify-center my-10">
        <AddCarModal
          isVisible={isAddCarModalVisible}
          onClose={toggleAddCarModal}
        />
        <Button
          className="h-8 bg-background rounded-xl ml-3 mt-1"
          onPress={toggleAddCarModal}
        >
          <Image source={icons.add} className="h-6 w-6" resizeMode="contain" />
          <Text className="text-lg text-gray-600 font-qsemibold">
            Agregá un auto nuevo
          </Text>
        </Button>
      </XStack>
    </View>
  );
}
