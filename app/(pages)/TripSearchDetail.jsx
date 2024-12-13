import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Linking,
} from "react-native";
import { XStack, YStack, Avatar } from "tamagui";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getRideSearchDetail, payRide, joinRide } from "../../services/rides";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import Counter from "../../components/Counter";
import { useLocalSearchParams, Link, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import ButtonNext from "../../components/ButtonNext";
import icons from "../../constants/icons";
import ConfirmReservationModal from "../../components/ConfirmReservationModal";

export default function TripSearchDetail() {
  const { ride_id, people, smallPacks, mediumPacks, largePacks } =
    useLocalSearchParams();
  const [pressed, setPressed] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  const [seats, setSeats] = useState(parseInt(people, 10));
  const [spacesSmallPackage, setSmallPackage] = useState(
    parseInt(smallPacks, 10)
  );
  const [spacesMediumPackage, setMediumPackage] = useState(
    parseInt(mediumPacks, 10)
  );
  const [spacesLargePackage, setLargePackage] = useState(
    parseInt(largePacks, 10)
  );

  const { data, isError, isLoading } = useQuery({
    queryKey: ["rideSearchDetail", ride_id],
    queryFn: () => getRideSearchDetail(ride_id),
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data) => joinRide(data),
    onSuccess: () => {
      const title = "Reservaste tu viaje";
      const section = "MIS VIAJES";
      const sectionSource = icons.car;
      const returnTo = "Volver al Inicio";
      const returnToSource = "home";
      const returnToRef = "/(tabs)/home";

      router.push({
        pathname: "/(pages)/PostSuccessful",
        params: {
          title,
          section,
          sectionSource,
          returnTo,
          returnToSource,
          returnToRef,
        },
      });
    },
  });

  const handleJoin = () => {
    const data = {
      ride_id: ride_id,
      people: seats,
      small_packages: spacesSmallPackage,
      medium_packages: spacesMediumPackage,
      large_packages: spacesLargePackage,
    };
    mutation.mutate(data);
  };

  const handleReservePress = () => {
    setIsConfirmModalVisible(true);
  };

  const handleConfirmReservation = () => {
    handleJoin();
    setIsConfirmModalVisible(false);
  };

  if (isLoading || mutation.isPending) return <LoadingPage />;
  if (isError || mutation.isError) return <ErrorPage />;

  const price = (
    data.price_person * seats +
    data.price_small_package * spacesSmallPackage +
    data.price_medium_package * spacesMediumPackage +
    data.price_large_package * spacesLargePackage
  ).toFixed(2);

  return (
    <ScrollView className="flex-1 bg-background">
      <Pressable className="mb-4">
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
              Detalle{" "}
              <Text className="text-4xl font-qbold text-white/90">
                del viaje
              </Text>
            </Text>
          </View>
        </LinearGradient>

        <View className="-mt-12 flex-1">
          {/* Origen y Destino */}
          <View className="px-6 mb-4">
            <View
              className="bg-white rounded-3xl p-6"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 3,
              }}
            >
              <YStack space="$4">
                <YStack space="$2">
                  <Text className="text-sm font-qsemibold text-primary">
                    Origen
                  </Text>
                  <XStack className="items-center space-x-3">
                    <MaterialIcons
                      name="trip-origin"
                      size={24}
                      color="#00AA00"
                    />
                    <Text className="text-lg font-qbold text-black flex-1 flex-wrap">
                      {data.city_from}
                    </Text>
                  </XStack>
                </YStack>

                <YStack space="$2">
                  <Text className="text-sm font-qsemibold text-primary">
                    Destino
                  </Text>
                  <XStack className="items-center space-x-3">
                    <MaterialIcons name="place" size={24} color="#DD0000" />
                    <Text className="text-lg font-qbold text-black flex-1 flex-wrap">
                      {data.city_to}
                    </Text>
                  </XStack>
                </YStack>
              </YStack>
            </View>
          </View>

          {/* Fecha y Hora */}
          <View className="px-6 mb-4">
            <View
              className="bg-white rounded-3xl p-6"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 3,
              }}
            >
              <Text className="text-sm font-qsemibold text-primary mb-4">
                Fecha y hora
              </Text>
              <YStack space="$3.5">
                <XStack className="items-center space-x-3">
                  <MaterialIcons
                    name="calendar-today"
                    size={24}
                    color="#AA00FF"
                  />
                  <Text className="text-lg font-qbold text-black">
                    {data.date}
                  </Text>
                </XStack>
                <XStack className="items-center space-x-3">
                  <MaterialIcons name="access-time" size={24} color="#EEB800" />
                  <Text className="text-lg font-qbold text-black">
                    {data.start_minimum_time.split(":").slice(0, 2).join(":")} -{" "}
                    {data.start_maximum_time.split(":").slice(0, 2).join(":")}
                  </Text>
                </XStack>
              </YStack>
            </View>
          </View>

          {/* Conductor */}
          <View className="px-6 mb-4">
            <View
              className="bg-white rounded-3xl p-6"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 3,
              }}
            >
              <Text className="text-sm font-qsemibold text-primary mb-4">
                Conductor
              </Text>
              <XStack className="items-center justify-between">
                <XStack className="items-center space-x-3">
                  <Avatar
                    circular
                    size="$10"
                    borderColor="$black"
                    borderWidth={1}
                  >
                    <Avatar.Image
                      src={
                        data.driver_photo === ""
                          ? icons.placeholder_profile
                          : data.driver_photo
                      }
                    />
                    <Avatar.Fallback backgroundColor="$gray8" />
                  </Avatar>
                  <YStack>
                    <Text className="text-xl font-qbold text-black">
                      {data.driver_name}
                    </Text>
                    <Text className="text-sm font-qsemibold text-gray-500">
                      {data.car_model} • {data.car_plate}
                    </Text>
                  </YStack>
                </XStack>
                <Link
                  href={{
                    pathname: "/(pages)/UserProfile",
                    params: { user_id: data.driver_id, category: "driver" },
                  }}
                  asChild
                >
                  <Pressable
                    onPressIn={() => setPressed(true)}
                    onPressOut={() => setPressed(false)}
                    className="bg-white rounded-2xl pl-4 py-10 pr-2"
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.8 : 1,
                    })}
                  >
                    <MaterialIcons
                      name="chevron-right"
                      size={28}
                      color="#59A58A"
                    />
                  </Pressable>
                </Link>
              </XStack>
            </View>
          </View>

          {/* Reserva */}
          <View className="px-6 mb-8">
            <View
              className="bg-white rounded-3xl p-6"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 3,
              }}
            >
              <Text className="text-sm font-qsemibold text-primary mb-4">
                Tu reserva
              </Text>
              <YStack space="$4">
                <XStack className="items-center justify-between pr-4 pl-8">
                  <View className="w-12 items-center">
                    <Image
                      source={icons.profile2}
                      className="h-8 w-8"
                      resizeMode="contain"
                    />
                  </View>
                  <Counter
                    maxCount={data.available_space_persons}
                    count={seats}
                    handleChangeCount={setSeats}
                  />
                </XStack>

                <XStack className="items-center justify-between pr-4 pl-8">
                  <View className="w-12 items-center">
                    <Image
                      source={icons.mypackage}
                      className="h-8 w-8"
                      resizeMode="contain"
                    />
                  </View>
                  <Counter
                    maxCount={data.available_space_small_package}
                    count={spacesSmallPackage}
                    handleChangeCount={setSmallPackage}
                  />
                </XStack>

                <XStack className="items-center justify-between pr-4 pl-8">
                  <View className="w-12 items-center">
                    <Image
                      source={icons.mypackage}
                      className="h-10 w-10"
                      resizeMode="contain"
                    />
                  </View>
                  <Counter
                    maxCount={data.available_space_medium_package}
                    count={spacesMediumPackage}
                    handleChangeCount={setMediumPackage}
                  />
                </XStack>

                <XStack className="items-center justify-between pr-4 pl-8">
                  <View className="w-12 items-center">
                    <Image
                      source={icons.mypackage}
                      className="h-12 w-12"
                      resizeMode="contain"
                    />
                  </View>
                  <Counter
                    maxCount={data.available_space_large_package}
                    count={spacesLargePackage}
                    handleChangeCount={setLargePackage}
                  />
                </XStack>

                <YStack className="items-center pt-6 mb-2">
                  <Text className="text-2xl font-qbold text-black mb-8">
                    Total: ${price}
                  </Text>
                  <ButtonNext onPress={handleReservePress} variant="secondary">
                    <Text className="text-xl font-qsemibold text-white">
                      Reservar viaje
                    </Text>
                  </ButtonNext>
                </YStack>
              </YStack>
            </View>
          </View>
        </View>
      </Pressable>

      <ConfirmReservationModal
        isVisible={isConfirmModalVisible}
        onClose={() => setIsConfirmModalVisible(false)}
        onConfirm={handleConfirmReservation}
      />
    </ScrollView>
  );
}
