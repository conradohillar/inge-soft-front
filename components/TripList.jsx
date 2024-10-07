import { FlatList, SafeAreaView, Text, View, Image } from "react-native";
import { useQuery } from "@tanstack/react-query";
import TripCard from "./TripCard";
import LoadingPage from "../app/(pages)/LoadingPage";
import ErrorPage from "../app/(pages)/ErrorPage";
import TripCardForDriver from "./TripCardForDriver";
import { Button, XStack, YStack } from "tamagui";
import { Link, useRouter } from "expo-router";
import icons from "../constants/icons";
import { getUserOrDriverRides } from "../services/rides";
import BlackButton from "./BlackButton";

export default function TripList({ type, category }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["get", type, category],
    queryFn: () => getUserOrDriverRides(type, category),
  });

  const renderTripCard = ({ item }) => {
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
        state={item.state}
        ride_id={item.ride_id}
        handleOpenDetail={handleRiderTrips}
      />
    );
  };

  const renderTripCardForDriver = ({ item }) => {
    const rounded = item.price.toFixed(2);
    const sliced_from = item.city_from.slice(0, 3).toUpperCase();
    const sliced_to = item.city_to.slice(0, 3).toUpperCase();
    return (
      <TripCardForDriver
        from={sliced_from}
        to={sliced_to}
        driver={item.driver_name}
        date={item.date}
        price={rounded}
        passengers={item.persons}
        packages={item.packages}
        state={item.state}
        ride_id={item.ride_id}
        handleOpenDetail={handleDriverTrips}
      />
    );
  };

  const router = useRouter();

  const handleRiderTrips = (ride_id) => {
    router.push({
      pathname: "/(pages)/TripDetailForRider",
      params: { ride_id },
    });
  };

  const handleDriverTrips = (ride_id) => {
    if (type === "upcoming") {
      router.push({
        pathname: "/(pages)/TripUpcomingDetailForDriver",
        params: { ride_id },
      });
    } else {
      router.push({
        pathname: "/(pages)/TripHistoryDetailForDriver",
        params: { ride_id },
      });
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage />;
  }

  if (data.length === 0) {
    return (
      <SafeAreaView className="w-full bg-background">
        <YStack className="h-[80%] w-full items-center justify-around">
          <View className="items-center">
            <Text className="text-3xl font-qbold text-primary">
              Todavía
              <Text className="text-3xl font-qbold text-black">
                {" "}
                no realizaste
              </Text>
            </Text>
            <Text className="text-3xl font-qbold text-black">ningún viaje</Text>
          </View>
          <View className="w-[75%] mt-10 items-center">
            <BlackButton href="/(pages)/SearchTripPage" variant={"primary"}>
              <Text className="text-2xl font-qsemibold text-white">
                Buscar viaje
              </Text>
            </BlackButton>
          </View>
        </YStack>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-full w-full bg-background">
      <YStack className="h-[80px] justify-center mb-5">
        <Link href="/(tabs)/trips" asChild>
          <Button className="w-7 h-7 bg-background ml-4 mt-5">
            <Image
              source={icons.arrowleft}
              className="w-7 h-7"
              tintColor="#000"
              resizeMode="contain"
            />
          </Button>
        </Link>
        <Text className="text-2xl font-qbold text-black text-center">
          {type === "upcoming"
            ? category === "driver"
              ? "PUBLICADOS"
              : "RESERVADOS"
            : "HISTORIAL"}
        </Text>
      </YStack>
      <View className="flex-1 items-center mb-12">
        <FlatList
          data={data}
          keyExtractor={(item) => item.ride_id}
          renderItem={
            category === "rider" ? renderTripCard : renderTripCardForDriver
          }
        />
      </View>
    </SafeAreaView>
  );
}
