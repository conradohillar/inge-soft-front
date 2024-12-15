import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { XStack, YStack, Avatar } from "tamagui";
import { useQuery } from "@tanstack/react-query";
import { getRiderDetail } from "../../services/rides";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import { useLocalSearchParams, Link, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import RateCommentModal from "../../components/RateCommentModal";
import { useState, useEffect } from "react";
import ButtonNext from "../../components/ButtonNext";
import icons from "../../constants/icons";
import PaymentModal from "../../components/PaymentModal";
import { createChat } from "../../services/chat";
import { leaveRide } from "../../services/rides";
import { payRide } from "../../services/rides";
import { useMutation } from "@tanstack/react-query";
import CancelReservationModal from "../../components/CancelReservationModal";
import { queryClient } from "../../app/_layout";

export default function TripDetailForRider() {
  const { ride_id, type } = useLocalSearchParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["riderDetail", ride_id],
    queryFn: () => getRiderDetail(ride_id),
  });

  const create_chat_mutation = useMutation({
    mutationFn: (id) => createChat(id),
  });

  const pay_mutation = useMutation({
    mutationFn: (pay_data) => payRide(pay_data),
    onSuccess: () => {
      setIsPaymentModalVisible(false);
    },
  });

  const leave_ride_mutation = useMutation({
    mutationFn: (id) => leaveRide(id),
    onSuccess: async () => {
      setIsCancelModalVisible(false);
      setIsPaymentModalVisible(false);
      await queryClient.invalidateQueries({
        queryKey: ["get", "upcoming", "rider"],
      });
      router.back();
    },
  });

  // Sincronizar isPaymentModalVisible con data.paid
  useEffect(() => {
    if (data) {
      setIsPaymentModalVisible(!data.paid && data.state === "accepted");
    }
  }, [data]);

  const router = useRouter();

  const handlePaymentModalClose = () => {
    if (!data.paid && data.state === "accepted") {
      router.back();
    } else {
      setIsPaymentModalVisible(false);
    }
  };

  const handlePayment = () => {
    create_chat_mutation.mutate(data.driver_id);
    const payment_data = {
      title: "Pago de viaje",
      price: data.price,
      ride_id: ride_id,
    };
    pay_mutation.mutate(payment_data);
  };

  const handleCancelPress = () => {
    setIsCancelModalVisible(true);
  };

  const handleConfirmCancel = () => {
    leave_ride_mutation.mutate(ride_id);
  };

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;

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

        <View className="-mt-12">
          {/* Estado del viaje si existe */}
          {data.state && (
            <View className="px-6 mb-4">
              <XStack className="items-center justify-center space-x-2 bg-white/90 rounded-2xl py-3">
                <Image
                  source={getStateIcon(data.state)}
                  className="h-6 w-6"
                  resizeMode="contain"
                  style={{
                    tintColor:
                      data.state === "pending"
                        ? "#ff6633"
                        : data.state === "accepted"
                        ? "#008000"
                        : "#FF0000",
                  }}
                />
                <Text className="text-sm font-qbold text-gray-600">
                  El conductor{" "}
                  {data.state === "pending"
                    ? "todavía no aceptó"
                    : data.state === "accepted"
                    ? "ya aceptó"
                    : "rechazó"}{" "}
                  tu solicitud
                </Text>
              </XStack>
            </View>
          )}

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
              <YStack space="$4">
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
                    <MaterialIcons
                      name="chevron-right"
                      size={28}
                      color="#59A58A"
                    />
                  </Link>
                </XStack>

                {/* Botón de calificar solo para viajes históricos */}
                {type === "history" && (
                  <ButtonNext
                    onPress={() => setIsModalVisible(true)}
                    variant="secondary"
                    width="50%"
                    height={50}
                  >
                    <Text className="text-xl font-qsemibold text-white">
                      Calificar
                    </Text>
                  </ButtonNext>
                )}
              </YStack>
            </View>
          </View>

          {/* Espacios reservados */}
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
                Tu reserva
              </Text>
              <YStack space="$4" className="pr-2">
                <XStack className="items-center justify-between">
                  <XStack className="items-center space-x-3 mb-3">
                    <View className="w-12 items-center">
                      <MaterialIcons name="person" size={24} color="#666666" />
                    </View>
                    <Text className="text-base font-qsemibold text-gray-500">
                      Personas
                    </Text>
                  </XStack>
                  <Text className="text-lg font-qbold text-black">
                    {data.space_persons}
                  </Text>
                </XStack>

                <XStack className="items-center justify-between mb-1">
                  <XStack className="items-center space-x-3">
                    <View className="w-12 items-center">
                      <Image
                        source={icons.mypackage}
                        className="h-8 w-8"
                        resizeMode="contain"
                      />
                    </View>
                    <Text className="text-base font-qsemibold text-gray-500">
                      Paquetes chicos
                    </Text>
                  </XStack>
                  <Text className="text-lg font-qbold text-black">
                    {data.space_small_package}
                  </Text>
                </XStack>

                <XStack className="items-center justify-between">
                  <XStack className="items-center space-x-3">
                    <View className="w-12 items-center">
                      <Image
                        source={icons.mypackage}
                        className="h-10 w-10"
                        resizeMode="contain"
                      />
                    </View>
                    <Text className="text-base font-qsemibold text-gray-500">
                      Paquetes medianos
                    </Text>
                  </XStack>
                  <Text className="text-lg font-qbold text-black">
                    {data.space_medium_package}
                  </Text>
                </XStack>

                <XStack className="items-center justify-between">
                  <XStack className="items-center space-x-3">
                    <View className="w-12 items-center">
                      <Image
                        source={icons.mypackage}
                        className="h-12 w-12"
                        resizeMode="contain"
                      />
                    </View>
                    <Text className="text-base font-qsemibold text-gray-500">
                      Paquetes grandes
                    </Text>
                  </XStack>
                  <Text className="text-lg font-qbold text-black">
                    {data.space_large_package}
                  </Text>
                </XStack>
              </YStack>
              <Text
                className={`text-2xl font-qbold mt-8 self-center ${
                  type === "history" ? "text-red-600" : "text-black"
                }`}
              >
                {type === "history" ? "Costo: " : "Total: "}$
                {data.price.toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Botón de cancelar */}
          {type === "upcoming" && data.state !== "accepted" && (
            <View className="px-6 mb-8 mt-4">
              <ButtonNext onPress={handleCancelPress}>
                <Text className="text-xl font-qsemibold text-white">
                  Cancelar reserva
                </Text>
              </ButtonNext>
            </View>
          )}
        </View>

        <RateCommentModal
          isVisible={isModalVisible}
          onBackdropPress={() => setIsModalVisible(false)}
          category={"driver"}
          rideId={ride_id}
          receiverId={data.driver_id}
          setIsVisible={setIsModalVisible}
        />

        <PaymentModal
          isVisible={isPaymentModalVisible}
          onClose={handlePaymentModalClose}
          onPay={handlePayment}
          onCancel={handleCancelPress}
          canCancel={isBeforePrevDay(
            getDepartureDateTime(data.date, data.start_minimum_time)
          )}
        />

        {/* Modal de confirmación */}
        <CancelReservationModal
          isVisible={isCancelModalVisible}
          onClose={() => setIsCancelModalVisible(false)}
          onConfirm={handleConfirmCancel}
        />
      </Pressable>
    </ScrollView>
  );
}

const getStateIcon = (state) => {
  if (state === "pending") {
    return require("../../assets/icons/alert.png");
  } else if (state === "accepted") {
    return require("../../assets/icons/accepted.png");
  } else if (state === "dismissed") {
    return require("../../assets/icons/dismissed.png");
  } else return null;
};

export const isBeforePrevDay = (departure_time) => {
  const departureDate = new Date(departure_time);
  const prevDay = new Date(departureDate);
  prevDay.setDate(prevDay.getDate() - 1);
  prevDay.setHours(departureDate.getHours());
  prevDay.setMinutes(departureDate.getMinutes());
  prevDay.setSeconds(departureDate.getSeconds());

  const now = new Date();

  // Retorna true si estamos antes del día anterior a la misma hora
  return now <= prevDay;
};

export const getDepartureDateTime = (date, time) => {
  return `${date}T${time}`; // Formato: "2024-03-20T15:30:00"
};
