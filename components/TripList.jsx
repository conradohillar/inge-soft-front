import { FlatList, SafeAreaView, Text, View, Image } from "react-native";
import { useQuery } from "@tanstack/react-query";
import TripCard from "./TripCard";
import TripCardForDriver from "./TripCardForDriver";
import { Button, Spinner, XStack, YStack } from "tamagui";
import { Link, useRouter } from "expo-router";
import icons from "../constants/icons";
import { getUserOrDriverRides } from "../services/rides";
import BlackButton from "./BlackButton";

export default function TripList({ type, category }) {
  const router = useRouter();
  const { isLoading, isError, data } = useQuery({
    queryKey: ["get", type, category],
    queryFn: () => getUserOrDriverRides(type, category),
  });

  const handleRiderTrips = (ride_id) => {
    router.push({
      pathname: "/(pages)/TripDetailForRider",
      params: { ride_id },
    });
  };

  const handleDriverTrips = (ride_id) => {
    const pathname =
      type === "upcoming"
        ? "/(pages)/TripUpcomingDetailForDriver"
        : "/(pages)/TripHistoryDetailForDriver";

    router.push({
      pathname,
      params: { ride_id },
    });
  };

  const renderTripCard = ({ item }) => {
    const {
      price,
      city_from,
      city_to,
      driver_name,
      date,
      driver_photo,
      state,
      ride_id,
    } = item;
    const rounded = price.toFixed(2);
    const sliced_from = city_from.slice(0, 3).toUpperCase();
    const sliced_to = city_to.slice(0, 3).toUpperCase();

    return (
      <TripCard
        from={sliced_from}
        to={sliced_to}
        driver={driver_name}
        date={date}
        price={rounded}
        url={driver_photo}
        state={state}
        ride_id={ride_id}
        handleOpenDetail={handleRiderTrips}
      />
    );
  };

  const renderTripCardForDriver = ({ item }) => {
    const {
      price,
      city_from,
      city_to,
      driver_name,
      date,
      persons,
      packages,
      state,
      ride_id,
    } = item;
    const rounded = price.toFixed(2);
    const sliced_from = city_from.slice(0, 3).toUpperCase();
    const sliced_to = city_to.slice(0, 3).toUpperCase();

    return (
      <TripCardForDriver
        from={sliced_from}
        to={sliced_to}
        driver={driver_name}
        date={date}
        price={rounded}
        passengers={persons}
        packages={packages}
        state={state}
        ride_id={ride_id}
        handleOpenDetail={handleDriverTrips}
      />
    );
  };

  if (isLoading) {
    return (
      <YStack className="h-[65%] items-center justify-end">
        <Spinner size={55} color="$green10" />
      </YStack>
    );
  }

  if (isError) {
    return (
      <YStack className="h-[65%] items-center justify-end">
        <Text className="text-4xl text-red-600 font-qbold">
          Ups... Hubo un error
        </Text>
        <Spinner size={55} color="red" />
      </YStack>
    );
  }

  if (!data) return null;

  if (data.length === 0) {
    return (
      <SafeAreaView className="w-full bg-background">
        <YStack className="h-[80%] w-full items-center justify-center">
          <View className="py-3">
            <View
              style={{
                height: 218,
                width: 350,
                paddingVertical: 15,
                paddingHorizontal: 18,
                marginHorizontal: 6,
                borderWidth: 2,
                borderColor: "#ccc",
                borderRadius: 40,
                backgroundColor: "#eee",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <YStack className="items-center justify-center h-full">
                <Text className="text-2xl font-qbold text-black mb-8 text-center">
                  No tenés viajes{" "}
                  {type === "upcoming" ? "reservados" : "en el historial"}
                </Text>
                <BlackButton
                  href={
                    category === "driver"
                      ? "/(pages)/PostTripPage"
                      : "/(pages)/SearchTripPage"
                  }
                  variant="primary"
                >
                  <Text className="text-xl font-qsemibold text-white text-center">
                    {category === "driver" ? "Publicar" : "Buscar"} viaje
                  </Text>
                </BlackButton>
              </YStack>
            </View>
          </View>
        </YStack>
      </SafeAreaView>
    );
  }

  const headerText = type === "upcoming" ? "PRÓXIMOS" : "HISTORIAL";

  return (
    <SafeAreaView className="h-full w-full bg-background">
      <View className="flex-1">
        <FlatList
          data={data}
          keyExtractor={(item) => item.ride_id}
          renderItem={
            category === "rider" ? renderTripCard : renderTripCardForDriver
          }
          contentContainerStyle={{
            paddingBottom: 130,
            alignItems: "center",
            width: "100%",
          }}
        />
      </View>
    </SafeAreaView>
  );
}
