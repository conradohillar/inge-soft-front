import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { FlatList, View, Text } from "react-native";
import TripCard from "../../components/TripCard";
import { XStack } from "tamagui";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { LOCAL_IP } from "@env";
import axios from "axios";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import { searchRides } from "../../services/rides";

export default function SearchResults() {
  const {
    fromLocation,
    toLocation,
    formattedDate,
    people,
    smallPacks,
    mediumPacks,
    largePacks,
  } = useLocalSearchParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["searchRides"],
    queryFn: () =>
      searchRides(
        fromLocation,
        toLocation,
        formattedDate,
        people,
        smallPacks,
        mediumPacks,
        largePacks
      ),
  });

  const router = useRouter();

  const handleDetail = (ride_id) => {
    try {
      router.push({
        pathname: "/(pages)/TripSearchDetail",
        params: { ride_id, people, smallPacks, mediumPacks, largePacks },
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const renderItem = ({ item }) => {
    const rounded = item.price.toFixed(2);
    const sliced_from = item.city_from.slice(0, 3).toUpperCase();
    const sliced_to = item.city_to.slice(0, 3).toUpperCase();
    return (
      <TripCard
        from={sliced_from}
        to={sliced_to}
        driver={item.driver_name}
        date={item.date}
        price={rounded}
        url={item.driver_photo}
        ride_id={item.ride_id}
        handleOpenDetail={handleDetail}
      />
    );
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage />;
  }

  if (data.length === 0) {
    return (
      <SafeAreaView className="w-full h-full bg-background">
        <Header />
        <XStack className="items-center justify-center mt-10 mb-7">
          <Text className="text-[22px] font-qbold text-secondary">
            No hay resultados{" "}
          </Text>
          <Text className="text-[22px] font-qbold text-black">
            para tu búsqueda
          </Text>
        </XStack>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="w-full h-full bg-background">
      <Header />
      <XStack className="items-center justify-center mt-10 mb-7">
        <Text className="text-[22px] font-qbold text-secondary">
          Resultados{" "}
        </Text>
        <Text className="text-[22px] font-qbold text-black">
          de tu búsqueda
        </Text>
      </XStack>
      <View className="flex-1 items-center mb-12">
        <FlatList
          data={data}
          keyExtractor={(item) => item.ride_id}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}
