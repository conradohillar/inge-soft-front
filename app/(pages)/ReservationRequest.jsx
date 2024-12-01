import { View, Text, Image } from "react-native";
import { FlatList } from "react-native";
import RequestCard from "../../components/RequestCard";
import { YStack } from "tamagui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import { getReservationData, handleReservation } from "../../services/rides";
import Window from "../../components/Window";
import { LinearGradient } from "expo-linear-gradient";

export default function ReservationRequest() {
  const { ride_id } = useLocalSearchParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["getReservationData", ride_id],
    queryFn: () => getReservationData(ride_id),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => handleReservation(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["getReservationData", ride_id]);
    },
  });

  const handleAccept = (userId) => {
    const data = {
      ride_id: ride_id,
      user_id: userId,
      is_accepted: true,
    };
    mutation.mutate(data);
  };

  const handleDismiss = (userId) => {
    const data = {
      ride_id: ride_id,
      user_id: userId,
      is_accepted: false,
    };
    mutation.mutate(data);
  };

  if (isLoading || mutation.isPending) {
    return <LoadingPage />;
  }

  if (isError || mutation.isError) {
    return <ErrorPage />;
  }

  const renderItem = ({ item }) => {
    return (
      <RequestCard
        username={item.user_name}
        photo={item.user_photo}
        people={item.people}
        smallPackages={item.small_packages}
        mediumPackages={item.medium_packages}
        largePackages={item.large_packages}
        userId={item.user_id}
        handleAccept={handleAccept}
        handleDismiss={handleDismiss}
      />
    );
  };

  if (data.length === 0) {
    return (
      <View className="bg-background h-full w-full">
        <LinearGradient
          colors={["#59A58A", "#7AB5A0"]}
          style={{
            width: "100%",
            paddingTop: 50,
            paddingBottom: 60,
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
          }}
        >
          <View className="px-6 items-center">
            <Text className="text-4xl font-qbold text-white">
              Sin{" "}
              <Text className="text-4xl font-qbold text-white/90">
                solicitudes
              </Text>
            </Text>
          </View>
        </LinearGradient>

        <View className="-mt-12 px-6 flex-1 items-center justify-center">
          <Window height={200} width={"100%"}>
            <YStack className="items-center justify-center h-full">
              <Text className="text-2xl font-qbold text-primary">
                No hay solicitudes{" "}
              </Text>
              <Text className="text-2xl font-qbold text-black">
                para tu viaje
              </Text>
            </YStack>
          </Window>
        </View>
      </View>
    );
  }

  return (
    <View className="bg-background h-full w-full">
      <LinearGradient
        colors={["#59A58A", "#7AB5A0"]}
        style={{
          width: "100%",
          paddingTop: 50,
          paddingBottom: 60,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}
      >
        <View className="px-6">
          <Text className="text-4xl font-qbold text-white">Solicitudes</Text>
          <Text className="text-4xl font-qbold text-white/90">
            para tu viaje
          </Text>
        </View>
      </LinearGradient>

      <View className="-mt-12 flex-1">
        <FlatList
          data={data}
          keyExtractor={(item) => item.user_id}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 8,
            paddingBottom: 20,
          }}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      </View>
    </View>
  );
}
