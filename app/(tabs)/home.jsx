import { View, Text, Image, ScrollView, FlatList } from "react-native";
import { XStack, YStack } from "tamagui";
import BlackButton from "../../components/BlackButton";
import { useGlobalState } from "../_layout";
import ActiveTripCard from "../../components/ActiveTripCard";
import { getUserOrDriverRides } from "../../services/rides";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../(pages)/LoadingPage";
import ErrorPage from "../(pages)/ErrorPage";
import { useState } from "react";
import TripEndedModal from "../../components/TripEndedModal";

export default function Home() {
  const { globalState, setGlobalState } = useGlobalState();

  const [isTripEndedModalVisible, setTripEndedModalVisible] = useState(false);

  const toggleTripEndedModal = () => {
    setTripEndedModalVisible(!isTripEndedModalVisible);
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["ridesUpcoming"],
    queryFn: () => getUserOrDriverRides("upcoming", "driver"),
  });

  const noTripsProgrammed = () => {
    return (
      <>
        <Text className="text-2xl text-gray-400 font-qbold text-center">
          No tenés ningún viaje
        </Text>
        <Text className="text-2xl text-gray-400 font-qbold text-center">
          programado para hoy
        </Text>
      </>
    );
  };

  const handleStartTrip = () => {
    console.log("Start trip");
  };

  const handleEndTrip = () => {
    toggleTripEndedModal();
  };

  const renderActiveTripCard = ({ item }) => {
    const sliced_from = item.city_from.slice(0, 3).toUpperCase();
    const sliced_to = item.city_to.slice(0, 3).toUpperCase();

    return (
      <ActiveTripCard
        from={sliced_from}
        to={sliced_to}
        passengers={item.persons}
        packages={item.packages}
        departure={item.date}
        handleStartTrip={handleStartTrip}
        handleEndTrip={handleEndTrip}
      />
    );
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <YStack className="h-full items-center justify-evenly bg-background">
      <XStack className="items-center h-[18%] mt-4">
        <Text className="text-3xl text-black font-qsemibold">Bienvenido,</Text>
        <Text className="text-3xl text-primary font-qbold">
          {" "}
          {globalState.firstName}
        </Text>
      </XStack>
      <YStack className="flex-1 w-[90%] items-start">
        <Text className="text-lg text-black font-qbold mb-2 ml-3">
          Viajes programados para hoy:
        </Text>
        <View className="flex-1 w-full items-center mb-10 bg-gray-100 rounded-2xl border-2 justify-center">
          {(data.length === 0 && noTripsProgrammed()) || (
            <FlatList
              data={data}
              keyExtractor={(item) => item.ride_id}
              renderItem={renderActiveTripCard}
              contentContainerStyle={{
                alignItems: "center",
                width: "99%",
              }}
            />
          )}
        </View>
      </YStack>
      <XStack className="items-start justify-evenly w-[100%] h-[18%] px-3">
        <View className="w-[55%]">
          <BlackButton href="/(pages)/SearchTripPage" variant={"secondary"}>
            <Text className="text-[20px] font-qsemibold text-white">
              Buscar viaje
            </Text>
          </BlackButton>
        </View>
        <View className="w-[55%]">
          <BlackButton
            href="/(pages)/PostTripPage"
            className={`${
              globalState.isDriver ? "" : "opacity-50 bg-gray-500"
            }`}
            disabled={!globalState.isDriver}
          >
            <Text className={`text-[20px] font-qsemibold text-white`}>
              Publicar viaje
            </Text>
          </BlackButton>
        </View>
      </XStack>
      <TripEndedModal
        isVisible={isTripEndedModalVisible}
        setIsVisible={setTripEndedModalVisible}
      />
    </YStack>
  );
}
