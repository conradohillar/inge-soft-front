import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { FlatList, View, Text, Image } from "react-native";
import RequestCard from "../../components/RequestCard";
import { Button, XStack, YStack } from "tamagui";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import { getReservationData } from "../../services/rides";
import icons from "../../constants/icons";
import { handleReservation } from "../../services/rides";

export default function ReservationRequest() {
  const { ride_id } = useLocalSearchParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["getReservationData", ride_id],
    queryFn: () => getReservationData(ride_id),
  });

  // const router = useRouter()

  // const handleDetail = (ride_id) => {

  //     try {

  //         router.push({
  //           pathname: "/(pages)/TripSearchDetail",
  //           params: { ride_id, people, smallPacks, mediumPacks, largePacks }
  //         });
  //       } catch (error) {
  //         console.error("Error: ", error);
  //       }

  // }

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

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => handleReservation(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["getReservationData", ride_id]);
    },
  });

  if (isLoading || mutation.isPending) {
    return <LoadingPage />;
  }

  if (isError || mutation.isError) {
    return <ErrorPage />;
  }

  if (data.length === 0) {
    return (
      <SafeAreaView className="w-full h-full bg-background">
        <Header />
        <XStack className="items-center justify-center mt-10 mb-7">
          <Text className="text-[22px] font-qbold text-secondary">
            No hay solicitudes{" "}
          </Text>
          <Text className="text-[22px] font-qbold text-black">
            para tu viaje
          </Text>
        </XStack>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="w-full h-full bg-background">
      <Header />
      <YStack className="h-[90px] justify-center mb-6">
        <Link
          href={{
            pathname: "/(pages)/TripUpcomingDetailForDriver",
            params: { ride_id: ride_id },
          }}
          asChild
        >
          <Button className="w-7 h-7 bg-background ml-4 mt-5 mb-3">
            <Image
              source={icons.arrowleft}
              className="w-7 h-7"
              tintColor="#000"
              resizeMode="contain"
            />
          </Button>
        </Link>
        <Text className="text-2xl font-qbold text-primary text-center">
          Solicitudes
          <Text className="text-2xl font-qbold text-black text-center">
            {" "}
            para tu viaje
          </Text>
        </Text>
      </YStack>
      <View className="items-center">
        <FlatList
          data={data}
          keyExtractor={(item) => item.ride_id}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}
