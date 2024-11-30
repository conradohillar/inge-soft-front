import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { YStack, XStack, Button } from "tamagui";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useMutation } from "@tanstack/react-query";
import Header from "../../components/Header";
import Counter from "../../components/Counter";
import ButtonNext from "../../components/ButtonNext";
import CustomInput from "../../components/CustomInput";
import DropdownComponent from "../../components/DropdownComponent";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import icons from "../../constants/icons";
import { getRideData, postTrip } from "../../services/rides";
import { postTripDetailsSchema } from "../../validation/ridesSchemas";
import AddCarModal from "../../components/AddCarModal";
import { useQueryClient } from "@tanstack/react-query";
import Window from "../../components/Window";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function PostTripPage2() {
  const [isAddCarModalVisible, setIsAddCarModalVisible] = useState(false);
  const [priceErrors, setPriceErrors] = useState(0);

  const toggleAddCarModal = () => {
    setIsAddCarModalVisible(!isAddCarModalVisible);
  };

  const { fromLocation, toLocation, formattedDate, departureTime } =
    useLocalSearchParams();

  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(postTripDetailsSchema),
    defaultValues: {
      car: "",
      availableSeats: 0,
      spacesSmallPackage: 0,
      spacesMediumPackage: 0,
      spacesLargePackage: 0,
      pricePerson: 0,
      priceSmallPackage: 0,
      priceMediumPackage: 0,
      priceLargePackage: 0,
      defaultPricePerson: 0,
      defaultPriceSmallPackage: 0,
      defaultPriceMediumPackage: 0,
      defaultPriceLargePackage: 0,
    },
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["getRideData"],
    queryFn: () => getRideData(fromLocation, toLocation),
  });

  useEffect(() => {
    if (data && data.prices) {
      setValue("pricePerson", Math.round(data.prices.price_person));
      setValue(
        "priceSmallPackage",
        Math.round(data.prices.price_small_package)
      );
      setValue(
        "priceMediumPackage",
        Math.round(data.prices.price_medium_package)
      );
      setValue(
        "priceLargePackage",
        Math.round(data.prices.price_large_package)
      );
      setValue("defaultPricePerson", Math.round(data.prices.price_person));
      setValue(
        "defaultPriceSmallPackage",
        Math.round(data.prices.price_small_package)
      );
      setValue(
        "defaultPriceMediumPackage",
        Math.round(data.prices.price_medium_package)
      );
      setValue(
        "defaultPriceLargePackage",
        Math.round(data.prices.price_large_package)
      );
      if (data.cars.length > 0) {
        setValue("car", data.cars[0].plate);
      }
    }
  }, [data]);

  useEffect(() => {
    const errorCount = [
      errors.pricePerson,
      errors.priceSmallPackage,
      errors.priceMediumPackage,
      errors.priceLargePackage,
    ].filter(Boolean).length;

    setPriceErrors(errorCount);
  }, [
    errors.pricePerson,
    errors.priceSmallPackage,
    errors.priceMediumPackage,
    errors.priceLargePackage,
  ]);

  const mutation = useMutation({
    mutationFn: ({ tripData, car }) => postTrip(tripData, car),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ridesUpcoming"] });
      queryClient.invalidateQueries({
        queryKey: ["get", "upcoming", "driver"],
      });

      const title = "Publicaste tu viaje";
      const section = "MIS VIAJES";
      const sectionSource = icons.car;
      const returnTo = "Volver al Inicio";
      const returnToSource = icons.home;
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

  const router = useRouter();

  const handleContinue = async (formData) => {
    const auxTime = new Date(
      new Date(`1970-01-01T${departureTime}`).getTime() + 60 * 60 * 1000
    )
      .toISOString()
      .split("T")[1];

    const obj = {
      ride: {
        city_from: fromLocation,
        city_to: toLocation,
        ride_date: formattedDate,
        start_minimum_time: departureTime,
        start_maximum_time: auxTime,
        available_space_people: Number(formData.availableSeats),
        available_space_small_package: Number(formData.spacesSmallPackage),
        available_space_medium_package: Number(formData.spacesMediumPackage),
        available_space_large_package: Number(formData.spacesLargePackage),
      },
      price: {
        price_person: Number(formData.pricePerson),
        price_small_package: Number(formData.priceSmallPackage),
        price_medium_package: Number(formData.priceMediumPackage),
        price_large_package: Number(formData.priceLargePackage),
      },
    };

    mutation.mutate({ tripData: obj, car: formData.car });
  };

  if (mutation.isPending || isLoading) {
    return <LoadingPage />;
  }

  if (mutation.isError || error) {
    return <ErrorPage />;
  }

  return (
    <ScrollView className="bg-background">
      <Pressable className="mb-10">
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
          <View className="px-6">
            <Text className="text-4xl font-qbold text-white">Detalles</Text>
            <Text className="text-4xl font-qbold text-white/90">
              de la publicación
            </Text>
          </View>
        </LinearGradient>

        <View className="px-6">
          <View className="-mt-12 mb-6">
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
              <Text className="text-lg font-qbold text-black mb-4">
                Seleccioná tu <Text className="text-primary">auto</Text>
              </Text>

              <View
                style={{
                  display: `${data.cars.length > 0 ? "" : "none"}`,
                }}
              >
                <Controller
                  control={control}
                  name="car"
                  render={({ field: { onChange, value } }) => (
                    <DropdownComponent
                      data={data.cars.map((car) => ({
                        label: `${car.model} - ${car.plate}`,
                        value: car.plate,
                      }))}
                      value={value}
                      setValue={onChange}
                    />
                  )}
                />
                {errors.car && (
                  <Text className="text-red-500 mt-2">
                    {errors.car.message}
                  </Text>
                )}
              </View>

              {data.cars.length === 0 && (
                <View className="items-center">
                  <Text className="text-sm text-red-500 font-qbold mb-3">
                    No tenés autos registrados
                  </Text>
                  <Button
                    className="w-[50%] h-[42] rounded-2xl items-center pb-0.5"
                    onPress={toggleAddCarModal}
                  >
                    <Text className="text-lg font-qsemibold text-white">
                      Agregá un auto
                    </Text>
                  </Button>
                </View>
              )}
            </View>
          </View>

          <View className="mb-6">
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
              <Text className="text-lg font-qbold text-black mb-5">
                Indicá tus{" "}
                <Text className="text-primary">espacios disponibles</Text>
              </Text>

              <YStack space="$4" className="px-8">
                <XStack className="items-center justify-between">
                  <View className="w-12 items-center">
                    <Image
                      source={icons.profile2}
                      className="w-8 h-8"
                      resizeMode="contain"
                    />
                  </View>
                  <Controller
                    control={control}
                    name="availableSeats"
                    render={({ field: { onChange, value } }) => (
                      <Counter
                        maxCount={4}
                        count={value}
                        handleChangeCount={onChange}
                      />
                    )}
                  />
                </XStack>

                <XStack className="items-center justify-between">
                  <View className="w-12 items-center">
                    <Image
                      source={icons.mypackage}
                      className="w-8 h-8"
                      resizeMode="contain"
                    />
                  </View>
                  <Controller
                    control={control}
                    name="spacesSmallPackage"
                    render={({ field: { onChange, value } }) => (
                      <Counter
                        maxCount={4}
                        count={value}
                        handleChangeCount={onChange}
                      />
                    )}
                  />
                </XStack>

                <XStack className="items-center justify-between">
                  <View className="w-12 items-center">
                    <Image
                      source={icons.mypackage}
                      className="w-10 h-10"
                      resizeMode="contain"
                    />
                  </View>
                  <Controller
                    control={control}
                    name="spacesMediumPackage"
                    render={({ field: { onChange, value } }) => (
                      <Counter
                        maxCount={4}
                        count={value}
                        handleChangeCount={onChange}
                      />
                    )}
                  />
                </XStack>

                <XStack className="items-center justify-between">
                  <View className="w-12 items-center">
                    <Image
                      source={icons.mypackage}
                      className="w-12 h-12"
                      resizeMode="contain"
                    />
                  </View>
                  <Controller
                    control={control}
                    name="spacesLargePackage"
                    render={({ field: { onChange, value } }) => (
                      <Counter
                        maxCount={4}
                        count={value}
                        handleChangeCount={onChange}
                      />
                    )}
                  />
                </XStack>
              </YStack>
            </View>
          </View>

          <View className="mb-6">
            <View
              className="bg-white rounded-3xl px-6 pt-6 pb-8"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 3,
              }}
            >
              <Text className="text-lg font-qbold text-black mb-4">
                Indicá los <Text className="text-primary">precios</Text>
              </Text>

              <YStack space="$2" className="pr-6">
                <Controller
                  control={control}
                  name="pricePerson"
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      width={"100%"}
                      keyboardType="numeric"
                      title="Precio por persona"
                      value={String(value)}
                      handleChangeText={onChange}
                      hint={errors.pricePerson?.message}
                      borderColor={
                        errors.pricePerson ? "border-red-500" : undefined
                      }
                      prependIcon={
                        <MaterialIcons
                          name="attach-money"
                          size={16}
                          color="#808080"
                        />
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="priceSmallPackage"
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      width={"100%"}
                      keyboardType="numeric"
                      title="Precio por paquete chico"
                      value={String(value)}
                      handleChangeText={onChange}
                      hint={errors.priceSmallPackage?.message}
                      borderColor={
                        errors.priceSmallPackage ? "border-red-500" : undefined
                      }
                      prependIcon={
                        <MaterialIcons
                          name="attach-money"
                          size={16}
                          color="#808080"
                        />
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="priceMediumPackage"
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      width={"100%"}
                      keyboardType="numeric"
                      title="Precio por paquete mediano"
                      value={String(value)}
                      handleChangeText={onChange}
                      hint={errors.priceMediumPackage?.message}
                      borderColor={
                        errors.priceMediumPackage ? "border-red-500" : undefined
                      }
                      prependIcon={
                        <MaterialIcons
                          name="attach-money"
                          size={16}
                          color="#808080"
                        />
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="priceLargePackage"
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      width={"100%"}
                      keyboardType="numeric"
                      title="Precio por paquete grande"
                      value={String(value)}
                      handleChangeText={onChange}
                      hint={errors.priceLargePackage?.message}
                      borderColor={
                        errors.priceLargePackage ? "border-red-500" : undefined
                      }
                      prependIcon={
                        <MaterialIcons
                          name="attach-money"
                          size={16}
                          color="#808080"
                        />
                      }
                    />
                  )}
                />
              </YStack>
            </View>
          </View>

          <XStack className="justify-center items-center mb-6 mt-6">
            <ButtonNext
              onPress={handleSubmit(handleContinue)}
              variant="secondary"
            >
              <Text className="text-2xl font-qsemibold text-white">
                Publicar Viaje
              </Text>
            </ButtonNext>
          </XStack>
        </View>

        <AddCarModal
          isVisible={isAddCarModalVisible}
          onClose={toggleAddCarModal}
        />
      </Pressable>
    </ScrollView>
  );
}

const renderSelectedCar = (items, plate) => {
  const myItem = items.find((item) => item.plate === plate);
  return (
    <Text>
      {myItem.model}, {plate}
    </Text>
  );
};
