import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, View, Text } from "react-native";
import TripCard from "../../components/TripCard";
import { YStack } from "tamagui";
import { useLocalSearchParams, useRouter } from "expo-router";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import { searchRides } from "../../services/rides";
import { useQuery } from "@tanstack/react-query";
import Window from "../../components/Window";
import BlackButton from "../../components/BlackButton";
import { LinearGradient } from "expo-linear-gradient";

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

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage />;

  if (data.length === 0) {
    return (
      <View className="flex-1 bg-background">
        <LinearGradient
          colors={["#59A58A", "#7AB5A0"]}
          style={{
            width: "100%",
            paddingTop: 60,
            paddingBottom: 80,
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
          }}
        >
          <View className="px-6 items-center">
            <Text className="text-4xl font-qbold text-white">
              Sin{" "}
              <Text className="text-4xl font-qbold text-white/90">
                resultados
              </Text>
            </Text>
          </View>
        </LinearGradient>

        <View className="px-6 -mt-12 flex-1">
          <Window height={280} width={"100%"}>
            <YStack className="items-center justify-center my-8 px-4 pb-4">
              <Text className="text-2xl font-qbold text-black mb-8 text-center">
                No hay viajes disponibles para tu búsqueda
              </Text>
              <BlackButton href="/(pages)/SearchTripPage" variant="secondary">
                <Text className="text-xl font-qsemibold text-white px-2">
                  Buscá otro viaje
                </Text>
              </BlackButton>
            </YStack>
          </Window>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <LinearGradient
        colors={["#59A58A", "#7AB5A0"]}
        style={{
          width: "100%",
          paddingTop: 55,
          paddingBottom: 60,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}
      >
        <View className="px-6">
          <Text className="text-4xl font-qbold text-white">Resultados</Text>
          <Text className="text-4xl font-qbold text-white/90">
            de tu búsqueda
          </Text>
        </View>
      </LinearGradient>

      <View className="flex-1 -mt-12">
        <FlatList
          data={data}
          keyExtractor={(item) => item.ride_id}
          renderItem={({ item }) => {
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
          }}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 12,
            paddingBottom: 24,
            gap: 12,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
