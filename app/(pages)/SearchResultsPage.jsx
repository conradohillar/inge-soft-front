import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, View } from "react-native";
import TripCard from "../../components/TripCard";
import { XStack, YStack, Text } from "tamagui";
import { useLocalSearchParams, useRouter } from "expo-router";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import { searchRides } from "../../services/rides";
import { useQuery } from "@tanstack/react-query";
import Window from "../../components/Window";
import BlackButton from "../../components/BlackButton";

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
        <YStack className="items-center justify-center h-[95%]">
          <Window height={250} width={"90%"}>
            <YStack className="items-center justify-center my-8 px-4">
              <Text className="text-3xl font-qbold text-black mb-2">
                No hay resultados
              </Text>
              <Text className="text-3xl font-qbold text-black mb-10">
                para tu búsqueda
              </Text>
              <BlackButton href="/(pages)/SearchTripPage" variant="secondary">
                <Text className="text-xl font-qsemibold text-white px-2">
                  Buscá otro viaje
                </Text>
              </BlackButton>
            </YStack>
          </Window>
        </YStack>
      </SafeAreaView>
    );
  }
  return (
    <YStack className="w-full h-full bg-background">
      <XStack className="items-center justify-center mt-10 mb-7 mx-4">
        <Text className="text-2xl font-qbold text-primary">Resultados </Text>
        <Text className="text-2xl font-qbold text-black">de tu búsqueda</Text>
      </XStack>
      <YStack className="flex-1">
        <FlatList
          data={data}
          keyExtractor={(item) => item.ride_id}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: 20,
            alignItems: "center",
            width: "100%",
            paddingHorizontal: 16,
          }}
        />
      </YStack>
    </YStack>
  );
}
